import { Element } from '../Element';

export class CheckBox extends Element {
  constructor(selector, name = 'CheckBox') {
    super(selector, name);
  }

  async setChecked() {
    const element = this.element
    if (await element.isEnabled() && await !this.isSelected()) {
      await element.click();
    }
  }

  async setUnchecked() {
    const element = await this.element;
    if (await element.isEnabled() && await this.isSelected()) {
      await element.click();
    }
  }

  async isSelected() {
    return await this.element.isSelected();
  }
}
