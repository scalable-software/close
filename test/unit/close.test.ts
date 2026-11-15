import { Template } from "@scalable.software/component";

import {
  Close,
  Tag,
  CSS,
  Attributes,
  State,
  Visibility,
  Status,
  Appearance,
  Operation,
  Event,
  Gesture,
  Key
} from "@scalable.software/close";

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

            then("`div.icon` contains `svg.close`", () => {
              const svg = div.querySelector("svg.close");
              expect(svg).not.toBeNull();
            });

            then("`div.icon` has `tabindex` `0`", () => {
              expect(div.getAttribute("tabindex")).toBe("0");
            });

            then("`div.icon` has `role` `button`", () => {
              expect(div.getAttribute("role")).toBe("button");
            });

            then("`div.icon` has `aria-label` `Close`", () => {
              expect(div.getAttribute("aria-label")).toBe("Close");
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

composition(Composition.ELEMENT, () => {
  and("Close is defined in custom element registry", () => {
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

        then("`close.elements.icon` is defined", () => {
          expect(close["elements"].icon).toBeDefined();
        });

        when("`close.elements.icon` is defined", () => {
          then(
            "`close.elements.icon` is a cached reference to the `div` with class `icon`",
            () => {
              const icon = close.root.querySelector(".icon") as HTMLDivElement;
              expect(close["elements"].icon).toBe(icon);
            }
          );
        });
      });
    });
  });
});

