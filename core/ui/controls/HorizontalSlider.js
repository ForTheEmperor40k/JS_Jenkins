import { Element } from '../Element';
import { info } from '../../logger';

export class HorizontalSlider extends Element {
  constructor(selector, name = 'Horizontal slider') {
    super(selector, name);
  }

  async moveSliderToTheRight(){
    info(`Move slider to the right ${this.name}`);
    await this.waitUntilClickable();
    await this.element.keys("\uE014");
  }
}