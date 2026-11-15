import { Template } from "@scalable.software/component";

import { Close, Tag, CSS, Attributes } from "@scalable.software/close";

// Configuration
configuration(Configuration.TAG, () => {
  and("Close imported", () => {
    then("Close is defined", () => {
      expect(Close).toBeDefined();
    });

    and("Close is defined", () => {
      then("Close.Tag static getter is defined", () => {
        expect(Close.Tag).toBeDefined();
      });

      and("Close.Tag static getter is defined", () => {
        then("Close.Tag is Tag", () => {
          expect(Close.Tag).toBe(Tag);
        });
      });
    });
  });
});

configuration(Configuration.ATTRIBUTES, () => {
  and("Close imported", () => {
    then("Close is defined", () => {
      expect(Close).toBeDefined();
    });

    and("Close is defined", () => {
      then("Close.Attributes static getter is defined", () => {
        expect(Close.Attributes).toBeDefined();
      });

      and("Close.Attributes static getter is defined", () => {
        then("Close.Attributes is Attributes", () => {
          expect(Close.Attributes).toBe(Attributes);
        });
      });
    });
  });
});

// Utilities
utility(Utilities.TEMPLATE, () => {
  then("Close.Template static property is defined", () => {
    expect(Close.Template).toBeDefined();
  });

  and("Close.Template static property is defined", () => {
    then("Close.Template is a Template", () => {
      expect(Close.Template).toBeInstanceOf(Template);
    });
  });
});

// Compositions
composition(Composition.TEMPLATE, () => {
  given("Close is defined in custom element registry", () => {
    beforeEach(() => {
      define(Close.Tag, Close);
    });

    and("HTML Template is added to DOM", () => {
      let template: HTMLTemplateElement;
      beforeEach(async () => {
        template = (await Close.Template.load(
          "close.template.html"
        )) as HTMLTemplateElement;
      });
      afterEach(() => {
        remove(Close.Tag);
      });

      then("template is defined", () => {
        expect(template).toBeDefined();
      });

      and("a new close is added to DOM", () => {
        let close: Close;
        beforeEach(() => {
          close = add<Close>(Close.Tag);
        });
        afterEach(() => {
          close.remove();
        });

        then("close.root contents contains template contents", () => {
          expect(close.root.innerHTML).toContain(template.innerHTML);
        });

        and("`close.root` contents contains template contents", () => {
          then("`close.root` contains `div.icon`", () => {
            const div = close.root.querySelector("div.icon");
            expect(div).not.toBeNull();
          });

          when("`close.root` contains `div.icon`", () => {
            let div: HTMLDivElement;
            beforeEach(() => {
              div = close.root.querySelector("div.icon") as HTMLDivElement;
            });

            then("`div.icon` has `tabindex` `0`", () => {
              expect(div.getAttribute("tabindex")).toBe("0");
            });

            then("`div.icon` has `role` `button`", () => {
              expect(div.getAttribute("role")).toBe("button");
            });
          });
        });
      });
    });
  });
});

composition(Composition.CSS, () => {
  given("Close is defined in custom element registry", () => {
    beforeEach(() => {
      define(Close.Tag, Close);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Close.Template.load("close.template.html");
      });
      afterEach(() => {
        remove(Close.Tag);
      });

      and("a new close is added to DOM", () => {
        let close: Close;
        beforeEach(() => {
          close = add<Close>(Close.Tag);
        });
        afterEach(() => {
          close.remove();
        });

        then("close.root contents contains a link to stylesheet", () => {
          expect(close.root.innerHTML).toContain("stylesheet");
        });

        and("close.root contents contains a link to stylesheet", () => {
          then("the stylesheet file's name is correct", () => {
            expect(close.root.innerHTML).toContain(CSS);
          });
        });
      });
    });
  });
});

// State

// Operation

// Event

// Gesture