// State
state(State.VISIBILITY, () => {
  given("Close is defined in custom element registry", () => {
    beforeEach(() => {
      define(Close.Tag, Close);
    });

    and("a HTML Template is added to DOM", () => {
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

        then("`close.visibility` getter exists", () => {
          expect(close.visibility).toBeDefined();
        });

        when("`close.visibility` getter exists", () => {
          then("`close.visibility` is `Visibility.VISIBLE`", () => {
            expect(close.visibility).toBe(Visibility.VISIBLE);
          });
        });

        then("`visibility` attribute does not exist", () => {
          expect(close.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
        });

        then("`close.visibility` setter exists", () => {
          expect(hasSetter(close, "visibility")).toBeTrue();
        });

        and("`close.visibility` setter exists", () => {
          when("`close.visibility` is set to `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              close.visibility = Visibility.HIDDEN;
            });

            then("`close.visibility` is `Visibility.HIDDEN`", () => {
              expect(close.visibility).toBe(Visibility.HIDDEN);
            });

            then("close `visibility` attribute is `Visibility.HIDDEN`", () => {
              const value = close.getAttribute(Attributes.VISIBILITY);
              expect(value).toBe(Visibility.HIDDEN);
            });

            when("`close.visibility` is set to `Visibility.VISIBLE`", () => {
              beforeEach(() => {
                close.visibility = Visibility.VISIBLE;
              });

              then("`visibility` attribute does not exist", () => {
                expect(close.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
              });
            });

            when("`visibility` attribute is set to `invalid`", () => {
              beforeEach(async () => {
                await jasmine.spyOnGlobalErrorsAsync(async () => {
                  close.setAttribute(Attributes.VISIBILITY, "invalid");
                });
              });

              then("`visibility` attribute is `Visibility.HIDDEN`", () => {
                const value = close.getAttribute(Attributes.VISIBILITY);
                expect(value).toBe(Visibility.HIDDEN);
              });
            });
          });

          when("`visibility` attribute is set to `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              close.setAttribute(Attributes.VISIBILITY, Visibility.HIDDEN);
            });

            then("`close.visibility` is `Visibility.HIDDEN`", () => {
              expect(close.visibility).toBe(Visibility.HIDDEN);
            });
          });

          when("`visibility` attribute is set to `invalid`", () => {
            let error: Error;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                close.setAttribute(Attributes.VISIBILITY, "invalid");
                error = reported.calls.mostRecent()?.args[0];
              });
            });

            then("`visibility` attribute does not exist", () => {
              expect(close.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
            });

            then("`close.visibility` is `Visibility.VISIBLE`", () => {
              expect(close.visibility).toBe(Visibility.VISIBLE);
            });

            then("an error is reported", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid visibility value: invalid'",
              () => {
                expect(error.message).toBe("Invalid visibility value: invalid");
              }
            );
          });

          when("`visibility` attribute is set to `Visibility.VISIBLE`", () => {
            beforeEach(() => {
              close.setAttribute(Attributes.VISIBILITY, Visibility.VISIBLE);
            });

            then("`visibility` attribute does not exist", () => {
              expect(close.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
            });
          });

          when("`close.visibility` is set to `null`", () => {
            beforeEach(() => {
              close.visibility = null;
            });

            then("`close.visibility` is `Visibility.VISIBLE`", () => {
              expect(close.visibility).toBe(Visibility.VISIBLE);
            });
          });

          when("`close.visibility` is set to `invalid`", () => {
            let error: Error;
            beforeEach(() => {
              try {
                // @ts-expect-error
                close.visibility = "invalid";
              } catch (err) {
                error = err as Error;
              }
            });

            then("an error is thrown", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid visibility value: invalid'",
              () => {
                expect(error.message).toBe("Invalid visibility value: invalid");
              }
            );
          });
        });
      });
    });
  });
});
state(State.STATUS, () => {
  given("Close is defined in custom element registry", () => {
    beforeEach(() => {
      define(Close.Tag, Close);
    });

    and("a HTML Template is added to DOM", () => {
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

        then("`close.status` getter exists", () => {
          expect(close.status).toBeDefined();
        });

        when("`close.status` getter exists", () => {
          then("`close.status` is `Status.RELEASED`", () => {
            expect(close.status).toBe(Status.RELEASED);
          });
        });

        then("`status` attribute exists", () => {
          const value = close.getAttribute(Attributes.STATUS);
          expect(value).not.toBeNull();
        });

        and("`status` attribute exists", () => {
          then("`status` attribute is `Status.RELEASED`", () => {
            const value = close.getAttribute(Attributes.STATUS);
            expect(value).toBe(Status.RELEASED);
          });

          when("`status` attribute is set to `Status.PRESSED`", () => {
            let errors: number;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                close.setAttribute(Attributes.STATUS, Status.PRESSED);
                errors = reported.calls.count();
              });
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = close.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });

            then("`close.status` is `Status.RELEASED`", () => {
              expect(close.status).toBe(Status.RELEASED);
            });

            then("no error is reported", () => {
              expect(errors).toBe(0);
            });
          });

          when("`status` attribute is set to `invalid`", () => {
            let errors: number;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                close.setAttribute(Attributes.STATUS, "invalid");
                errors = reported.calls.count();
              });
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = close.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });

            then("no error is reported", () => {
              expect(errors).toBe(0);
            });
          });

          when("`status` attribute is removed", () => {
            beforeEach(() => {
              close.removeAttribute(Attributes.STATUS);
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = close.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });
          });
        });

        then("assigning `close.status` outside the close does not compile", () => {
          const assign = () => {
            // @ts-expect-error: `status` is readonly, only the close changes it
            close.status = Status.PRESSED;
          };
          expect(assign).toEqual(jasmine.any(Function));
        });
      });

      and(
        "a new close with `status` attribute `Status.PRESSED` is added to DOM",
        () => {
          let close: Close;
          beforeEach(() => {
            close = add<Close>(Close.Tag, {
              [Attributes.STATUS]: Status.PRESSED
            });
          });
          afterEach(() => {
            close.remove();
          });

          then("`close.status` is `Status.RELEASED`", () => {
            expect(close.status).toBe(Status.RELEASED);
          });

          then("`status` attribute is `Status.RELEASED`", () => {
            const value = close.getAttribute(Attributes.STATUS);
            expect(value).toBe(Status.RELEASED);
          });
        }
      );
    });
  });
});
state(State.APPEARANCE, () => {
  given("Close is defined in custom element registry", () => {
    beforeEach(() => {
      define(Close.Tag, Close);
    });

    and("a HTML Template is added to DOM", () => {
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

        then("`close.appearance` getter exists", () => {
          expect(close.appearance).toBeDefined();
        });

        when("`close.appearance` getter exists", () => {
          then("`close.appearance` is `Appearance.FLOATING`", () => {
            expect(close.appearance).toBe(Appearance.FLOATING);
          });
        });

        then("`appearance` attribute does not exist", () => {
          expect(close.hasAttribute(Attributes.APPEARANCE)).toBeFalse();
        });

        then("`close.appearance` setter exists", () => {
          expect(hasSetter(close, "appearance")).toBeTrue();
        });

        and("`close.appearance` setter exists", () => {
          when("`close.appearance` is set to `Appearance.FLAT`", () => {
            beforeEach(() => {
              close.appearance = Appearance.FLAT;
            });

            then("`close.appearance` is `Appearance.FLAT`", () => {
              expect(close.appearance).toBe(Appearance.FLAT);
            });

            then("close `appearance` attribute is `Appearance.FLAT`", () => {
              const value = close.getAttribute(Attributes.APPEARANCE);
              expect(value).toBe(Appearance.FLAT);
            });

            when("`close.appearance` is set to `Appearance.FLOATING`", () => {
              beforeEach(() => {
                close.appearance = Appearance.FLOATING;
              });

              then("`appearance` attribute does not exist", () => {
                expect(close.hasAttribute(Attributes.APPEARANCE)).toBeFalse();
              });
            });

            when("`appearance` attribute is set to `invalid`", () => {
              beforeEach(async () => {
                await jasmine.spyOnGlobalErrorsAsync(async () => {
                  close.setAttribute(Attributes.APPEARANCE, "invalid");
                });
              });

              then("`appearance` attribute is `Appearance.FLAT`", () => {
                const value = close.getAttribute(Attributes.APPEARANCE);
                expect(value).toBe(Appearance.FLAT);
              });
            });
          });

          when("`appearance` attribute is set to `Appearance.FLAT`", () => {
            beforeEach(() => {
              close.setAttribute(Attributes.APPEARANCE, Appearance.FLAT);
            });

            then("`close.appearance` is `Appearance.FLAT`", () => {
              expect(close.appearance).toBe(Appearance.FLAT);
            });
          });

          when("`appearance` attribute is set to `invalid`", () => {
            let error: Error;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                close.setAttribute(Attributes.APPEARANCE, "invalid");
                error = reported.calls.mostRecent()?.args[0];
              });
            });

            then("`appearance` attribute does not exist", () => {
              expect(close.hasAttribute(Attributes.APPEARANCE)).toBeFalse();
            });

            then("`close.appearance` is `Appearance.FLOATING`", () => {
              expect(close.appearance).toBe(Appearance.FLOATING);
            });

            then("an error is reported", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid appearance value: invalid'",
              () => {
                expect(error.message).toBe("Invalid appearance value: invalid");
              }
            );
          });

          when("`close.appearance` is set to `null`", () => {
            beforeEach(() => {
              close.appearance = null;
            });

            then("`close.appearance` is `Appearance.FLOATING`", () => {
              expect(close.appearance).toBe(Appearance.FLOATING);
            });
          });

          when("`close.appearance` is set to `invalid`", () => {
            let error: Error;
            beforeEach(() => {
              try {
                // @ts-expect-error
                close.appearance = "invalid";
              } catch (err) {
                error = err as Error;
              }
            });

            then("an error is thrown", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid appearance value: invalid'",
              () => {
                expect(error.message).toBe("Invalid appearance value: invalid");
              }
            );
          });
        });
      });
    });
  });
});

