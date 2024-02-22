import { InstructionsEmitter } from './instructions-emitter';
import { TemplateParser } from './template-parser';

const tmpl = `
<div id="this-is-id" something="{{ someValue }}">
    Parent
    <span>My First Angular App</span>
    hello world  {{ someValue }}
</div>
`;

const parser = new TemplateParser();
const ast = parser.parse(tmpl);
console.log("AST:", JSON.stringify(ast, null, 2));


const emitter = new InstructionsEmitter();
const instructions = emitter.emit(ast!);
console.log("Instructions:", instructions);