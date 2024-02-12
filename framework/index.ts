import { TemplateParser } from './template-parser';

export function bootstrap(component) {
  console.warn("Bootstrapping...", component);
}

// parse the xml template and return the parsed AST
function parseTemplate(template: string) {
  const parser = new TemplateParser();
  const ast = parser.parse(template);
  console.warn("Parsed AST:", ast);
  return ast;
}

export function Component(options: {
  selector: string;
  template: string;
}): ClassDecorator {
  return function (target: any) {
    // Add the selector and template properties to the component class
    target.prototype.selector = options.selector;
    target.prototype.template = parseTemplate(options.template);
  };
}