// Operation
operation(Operation.HIDE, () => {
  and("Close is defined in custom element registry", () => {
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

        then("`close.hide` method exists", () => {
          expect(close.hide).toBeDefined();
        });

        and("`close.hide` method exists", () => {
          when("invoking `close.hide`", () => {
            let result: unknown;
            beforeEach(() => {
              result = close.hide();
            });

            then("`close.visibility` is `Visibility.HIDDEN`", () => {
              expect(close.visibility).toBe(Visibility.HIDDEN);
            });

            then("`close.hide` returns nothing", () => {
              expect(result).toBeUndefined();
            });
          });
        });
      });
    });
  });
});

operation(Operation.SHOW, () => {
  and("Close is defined in custom element registry", () => {
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

        then("`close.show` method exists", () => {
          expect(close.show).toBeDefined();
        });

        and("`close.show` method exists", () => {
          and("`close.visibility` is `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              close.visibility = Visibility.HIDDEN;
            });

            when("invoking `close.show`", () => {
              let result: unknown;
              beforeEach(() => {
                result = close.show();
              });

              then("`close.visibility` is `Visibility.VISIBLE`", () => {
                expect(close.visibility).toBe(Visibility.VISIBLE);
              });

              then("`close.show` returns nothing", () => {
                expect(result).toBeUndefined();
              });
            });
          });
        });
      });
    });
  });
});

