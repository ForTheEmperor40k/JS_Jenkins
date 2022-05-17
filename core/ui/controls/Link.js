import { Element } from '../Element';
import { info } from '../../logger';

const hrefAttribute = "href";

export class Link extends Element {
  constructor(selector, name = 'Link') {
    super(selector, name);
  }

  async getHref() {
    info(`Going to get href attribute for ${this.name}`);
    return await this.element.getAttribute(hrefAttribute);
  }
}
