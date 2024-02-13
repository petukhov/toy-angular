import { ElementNode, Node } from "./template-parser";

/**
 * Canonical example
i0.\u0275\u0275defineComponent({
    type: _TopBarComponent,
    selectors: [["app-top-bar"]],
    decls: 10,
    vars: 2,
    consts: [["routerLink", "/"], ["routerLink", "/cart", 1, "button", "fancy-button"], [1, "material-icons", 3, "id"]],
    template: function TopBarComponent_Template(rf, ctx) {
        if (rf & 1) {
            i0.\u0275\u0275elementStart(0, "a", 0)(1, "div");
            i0.\u0275\u0275text(2, " hello ");
            i0.\u0275\u0275elementStart(3, "h1");
            i0.\u0275\u0275text(4, "My Store");
            i0.\u0275\u0275elementEnd();
            i0.\u0275\u0275text(5);
            i0.\u0275\u0275elementEnd()();
            i0.\u0275\u0275elementStart(6, "a", 1)(7, "em", 2);
            i0.\u0275\u0275text(8, "shopping_cart");
            i0.\u0275\u0275elementEnd();
            i0.\u0275\u0275text(9, "Checkout\n");
            i0.\u0275\u0275elementEnd();
        }
        if (rf & 2) {
            i0.\u0275\u0275advance(5);
            i0.\u0275\u0275textInterpolate1(" ", ctx.val, " ");
            i0.\u0275\u0275advance(2);
            i0.\u0275\u0275property("id", ctx.val);
        }
    },
    dependencies: [i1.RouterLink],
    styles: ["\n\n# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K"]
});
 */
 
const elStart = () => {};
const text = () => {};
const elEnd = () => {};
const advance = () => {};

export class InstructionsEmitter {
    instructions: [() => void, type: string][] = [];

    emit(originalEl: ElementNode) {
        this.instructions.push([elStart, originalEl.tagName]);

        let elements = (originalEl as ElementNode).children;
        let cursor = 0;
        let el = elements[cursor];
        while (el) {
            if (el.type === 'element') {
                this.emit(el as ElementNode);
            } else if (el.type === 'text') {
                this.instructions.push([text, 'text']);
            }
            el = elements[++cursor];
        }

        this.instructions.push([elEnd, originalEl.tagName]);
        return this.instructions;
    }
}