operation(Operation.CLOSE, () => {
  and("Close is defined in custom element registry", () => {
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

        then("`close.close` method exists", () => {
          expect(close.close).toBeDefined();
        });

        and("`close.close` method exists", () => {
          when("invoking `close.close`", () => {
            let result: unknown;
            beforeEach(() => {
              result = close.close();
            });

            then("`close.visibility` is still `Visibility.VISIBLE`", () => {
              expect(close.visibility).toBe(Visibility.VISIBLE);
            });

            then("`close.status` is still `Status.RELEASED`", () => {
              expect(close.status).toBe(Status.RELEASED);
            });

            then("`close.appearance` is still `Appearance.FLOATING`", () => {
              expect(close.appearance).toBe(Appearance.FLOATING);
            });

            then("`close.close` returns nothing", () => {
              expect(result).toBeUndefined();
            });
          });
        });
      });
    });
  });
});

// Event
events(Event.ON_HIDE, () => {
  and("Close is defined in custom element registry", () => {
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

        then("`close.onhide` setter exists", () => {
          expect(hasSetter(close, Event.ON_HIDE)).toBeTrue();
        });

        and("`close.onhide` setter exists", () => {
          and("`close.onhide` is set to a listener", () => {
            let onhide: jasmine.Spy;
            beforeEach(() => {
              onhide = jasmine.createSpy("onhide");
              close.onhide = onhide;
            });

            when("`close.onhide` is set to `invalid`", () => {
              let error: Error;
              beforeEach(() => {
                try {
                  // @ts-expect-error
                  close.onhide = "invalid";
                } catch (err) {
                  error = err as Error;
                }
              });

              then("an error is thrown", () => {
                expect(error).toBeDefined();
              });

              then("error message contains 'Invalid onhide value: invalid'", () => {
                expect(error.message).toBe("Invalid onhide value: invalid");
              });

              when("`close.visibility` is set to `Visibility.HIDDEN`", () => {
                beforeEach(() => {
                  close.visibility = Visibility.HIDDEN;
                });

                then("`close.onhide` is still called", () => {
                  expect(onhide).toHaveBeenCalled();
                });
              });
            });

            and("`close.onhide` is set to a new listener", () => {
              let onhide2: jasmine.Spy;
              beforeEach(() => {
                onhide2 = jasmine.createSpy("onhide2");
                close.onhide = onhide2;
              });

              when("`close.visibility` is set to `Visibility.HIDDEN`", () => {
                beforeEach(() => {
                  close.visibility = Visibility.HIDDEN;
                });

                then("old `close.onhide` is not called", () => {
                  expect(onhide).not.toHaveBeenCalled();
                });

                then("new `close.onhide` is called", () => {
                  expect(onhide2).toHaveBeenCalled();
                });
              });
            });

            when("`close.visibility` is set to `Visibility.HIDDEN` twice", () => {
              beforeEach(() => {
                close.visibility = Visibility.HIDDEN;
                close.visibility = Visibility.HIDDEN;
              });

              then("`close.onhide` is called once", () => {
                expect(onhide).toHaveBeenCalledTimes(1);
              });
            });

            when("`close.visibility` is set to `Visibility.HIDDEN`", () => {
              beforeEach(() => {
                close.visibility = Visibility.HIDDEN;
              });

              then("`close.onhide` is called", () => {
                expect(onhide).toHaveBeenCalled();
              });

              then(
                "`close.onhide` is called with `{ detail: { visibility: Visibility.HIDDEN } }`",
                () => {
                  const message = {
                    detail: { visibility: Visibility.HIDDEN }
                  };
                  expect(onhide).toHaveBeenCalledWith(
                    jasmine.objectContaining(message)
                  );
                }
              );
            });
          });
        });
      });
    });
  });
});
events(Event.ON_SHOW, () => {
  and("Close is defined in custom element registry", () => {
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

        then("`close.onshow` setter exists", () => {
          expect(hasSetter(close, Event.ON_SHOW)).toBeTrue();
        });

        and("`close.onshow` setter exists", () => {
          and("`close.visibility` is set to `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              close.visibility = Visibility.HIDDEN;
            });

            and("`close.onshow` is set to a listener", () => {
              let onshow: jasmine.Spy;
              beforeEach(() => {
                onshow = jasmine.createSpy("onshow");
                close.onshow = onshow;
              });

              when("`close.onshow` is set to `invalid`", () => {
                let error: Error;
                beforeEach(() => {
                  try {
                    // @ts-expect-error
                    close.onshow = "invalid";
                  } catch (err) {
                    error = err as Error;
                  }
                });

                then("an error is thrown", () => {
                  expect(error).toBeDefined();
                });

                then("error message contains 'Invalid onshow value: invalid'", () => {
                  expect(error.message).toBe("Invalid onshow value: invalid");
                });

                when("`close.visibility` is set to `Visibility.VISIBLE`", () => {
                  beforeEach(() => {
                    close.visibility = Visibility.VISIBLE;
                  });

                  then("`close.onshow` is still called", () => {
                    expect(onshow).toHaveBeenCalled();
                  });
                });
              });

              and("`close.onshow` is set to a new listener", () => {
                let onshow2: jasmine.Spy;
                beforeEach(() => {
                  onshow2 = jasmine.createSpy("onshow2");
                  close.onshow = onshow2;
                });

                when("`close.visibility` is set to `Visibility.VISIBLE`", () => {
                  beforeEach(() => {
                    close.visibility = Visibility.VISIBLE;
                  });

                  then("old `close.onshow` is not called", () => {
                    expect(onshow).not.toHaveBeenCalled();
                  });

                  then("new `close.onshow` is called", () => {
                    expect(onshow2).toHaveBeenCalled();
                  });
                });
              });

              when("`close.visibility` is set to `Visibility.VISIBLE` twice", () => {
                beforeEach(() => {
                  close.visibility = Visibility.VISIBLE;
                  close.visibility = Visibility.VISIBLE;
                });

                then("`close.onshow` is called once", () => {
                  expect(onshow).toHaveBeenCalledTimes(1);
                });
              });

              when("`close.visibility` is set to `Visibility.VISIBLE`", () => {
                beforeEach(() => {
                  close.visibility = Visibility.VISIBLE;
                });

                then("`close.onshow` is called", () => {
                  expect(onshow).toHaveBeenCalled();
                });

                then(
                  "`close.onshow` is called with `{ detail: { visibility: Visibility.VISIBLE } }`",
                  () => {
                    const message = {
                      detail: { visibility: Visibility.VISIBLE }
                    };
                    expect(onshow).toHaveBeenCalledWith(
                      jasmine.objectContaining(message)
                    );
                  }
                );
              });
            });
          });
        });
      });
    });
  });
});
events(Event.ON_CLOSE, () => {
  and("Close is defined in custom element registry", () => {
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

        then("`close.onclose` setter exists", () => {
          expect(hasSetter(close, Event.ON_CLOSE)).toBeTrue();
        });

        then("`close.onclose` setter is the close's own, not the platform's", () => {
          const own = Object.getOwnPropertyDescriptor(
            Close.prototype,
            Event.ON_CLOSE
          );
          expect(own?.set).toBeDefined();
        });

        and("`close.onclose` setter exists", () => {
          and("`close.onclose` is set to a listener", () => {
            let onclose: jasmine.Spy;
            beforeEach(() => {
              onclose = jasmine.createSpy("onclose");
              close.onclose = onclose;
            });

            when("invoking `close.close`", () => {
              beforeEach(() => {
                close.close();
              });

              then("`close.onclose` is called", () => {
                expect(onclose).toHaveBeenCalled();
              });

              then("`close.onclose` is called with no detail", () => {
                const message = { detail: null };
                expect(onclose).toHaveBeenCalledWith(
                  jasmine.objectContaining(message)
                );
              });
            });

            when("invoking `close.close` twice", () => {
              beforeEach(() => {
                close.close();
                close.close();
              });

              then("`close.onclose` is called twice", () => {
                expect(onclose).toHaveBeenCalledTimes(2);
              });
            });

            when("`close.onclose` is set to `invalid`", () => {
              let error: Error;
              beforeEach(() => {
                try {
                  // @ts-expect-error
                  close.onclose = "invalid";
                } catch (err) {
                  error = err as Error;
                }
              });

              then("an error is thrown", () => {
                expect(error).toBeDefined();
              });

              then("error message contains 'Invalid onclose value: invalid'", () => {
                expect(error.message).toBe("Invalid onclose value: invalid");
              });

              when("invoking `close.close`", () => {
                beforeEach(() => {
                  close.close();
                });

                then("`close.onclose` is still called", () => {
                  expect(onclose).toHaveBeenCalled();
                });
              });
            });

            and("`close.onclose` is set to a new listener", () => {
              let onclose2: jasmine.Spy;
              beforeEach(() => {
                onclose2 = jasmine.createSpy("onclose2");
                close.onclose = onclose2;
              });

              when("invoking `close.close`", () => {
                beforeEach(() => {
                  close.close();
                });

                then("old `close.onclose` is not called", () => {
                  expect(onclose).not.toHaveBeenCalled();
                });

                then("new `close.onclose` is called", () => {
                  expect(onclose2).toHaveBeenCalled();
                });
              });
            });

          });
        });
      });
    });
  });
});

