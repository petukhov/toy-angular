export function bootstrap(component) {
  console.warn("Bootstrapping...", component);
}

export function Component(options: {
  selector: string;
  template: string;
}): ClassDecorator {
  return function (target: any) {
    // Add the selector and template properties to the component class
    target.prototype.selector = options.selector;
    target.prototype.template = options.template;
  };
}
