type NodeType = 'element' | 'text';
export type Node = ElementNode | TextNode;

export interface ElementNode {
  type: NodeType;
  tagName: string;
  attributes: Record<string, string>;
  children: Node[];
}

export interface TextNode {
  type: NodeType;
  content: string;
}

export class TemplateParser {
  private cursor: number = 0;
  private input: string = '';

  parse(input: string): ElementNode | null {
    this.cursor = 0;
    this.input = input.trim();
    if (this.input.startsWith('<')) {
      return this.parseElement();
    }
    return null;
  }

  private parseElement(): ElementNode {
    this.consume('<');
    const tagName = this.parseTagName();
    const attributes = this.parseAttributes();
    this.consume('>');

    const children: Node[] = [];
    while (!this.startsWith(`</${tagName}>`)) {
      if (this.startsWith('<')) {
        children.push(this.parseElement());
      } else {
        const node = this.parseText();
        if (node.content.trim().length > 0) {
            children.push(node);
        }
      }
    }
    this.consume(`</${tagName}>`);

    return {
      type: 'element',
      tagName,
      attributes,
      children
    };
  }

  private parseTagName(): string {
    const matches = this.input.slice(this.cursor).match(/^[a-z][\w\-]*/i);
    if (!matches) {
      throw new Error('Invalid tag name');
    }
    const tagName = matches[0];
    this.cursor += tagName.length;
    return tagName;
  }

  private parseAttributes(): Record<string, string> {
    const attributes: Record<string, string> = {};
    const attrRegex = /\s*([a-zA-Z]+)="([^"]*)"/;
  
    // Move cursor to where attributes should start
    while (this.input[this.cursor] !== '>' && !this.input.startsWith('/>', this.cursor)) {
      // Slice the input from the current cursor position to the first occurrence of '>'
      const attrMatch = this.input.slice(this.cursor).match(attrRegex);
      if (attrMatch) {
        const [fullMatch, attrName, attrValue] = attrMatch;
        attributes[attrName] = attrValue;
        this.cursor += fullMatch.length;
      } else {
        // If there is no match, it means we reached the end of attributes.
        break;
      }
    }
    return attributes;
  }

  private parseText(): TextNode {
    const endOfText = this.input.indexOf('<', this.cursor);
    const content = this.input.slice(this.cursor, endOfText);
    this.cursor = endOfText;
    return {
      type: 'text',
      content: content.trim(),
    };
  }

  private consume(str: string): void {
    if (this.startsWith(str)) {
      this.cursor += str.length;
    } else {
      throw new Error(`Expected "${str}"`);
    }
  }

  private startsWith(str: string): boolean {
    // ignore white space or new lines
    while (this.input[this.cursor] === ' ' || this.input[this.cursor] === '\n') {
      this.cursor++;
    }
    return this.input.startsWith(str, this.cursor);
  }

  showCurr(count = 5): string {
    return this.input.slice(this.cursor, this.cursor + count);
  }
}