// Gesture
gesture(Gesture.POINTERDOWN, () => {
  and("Close is defined in custom element registry", () => {
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

        when("user `pointerdown` on `div` with class `icon`", () => {
          beforeEach(() => {
            const icon = close.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(new PointerEvent(Gesture.POINTERDOWN));
          });

          then("`close.status` is `Status.PRESSED`", () => {
            expect(close.status).toEqual(Status.PRESSED);
          });

          then("`status` attribute is `Status.PRESSED`", () => {
            const value = close.getAttribute(Attributes.STATUS);
            expect(value).toBe(Status.PRESSED);
          });
        });
      });
    });
  });
});

gesture(Gesture.POINTERUP, () => {
  and("Close is defined in custom element registry", () => {
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

        and("user `pointerdown` on `div` with class `icon`", () => {
          beforeEach(() => {
            const icon = close.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(new PointerEvent(Gesture.POINTERDOWN));
          });

          when("user `pointerup` on `div` with class `icon`", () => {
            beforeEach(() => {
              const icon = close.root.querySelector(".icon") as HTMLElement;
              icon.dispatchEvent(new PointerEvent(Gesture.POINTERUP));
            });

            then("`close.status` is `Status.RELEASED`", () => {
              expect(close.status).toEqual(Status.RELEASED);
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = close.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });
          });
        });
      });
    });
  });
});

