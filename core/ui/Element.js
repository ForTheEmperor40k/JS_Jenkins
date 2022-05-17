import { info } from '../logger';

export class Element {
  DEFAULT_TIMEOUT = 30000;

  constructor(selector, name = 'Element') {
    this.selector = selector;
    this.name = name;
  }

  get element() {
    return $(this.selector);
  }

  get elements() {
    return $$(this.selector);
  }

  async getCount(){
    return await this.elements.length;
  }

  async getElement(numberOfElement){
    return await this.elements[numberOfElement];
  }

  async getNestedElement(selector) {
    return await this.element.$(selector);
  }

  async getAttribute(name) {
    info(`Going to get ${name} attribute for ${this.name}`);
    return await this.element.getAttribute(name);
  }

  async getText() {
    info(`Going to get text for ${this.name}`)
    return await this.element.getText();
  }

  async getValue() {
    info(`Going to get value for ${this.name}`)
    return await this.element.isExisting() ? this.element.getValue() : null;
  }

  async waitUntilVisible(timeout = this.DEFAULT_TIMEOUT, reverse = false) {
    await this.element.waitForDisplayed(timeout, reverse, `${this.name} is not displayed`);
  }

  async waitUntilClickable(timeout = this.DEFAULT_TIMEOUT, reverse = false) {
    await this.element.waitForClickable(timeout, reverse, `${this.name} is not clickable`);
  }

  async waitUntilEnabled(timeout = this.DEFAULT_TIMEOUT, reverse = false) {
    await this.element.waitForEnabled(timeout, reverse, `${this.name} is not enabled`);
  }

  async waitUntilTrue(timeout = this.DEFAULT_TIMEOUT, value){
    await this.element.waitUntil(
      async () => (await value == true)
    );
  }

  async moveTo(x, y) {
    info(`Going to move ${this.name} to x: ${x} y: ${y}`)
    const intX = await parseInt(x, 10) || undefined;
    const intY = await parseInt(y, 10) || undefined;
    await this.element.moveTo(intX, intY);
  }

  async click() {
    info(`Going to click ${this.name}`);
    await this.waitUntilClickable();
    await this.element.click();
  }

  async sendKey(keyname) {
    info(`Going to send "${keyname}" key to ${this.name}`);
    await this.element.keys(keyname);
  }

  async isExisting() {
    return await this.element.isExisting();
  }

  async isDisplayed() {
    return await this.element.isDisplayed();
  }

  async dragAndDrop(dropElement){
    await this.element.dragAndDrop(await dropElement.element);
  }
}
