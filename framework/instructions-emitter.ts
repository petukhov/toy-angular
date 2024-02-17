import { ElementNode, TextNode } from "./template-parser";

/** Canonical example

Original Html:
    <a routerLink="/">
        <div [class]="val + 88">
            hello
            <h1>My Store</h1>
            something {{ val }} 123
        </div>
    </a>

    <a routerLink="/cart" class="button fancy-button">
        <em class="material-icons">shopping_cart</em>Checkout
    </a>

Compiled result:
    _TopBarComponent.\u0275cmp = @__PURE__ 
    i0.\u0275\u0275defineComponent({
        type: _TopBarComponent,
        selectors: [["app-top-bar"]],
        decls: 10,
        vars: 3,
        consts: [["routerLink", "/"], ["routerLink", "/cart", 1, "button", "fancy-button"], [1, "material-icons"]],
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
                i0.\u0275\u0275advance(1);
                i0.\u0275\u0275classMap(ctx.val + 88);
                i0.\u0275\u0275advance(4);
                i0.\u0275\u0275textInterpolate1(" something ", ctx.val, " 123 ");
            }
        },
        dependencies: [i1.RouterLink],
        styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K "]
    });
 */

export interface InstructionParams {
    tagName: string;
    ref: number;
    content?: string;
    attrs?: Record<string, string>;
}

const nodeStack: HTMLElement[] = []
 
const elStart = (params: InstructionParams) => {
    const el = document.createElement(params.tagName);
    const attrs = params.attrs ?? {};
    for (const key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
    const parent = nodeStack[nodeStack.length - 1];
    parent?.appendChild(el);
    nodeStack.push(el);
    return el;
};
const text = (params: InstructionParams) => {
    const el = document.createTextNode('text');
    el.textContent = params.content ?? '';
    const parent = nodeStack[nodeStack.length - 1];
    parent?.appendChild(el);
    return el;
};
const elEnd = (_) => {
    return nodeStack.pop()!;
};
// const advance = (arg: string) => {};

export class InstructionsEmitter {
    instructions: [(arg: InstructionParams) => HTMLElement | Text, type: InstructionParams][] = [];
    refCounter = 0;

    emit(originalEl: ElementNode) {
        const ref = this.refCounter++;

        this.instructions.push([elStart, { tagName: originalEl.tagName, ref, attrs: originalEl.attributes }]);

        let elements = (originalEl as ElementNode).children;
        let cursor = 0;
        let el = elements[cursor];
        while (el) {
            if (el.type === 'element') {
                this.emit(el as ElementNode);
            } else if (el.type === 'text') {
                const content = (el as TextNode).content;
                this.instructions.push([text, { tagName: 'text', ref, content}]);
            }
            el = elements[++cursor];
        }

        this.instructions.push([elEnd, { tagName: originalEl.tagName, ref }]);
        return this.instructions;
    }
}