gesture(Gesture.POINTERLEAVE, () => {
  and("Close is defined in custom element registry", () => {
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

        and("user `pointerdown` on `div` with class `icon`", () => {
          beforeEach(() => {
            const icon = close.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(new PointerEvent(Gesture.POINTERDOWN));
          });

          when("the pointer leaves `div` with class `icon`", () => {
            let onclose: jasmine.Spy;
            beforeEach(() => {
              onclose = jasmine.createSpy("onclose");
              close.onclose = onclose;
              const icon = close.root.querySelector(".icon") as HTMLElement;
              icon.dispatchEvent(new PointerEvent(Gesture.POINTERLEAVE));
            });

            then("`onclose` is not called", () => {
              expect(onclose).not.toHaveBeenCalled();
            });

            then("`close.status` is `Status.RELEASED`", () => {
              expect(close.status).toEqual(Status.RELEASED);
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = close.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });
          });
        });
      });
    });
  });
});

gesture(Gesture.CLICK, () => {
  and("Close is defined in custom element registry", () => {
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

        when("user `click` on `div` with class `icon`", () => {
          let onclose: jasmine.Spy;
          beforeEach(() => {
            onclose = jasmine.createSpy("onclose");
            close.onclose = onclose;
            const icon = close.root.querySelector(".icon") as HTMLElement;
            icon.click();
          });

          then("`onclose` is called", () => {
            expect(onclose).toHaveBeenCalledTimes(1);
          });
        });
      });
    });
  });
});

