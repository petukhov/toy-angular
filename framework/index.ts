import { InstructionParams, InstructionsEmitter } from './instructions-emitter';
import { ElementNode, TemplateParser } from './template-parser';

function compileToNode(env, instructions: [(arg: InstructionParams) => HTMLElement | Text, InstructionParams][]) {
  let res;
  for (let i = 0; i < instructions.length; i++) {
      const [fn, arg] = instructions[i];
      res = fn({...arg, env});
  }
  return res;
}

export function bootstrap(component: any) {
  console.warn("Bootstrapping!!...", component);
  const selector = component.prototype.selector;
  const newComp = new component();
  const node = compileToNode(newComp, component.prototype.compiledTmpl);
  const parentNode = document.querySelector(selector);
  parentNode.appendChild(node);
  new EventSource('/esbuild').addEventListener('change', () => location.reload());
}

// parse the xml template and return the parsed AST
function parseTemplate(template: string) {
  const parser = new TemplateParser();
  const ast = parser.parse(template);
  console.warn("Parsed AST:", ast);
  return ast;
}

// Function that compiles the template's AST into step-by-step instructions to create the DOM nodes
function compile(ast: ElementNode | null) {
  const emitter = new InstructionsEmitter();
  const instructions = emitter.emit(ast!);
  return instructions;
}

export function Component(options: {
  selector: string;
  template: string;
}): ClassDecorator {
  return function (target: any) {
    // Add the selector and template properties to the component class
    target.prototype.selector = options.selector;
    target.prototype.template = options.template;
    target.prototype.compiledTmpl = compile(parseTemplate(options.template));
  };
}
