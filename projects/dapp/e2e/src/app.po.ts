import {browser, by, element, protractor} from 'protractor'

export class AppPage {

  async navigateTo (path: string = browser.baseUrl): Promise<unknown> {
    return await browser.get(path) as Promise<unknown>
  }

  async footerIsPresent (): Promise<string> {
      const EC = protractor.ExpectedConditions
      return browser.wait(EC.presenceOf(element(by.css('.footer'))), 5000)
  }

  async getTitleOfGrantsPage (): Promise<string> {
    return element(by.css('.listing-page__title')).getText()
  }

  async getTitleOfMembersPage (): Promise<string> {
    return element(by.css('.members-page__title')).getText()
  }

}
