import { Element } from '../Element';

export class ComboBox extends Element {
  constructor(selector, name = 'ComboBox') {
    super(selector, name);
  }

  selectByValue(value) {
    const element = this.element;
    element.click();
    element.selectByVisibleText(value);
    this.sendKey('Escape');
  }

  selectByChildTextValue(value) {
    browser.waitUntil(
      () => {
        const child = new Element(`${this.element.selector} li`);
        if (child.getText() === value) {
          child.click();
        }
        return true
      },
      30000,
      `Expected "${value}" location is not found`
    )
  }
}