gesture(Gesture.KEYDOWN, () => {
  and("Close is defined in custom element registry", () => {
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

        when("user presses `Key.ENTER` on `div` with class `icon`", () => {
          let onclose: jasmine.Spy;
          let event: KeyboardEvent;
          beforeEach(() => {
            onclose = jasmine.createSpy("onclose");
            close.onclose = onclose;
            event = new KeyboardEvent(Gesture.KEYDOWN, {
              key: Key.ENTER,
              cancelable: true
            });
            const icon = close.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(event);
          });

          then("`close.status` is `Status.PRESSED`", () => {
            expect(close.status).toEqual(Status.PRESSED);
          });

          then("`status` attribute is `Status.PRESSED`", () => {
            const value = close.getAttribute(Attributes.STATUS);
            expect(value).toBe(Status.PRESSED);
          });

          then("`onclose` is not called", () => {
            expect(onclose).not.toHaveBeenCalled();
          });

          then("the page does not scroll: default is prevented", () => {
            expect(event.defaultPrevented).toBeTrue();
          });

          when("user holds `Key.ENTER` down on `div` with class `icon`", () => {
            beforeEach(() => {
              const icon = close.root.querySelector(".icon") as HTMLElement;
              icon.dispatchEvent(
                new KeyboardEvent(Gesture.KEYDOWN, {
                  key: Key.ENTER,
                  repeat: true
                })
              );
            });

            then("`close.status` is `Status.PRESSED`", () => {
              expect(close.status).toEqual(Status.PRESSED);
            });

            then("`onclose` is not called", () => {
              expect(onclose).not.toHaveBeenCalled();
            });
          });
        });

        when("user presses `Key.SPACE` on `div` with class `icon`", () => {
          let onclose: jasmine.Spy;
          let event: KeyboardEvent;
          beforeEach(() => {
            onclose = jasmine.createSpy("onclose");
            close.onclose = onclose;
            event = new KeyboardEvent(Gesture.KEYDOWN, {
              key: Key.SPACE,
              cancelable: true
            });
            const icon = close.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(event);
          });

          then("`close.status` is `Status.PRESSED`", () => {
            expect(close.status).toEqual(Status.PRESSED);
          });

          then("`status` attribute is `Status.PRESSED`", () => {
            const value = close.getAttribute(Attributes.STATUS);
            expect(value).toBe(Status.PRESSED);
          });

          then("`onclose` is not called", () => {
            expect(onclose).not.toHaveBeenCalled();
          });

          then("the page does not scroll: default is prevented", () => {
            expect(event.defaultPrevented).toBeTrue();
          });

          when("user holds `Key.SPACE` down on `div` with class `icon`", () => {
            beforeEach(() => {
              const icon = close.root.querySelector(".icon") as HTMLElement;
              icon.dispatchEvent(
                new KeyboardEvent(Gesture.KEYDOWN, {
                  key: Key.SPACE,
                  repeat: true
                })
              );
            });

            then("`close.status` is `Status.PRESSED`", () => {
              expect(close.status).toEqual(Status.PRESSED);
            });

            then("`onclose` is not called", () => {
              expect(onclose).not.toHaveBeenCalled();
            });
          });
        });

        when("user presses another key on `div` with class `icon`", () => {
          let onclose: jasmine.Spy;
          let event: KeyboardEvent;
          beforeEach(() => {
            onclose = jasmine.createSpy("onclose");
            close.onclose = onclose;
            event = new KeyboardEvent(Gesture.KEYDOWN, {
              key: "a",
              cancelable: true
            });
            const icon = close.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(event);
          });

          then("`onclose` is not called", () => {
            expect(onclose).not.toHaveBeenCalled();
          });

          then("`close.status` is `Status.RELEASED`", () => {
            expect(close.status).toEqual(Status.RELEASED);
          });

          then("the default is not prevented", () => {
            expect(event.defaultPrevented).toBeFalse();
          });
        });
      });
    });
  });
});

