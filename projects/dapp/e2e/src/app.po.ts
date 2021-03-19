import { browser, by, element } from 'protractor'

export class AppPage {
  async navigateTo (): Promise<unknown> {
    return browser.get(browser.baseUrl)
  }

  async getTitleText (): Promise<string> {
    return element(by.css('app-root .profile button')).getText()
  }

  // async getActiveMenuItemText(): Promise<string> {
  //   return element(by.css('app-root .nav li')).getText();
  // }

  // async getCssValue(): Promise<string> {
  //   return element(by.css('.nav li.active')).getCssValue('color');
  // }
}
