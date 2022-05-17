import { Element } from '../Element';
import { info } from '../../logger';

export class TextField extends Element {
  constructor(selector, name = 'TextField') {
    super(selector, name);
  }

  async setValue(value) {
    info(`Going to set ${value} to ${this.name}`)
    await this.waitUntilVisible();
    return await this.element.setValue(value);
  }

  async selectText(){
    info(`Select text in ${this.name}`);
    await this.waitUntilVisible();
    await this.element.keys(["Control", "a"]);
  }
}