gesture(Gesture.KEYUP, () => {
  and("Close is defined in custom element registry", () => {
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

        and("user presses `Key.ENTER` on `div` with class `icon`", () => {
          let onclose: jasmine.Spy;
          beforeEach(() => {
            onclose = jasmine.createSpy("onclose");
            close.onclose = onclose;
            const icon = close.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(
              new KeyboardEvent(Gesture.KEYDOWN, { key: Key.ENTER })
            );
          });

          when("user lifts `Key.ENTER` on `div` with class `icon`", () => {
            beforeEach(() => {
              const icon = close.root.querySelector(".icon") as HTMLElement;
              icon.dispatchEvent(
                new KeyboardEvent(Gesture.KEYUP, { key: Key.ENTER })
              );
            });

            then("`onclose` is called", () => {
              expect(onclose).toHaveBeenCalledTimes(1);
            });

            then("`close.status` is `Status.RELEASED`", () => {
              expect(close.status).toEqual(Status.RELEASED);
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = close.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });

            when("user lifts `Key.ENTER` on `div` with class `icon` again", () => {
              beforeEach(() => {
                const icon = close.root.querySelector(".icon") as HTMLElement;
                icon.dispatchEvent(
                  new KeyboardEvent(Gesture.KEYUP, { key: Key.ENTER })
                );
              });

              then("`onclose` is not called again", () => {
                expect(onclose).toHaveBeenCalledTimes(1);
              });
            });
          });
        });

        and("user presses `Key.SPACE` on `div` with class `icon`", () => {
          let onclose: jasmine.Spy;
          beforeEach(() => {
            onclose = jasmine.createSpy("onclose");
            close.onclose = onclose;
            const icon = close.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(
              new KeyboardEvent(Gesture.KEYDOWN, { key: Key.SPACE })
            );
          });

          when("user lifts `Key.SPACE` on `div` with class `icon`", () => {
            beforeEach(() => {
              const icon = close.root.querySelector(".icon") as HTMLElement;
              icon.dispatchEvent(
                new KeyboardEvent(Gesture.KEYUP, { key: Key.SPACE })
              );
            });

            then("`onclose` is called", () => {
              expect(onclose).toHaveBeenCalledTimes(1);
            });

            then("`close.status` is `Status.RELEASED`", () => {
              expect(close.status).toEqual(Status.RELEASED);
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = close.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });

            when("user lifts `Key.SPACE` on `div` with class `icon` again", () => {
              beforeEach(() => {
                const icon = close.root.querySelector(".icon") as HTMLElement;
                icon.dispatchEvent(
                  new KeyboardEvent(Gesture.KEYUP, { key: Key.SPACE })
                );
              });

              then("`onclose` is not called again", () => {
                expect(onclose).toHaveBeenCalledTimes(1);
              });
            });
          });
        });

        when("user lifts `Key.ENTER` on `div` with class `icon`, without pressing it first", () => {
          let onclose: jasmine.Spy;
          beforeEach(() => {
            onclose = jasmine.createSpy("onclose");
            close.onclose = onclose;
            const icon = close.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(
              new KeyboardEvent(Gesture.KEYUP, { key: Key.ENTER })
            );
          });

          then("`onclose` is not called", () => {
            expect(onclose).not.toHaveBeenCalled();
          });
        });

        when("user lifts `Key.SPACE` on `div` with class `icon`, without pressing it first", () => {
          let onclose: jasmine.Spy;
          beforeEach(() => {
            onclose = jasmine.createSpy("onclose");
            close.onclose = onclose;
            const icon = close.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(
              new KeyboardEvent(Gesture.KEYUP, { key: Key.SPACE })
            );
          });

          then("`onclose` is not called", () => {
            expect(onclose).not.toHaveBeenCalled();
          });
        });

        and("user presses `Key.ENTER` on `div` with class `icon`", () => {
          let onclose: jasmine.Spy;
          beforeEach(() => {
            onclose = jasmine.createSpy("onclose");
            close.onclose = onclose;
            const icon = close.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(
              new KeyboardEvent(Gesture.KEYDOWN, { key: Key.ENTER })
            );
          });

          when("user lifts another key on `div` with class `icon`", () => {
            beforeEach(() => {
              const icon = close.root.querySelector(".icon") as HTMLElement;
              icon.dispatchEvent(new KeyboardEvent(Gesture.KEYUP, { key: "a" }));
            });

            then("`onclose` is not called", () => {
              expect(onclose).not.toHaveBeenCalled();
            });

            then("`close.status` is `Status.PRESSED`", () => {
              expect(close.status).toEqual(Status.PRESSED);
            });
          });
        });
      });
    });
  });
});
