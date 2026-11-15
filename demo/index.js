import {
  Close,
  Operation,
  State,
  Visibility,
  Status,
  Appearance
} from "@scalable.software/close";

await Close.Template.load("close.template.html");

customElements.define(Close.Tag, Close);

const close = document.querySelector(Close.Tag);

/* ───────────────────────────── operations ───────────────────────────── */

// One button for each operation the package exports
const buttons = document.querySelector(".operations .buttons");

Object.values(Operation).forEach((name) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = `${name}()`;
  button.addEventListener("click", () => close[name]());
  buttons.append(button);
});

/* ───────────────────────────── states ───────────────────────────── */

// Every state with its value list; a readonly state is shown, not chosen
const states = [
  { name: State.VISIBILITY, values: Visibility },
  { name: State.STATUS, values: Status, readonly: true },
  { name: State.APPEARANCE, values: Appearance }
];

const list = document.querySelector(".states .list");

const views = states.map(({ name, values, readonly }) => {
  const term = document.createElement("dt");
  term.textContent = name;

  const description = document.createElement("dd");
  const view = readonly ? document.createElement("output") : choice(name, values);
  description.append(view);
  readonly && description.append(" readonly");

  list.append(term, description);

  return { name, view };
});

// A choice sets the property, never the attribute
function choice(name, values) {
  const select = document.createElement("select");
  Object.values(values).forEach((value) => select.append(new Option(value)));
  select.addEventListener("change", () => (close[name] = select.value));
  return select;
}

// States are attributes: follow the component whenever one changes
const follow = () => views.forEach(({ name, view }) => (view.value = close[name]));

new MutationObserver(follow).observe(close, { attributes: true });

follow();

/* ───────────────────────────── events ───────────────────────────── */

// `onevent` receives every event the component sends
const log = document.querySelector(".events .log");

const time = () => new Date().toLocaleTimeString([], { hour12: false });

close.onevent = (event) => {
  const entry = document.createElement("li");
  const detail = event.detail === null ? [] : [JSON.stringify(event.detail)];
  entry.textContent = [time(), event.type, ...detail].join(" ");
  log.append(entry);
};

document
  .querySelector(".events .clear")
  .addEventListener("click", () => log.replaceChildren());
