import {browser, by, element} from 'protractor'

export class LandingPage {

  async navigateTo (path: string = browser.baseUrl): Promise<unknown> {
    return await browser.get(path) as Promise<unknown>
  }

  async getLandingTitleText (): Promise<string> {
    return element(by.css('.landing-page__title')).getText()
  }
}
