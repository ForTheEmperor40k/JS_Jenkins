import { functionsIn } from 'lodash';
import { Element } from './ui';

export const openUrl = async url => {
  await browser.url(url);
}

export const getUrl = async () => {
  return await browser.getUrl();
}

export const openPath = async path => {
  await browser.url(`${browser.options.baseUrl}${path}`);
}

export const goBack = async () => {
  await browser.back();
}

export const refreshPage = async () => {
  await browser.refresh();
}

export const openFrame = async (frameId, name = 'new') => {
  const frame = await new Element(`#${frameId}`, `Open ${name} frame`);
  frame.waitUntilVisible();
  await browser.switchToFrame(frameId);
}

export const closeFrame = async function() {
  await browser.switchToFrame(null);
}

export const switchTab = async id => {
  await browser.switchToWindow(id);
}

export const getWindows = async () => {
  return await browser.getWindowHandles();
}

export const acceptAlert = async () => {
  if (await browser.isAlertOpen()) {
    await browser.acceptAlert();
  }
}

export const dismissAlert = async () => {
  if (await browser.isAlertOpen()) {
    await browser.dismissAlert();
  }
}

export const sendAlertText = async (text) => {
  if (await browser.isAlertOpen()) {
    await browser.sendAlertText(text);
  }
}

export const scrollDown = async () => {
  await browser.keys("PageDown");
}

export const deleteCookies = async () => {
  await browser.deleteCookies()
}

export const clearLocalStorage = async () => {
  await browser.execute(() => localStorage.clear());
}