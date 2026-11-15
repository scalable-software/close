![License: CC BY-NC-SA 4.0](https://flat.badgen.net/static/license/CC-BY-NC-SA-4.0/green)

# Close

A lightweight, self-contained web component that lets users ask for a window, panel or dialog to be closed. It behaves like the close control in the corner of a desktop window: it looks pressed while it is held, makes the request when it is let go, and makes none when the pointer moves away first. It can be shown or hidden on demand, operated with a pointer or the keyboard, stands alone or lies flat inside a taskbar, and adapts automatically to light and dark themes. It closes nothing itself: it emits an event for each request, and the host application acts on it.

---

## 1. Introduction

The **Close** component provides a press button that requests closing and can be hidden/shown via both **imperative** and **declarative** APIs. It leverages custom Web Component features, including Shadow DOM, custom events, and attribute reflection for a clean, modular design.

### 1.1 Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/scalable-software/close.git
   cd close
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Tests (Optional)**

   ```bash
   npm test
   ```

   - Ensures everything is working as expected before you start.

4. **Start Local Server**

   ```bash
   npm run serve
   ```

   - This runs a local development server and opens the demo page, making `<close-button>` available in your browser.

---

## 2. Quick Start Usage Walkthrough

This walkthrough demonstrates how to interact with `<close-button>` right after installation, letting you see how the close button behaves before exploring its internal design.

1. **Open** the served page in your browser.
   - The `<close-button>` is shown in a band across the top. Below it are three groups: **Operations**, **States** and **Events**.

2. **Press and hold** the `<close-button>`.
   - It looks pressed, and the **States** group shows `status` as `pressed` for as long as you hold it.

3. **Let go** on the `<close-button>`.
   - `status` returns to `released`, and the **Events** group logs `onclose`: closing was requested.

4. **Press** the `<close-button>` again, **move the pointer away**, then let go.
   - `status` returns to `released` the moment the pointer leaves, and no `onclose` is logged: you changed your mind.

5. **Open the Developer Tools**, select the **Console**, and get a reference to the component:

   ```js
   const close = document.querySelector("close-button");
   ```

6. **Assign a handler** to the `onclose` property:

   ```js
   close.onclose = () => console.log("Closing was requested");
   ```

7. **Request closing** imperatively:

   ```js
   close.close();
   ```

   - Observe the console output: `"Closing was requested"`. Every call makes a request; `close()` changes no state.

8. **Focus** the `<close-button>` with the Tab key and press **Enter** or the **space bar**.
   - Each key press makes a request too.

9. **Hide** the component:

   ```js
   close.hide();
   ```

   - The `<close-button>` disappears, the **Events** group logs `onhide`, and the element shows the attribute in the **Elements** tab:

   ```html
   <close-button status="released" visibility="hidden"></close-button>
   ```

10. **Show** it again with `close.show()`, or by choosing `visible` in the **States** group.

11. **Choose** `flat` for `appearance` in the **States** group.
    - The close button loses its border, shadow and rounded corners, as it would inside a taskbar.

For more details on **States**, **Operations**, and **Events**, consult the sections below or check the generated **API documentation** (see `npm run document`).

---

## 3. Architectural Overview

### 3.1 Composition

- **Template** (`close.template.html`): Defines DOM structure — a `.icon` container, focusable and announced as a button, holding the SVG icon of a cross.
- **Style** (`close.style.css`): Encapsulates appearance, including the pressed look, hover effects, the flat appearance, and light/dark theme adaptation.
- **Class** (`close.ts`): Extends the base component class to handle lifecycle hooks, Shadow DOM creation, attribute reflection, and event dispatch.

> **Separation of Concerns**
>
> - **HTML** for structure
> - **CSS** for presentation
> - **TypeScript** for behavior

### 3.2 Class Lifecycle

Lifecycle methods are implemented in the base class and extended by the **Close** component:

- **`connectedCallback()`**
  1. Creates a Shadow DOM.
  2. Clones the HTML template into the Shadow Root.
  3. Inserts a `<link>` for scoped CSS.
  4. Initialises default state attributes.
  5. Sets up event listeners on the icon: the pointer going down, being lifted and leaving, a click, and a key press.

- **`disconnectedCallback()`**
  - Removes event listeners and cleans up cached element references.

---

## 4. Core Concepts: State, Operations, Events and Gestures

The following sections explain how the close button works internally.

### 4.1 State

The **Close** component uses both **internal properties** and **DOM attributes** to manage its state. This ensures consistency whether you modify the close button via script or HTML attributes.

#### 4.1.1 Definition

- **`visibility`** (`visible` | `hidden`)
  - Whether the close button is displayed.
  - **Optional attribute**: absent from the DOM when `visible` (the default); present as `[visibility="hidden"]` on the host element when hidden.

- **`status`** (`released` | `pressed`)
  - Whether the close button is being pressed. It is `pressed` from the moment the pointer goes down on the icon until it is lifted or leaves the icon, and `released` at all other times.
  - **Readonly**: only the component changes it. It has no public setter, and an attribute changed from outside is put back to the component's own value.
  - **Compulsory attribute**: always present in the DOM, reflecting the current state at all times.

- **`appearance`** (`floating` | `flat`)
  - Whether the close button stands alone, with its own border, shadow and rounded corners, or lies flat inside another surface such as a taskbar.
  - **Optional attribute**: absent from the DOM when `floating` (the default); present as `[appearance="flat"]` on the host element when flat.
  - It changes how the close button looks, not what it does: it has no operation and sends no event.

#### 4.1.2 Internal vs. Attribute-Driven State

1. **Internal State**

   ```typescript
   private _visibility: Visibility = Visibility.VISIBLE;
   private _status: Status = Status.RELEASED;
   private _appearance: Appearance = Appearance.FLOATING;
   ```

   - Predictable defaults decoupled from external attributes.

2. **Attribute-Driven State**

   ```typescript
   public get visibility(): Visibility {
     return this._visibility;
   }
   public set visibility(visibility: Visibility | null) {
     try {
       // Normalize
       visibility = visibility ?? Visibility.VISIBLE;
       // Validate
       visibility = Validate.visibility(visibility);
       // Guard
       if (this._visibility === visibility) return;
       // Mutate
       this._visibility = visibility;
     } finally {
       // Reflect
       this._reflect(
         Attributes.VISIBILITY,
         this._visibility,
         Visibility.VISIBLE
       );
     }
     // Dispatch
     const detail = { visibility };
     visibility === Visibility.HIDDEN && this._dispatch(Event.ON_HIDE, detail);
     visibility === Visibility.VISIBLE && this._dispatch(Event.ON_SHOW, detail);
   }
   ```

   - Normalises `null` to the default before validation.
   - Validates the incoming value and throws on invalid input.
   - Guards against no-op mutations with an early return.
   - Always makes the `visibility` attribute show the state, also after a rejected or ignored value, so an invalid attribute never stays in the DOM.
   - Dispatches the corresponding event on every accepted transition.

3. **Readonly State**

   ```typescript
   public get status(): Status {
     return this._status;
   }
   private set status(status: Status) {
     try {
       // Mutate
       this._status = status;
     } finally {
       // Reflect
       this._reflect(Attributes.STATUS, this._status);
     }
   }
   ```

   - The setter is private: the component produces the value itself, so there is nothing to validate.

#### 4.1.3 Lifecycle & Attribute Handlers

- `_initialize()` writes the `status` attribute to the DOM on connect, ensuring the compulsory attribute is always reflected from the first render.
- `attributeChangedCallback()` invokes `_attributeHandlers`. For `visibility` and `appearance` it routes the attribute change back through the setter, so external attribute mutations and imperative setter calls follow the same mutation path. For the readonly `status` it restores the attribute to the component's own value.

#### 4.1.4 Usage Tips

- **Fallback**: Removing `[visibility="hidden"]` reverts the component to its visible default.
- **Clean DOM**: When `visibility` is `visible`, no attribute is present on the host element.
- **The pressed look**: the stylesheet selects on `[status="pressed"]`. A host can read `status`, but cannot set it.

---

### 4.2 Operations

The **Close** component's imperative API manipulates state or makes a request, which in turn updates the DOM and triggers events.

#### 4.2.1 Definition

1. `hide()` → sets `[visibility="hidden"]` on the host element
2. `show()` → removes the `[visibility]` attribute from the host element
3. `close()` → requests closing: it changes no state, and every call dispatches `onclose`

#### 4.2.2 Example

```typescript
public close = () => {
  this._dispatch(Event.ON_CLOSE);
};
```

---

### 4.3 Events

The **Close** component broadcasts custom events when its visibility changes and each time closing is requested.

#### 4.3.1 Definition

- **`onhide`**: Fired when transitioning from `visible` to `hidden`. Its `detail` holds the new `visibility`.
- **`onshow`**: Fired when transitioning from `hidden` to `visible`. Its `detail` holds the new `visibility`.
- **`onclose`**: Fired each time closing is requested, by a gesture or by `close()`. It has no `detail`.

> **`onclose` replaces the platform's property**
>
> Every HTML element already has an `onclose` property. On `<close-button>` it is deliberately replaced: `close.onclose` subscribes to the component's own `onclose` event, which matches the `close()` operation.

#### 4.3.2 Usage Tips

- Assign a handler directly to the setter:

  ```js
  close.onclose = () => dialog.remove();
  ```

- Or use standard DOM event listening, with the full event name:

  ```js
  close.addEventListener("onclose", () => {
    // ...
  });
  ```

- The events do not bubble: subscribe on the `<close-button>` itself.

---

### 4.4 Gestures

| Gesture | On the icon | Result |
|---|---|---|
| `pointerdown` | the pointer goes down | `status` becomes `pressed` |
| `pointerup` | the pointer is lifted | `status` becomes `released` |
| `pointerleave` | the pointer leaves | `status` becomes `released`, and no request is made |
| `click` | a press and a lift on the icon | `close()` is called |
| `keydown` | Enter or the space bar | `close()` is called |
| `hover` | the pointer is over it | the colours change, in CSS only |

---

## 5. Development Workflow

Below is a recommended workflow for building, testing, documenting, and publishing the Close component.

### 5.1 From Specifications to Implementation

1. **Define Specs** (states, operations, events, gestures) in `specifications/close.specifications.json`.
2. **Implement** in TypeScript (reflect states as attributes, dispatch events on transitions and requests).
3. **Link** the final compiled JS or leverage import maps.

### 5.2 Testing

Unit tests run with Karma + Jasmine, after the specification is checked against the schema of each policy. The suite covers metadata, validation, composition, states, operations, events, and gestures.

```bash
npm test
```

### 5.3 Documentation (Typedoc)

```bash
npm run document
```

Auto-generates API docs from TypeScript annotations.

### 5.4 Publishing & Versioning

1. **Build**:

   ```bash
   npm run build
   ```

   Outputs to `dist/`.

2. **Bump Version**:

   ```bash
   npm version [major|minor|patch]
   ```

3. **Publish**:

   ```bash
   npm publish
   ```

### 5.5 Import Maps

The path in the import map depends on how the package is consumed.

**During local development** (e.g. the project's own `demo/`), the path resolves relative to the served file and points directly into the local build output:

```html
<script type="importmap">
  {
    "imports": {
      "@scalable.software/close": "./dist/index.js"
    }
  }
</script>
<script type="module">
  import "@scalable.software/close";
</script>
```

**After publishing to npm**, the path must point to the package inside `node_modules`:

```html
<script type="importmap">
  {
    "imports": {
      "@scalable.software/close": "/node_modules/@scalable.software/close/dist/index.js"
    }
  }
</script>
<script type="module">
  import "@scalable.software/close";
</script>
```

Alternatively, reference the package from a CDN:

```html
<script type="importmap">
  {
    "imports": {
      "@scalable.software/close": "https://unpkg.com/@scalable.software/close/dist/index.js"
    }
  }
</script>
<script type="module">
  import "@scalable.software/close";
</script>
```

---

## License

> This software and its documentation are released under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License (CC BY-NC-SA 4.0). This means you are free to share, copy, distribute, and transmit the work, and to adapt it, but only under the following conditions:
>
> Attribution: You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
>
> NonCommercial: You may not use this material for commercial purposes.
>
> ShareAlike: If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one.
>
> For more details, please visit the full [license agreement](https://creativecommons.org/licenses/by-nc-sa/4.0/).
