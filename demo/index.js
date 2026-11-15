import { Close } from "@scalable.software/close";

await Close.Template.load("close.template.html");

customElements.define(Close.Tag, Close);
