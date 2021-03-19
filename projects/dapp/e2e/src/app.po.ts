import {browser, by, element, protractor} from 'protractor'

export class AppPage {

  async navigateTo (path: string = browser.baseUrl): Promise<unknown> {
    return await browser.get(path) as Promise<unknown>
  }

  async getLandingTitleText (): Promise<string> {
    return element(by.css('.landing-page__title')).getText()
  }

  async logoClickable (): Promise<string> {
    const EC = protractor.ExpectedConditions
    return browser.wait(EC.elementToBeClickable(element(by.css('.logo'))), 5000)
  }

  async footerIsPresent (): Promise<string> {
      const EC = protractor.ExpectedConditions
      return browser.wait(EC.presenceOf(element(by.css('.footer'))), 5000)
  }

  async headerIsPresent (): Promise<string> {
    const EC = protractor.ExpectedConditions
    return browser.wait(EC.presenceOf(element(by.css('.header'))), 5000)
  }

  async getTitleOfGrantsPage (): Promise<string> {
    return element(by.css('.listing-page__title')).getText()
  }

  async getTitleOfMembersPage (): Promise<string> {
    return element(by.css('.members-page__title')).getText()
  }
}
