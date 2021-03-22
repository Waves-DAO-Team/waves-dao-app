import {browser, by, element, protractor} from 'protractor'

export class Header {

  async navigateTo (path: string = browser.baseUrl): Promise<unknown> {
    return await browser.get(path) as Promise<unknown>
  }

  async logoClickable (): Promise<string> {
    const EC = protractor.ExpectedConditions
    return browser.wait(EC.elementToBeClickable(element(by.css('.logo'))), 5000)
  }

  async headerIsPresent (): Promise<string> {
    const EC = protractor.ExpectedConditions
    return browser.wait(EC.presenceOf(element(by.css('.header'))), 5000)
  }

  async getActiveMenuItemColor (): Promise<string> {
    return element(by.css('.header .container .nav li.active')).getCssValue('color')
  }

}
