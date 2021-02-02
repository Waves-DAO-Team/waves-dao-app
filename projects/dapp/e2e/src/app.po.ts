import { browser, by, element } from 'protractor'

export class AppPage {
  async navigateTo (): Promise<unknown> {
    return await await await await await await await await await await await browser.get(browser.baseUrl) as Promise<unknown>
  }

  async getTitleText (): Promise<string> {
    return await element(by.css('app-root header .header__title')).getText()
  }
}
