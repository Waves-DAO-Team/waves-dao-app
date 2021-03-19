import { AppPage } from './app.po'
import {$, browser, by, element, logging} from 'protractor'
import {protractor} from 'protractor/built/ptor'

describe('workspace-project App', () => {
  let page: AppPage

  beforeEach(() => {
    page = new AppPage()
  })

  it('Test1: should display login button', () => {
    await page.navigateTo()
    // @ts-ignore
    expect(page.getTitleText()).toEqual('Login')
  })

  it('Test2: gets the login button tag', () => {
    // @ts-ignore
    expect(element(by.binding('app.header.login')).getTagName()).toBe('button')
  })

  // it('Test3: gets color of selected menu item', () => {
  //   // @ts-ignore
  //   expect(element(by.binding('contract.name')).getCssValue('color')).toBe('#717781');
  // });

  // it('Test3: should display menu items text', () => {
  //   page.navigateTo();
  //   // @ts-ignore
  //   expect(page.getActiveMenuItemText())
  //   .toEqual('Disruptive grants' | 'Interhack grants' | 'Special votings' | 'Web3.0 grants' | 'Members' | undefined);
  // });

  it('Test3: should check element Members to be clickable', () => {
    const EC = protractor.ExpectedConditions
    // @ts-ignore
    expect(browser.wait(EC.elementToBeClickable($('app.header.members')), 5000))
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER)
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry))
  })
})
