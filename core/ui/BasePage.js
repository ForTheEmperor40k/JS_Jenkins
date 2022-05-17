import {curry} from "lodash";
import {closeFrame, goBack, openFrame} from "../browser";

export class BasePage {
  identifier

  constructor(identifier, name = 'Base page') {
    this.identifier = identifier;
    this.name = name;
  }

  withFrame = curry((id, action) => {
    let result;

    openFrame(id);
    result = action();
    closeFrame();

    return result;
  })

  async pressEnterOnElement() {
    await browser.keys("\uE007");
  }

  async acceptPopUp() {
    await browser.acceptAlert();
  }

  async dismissPopUp() {
    await browser.dismissAlert();
  }

  async getPopUpText() {
    return await browser.getAlertText();
  }

  async isPopUpVisible() {
    return await !!this.getPopUpText().length;
  }

  async backToPreviousPage() {
    await goBack();
  }

  async refreshPage() {
    await refreshPage();
  }
}
