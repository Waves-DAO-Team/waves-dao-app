import { AppPage } from './app.po'
import {browser, by, element, logging, protractor} from 'protractor'

describe('workspace-project App', () => {
  let page: AppPage

  const EC = protractor.ExpectedConditions;
  const DEFAULT_TIMEOUT_IN_MS = 5000;

  beforeEach(() => {
    page = new AppPage()
  })

  it('Test3: footer is present', async () => {
    await page.navigateTo()
    // @ts-ignore this is necessary maybe
    expect(await page.footerIsPresent()).toBe(true)
  })

  it('Test5: loads Disruptive grants page and gives its title', async () => {
    await page.navigateTo('/grants/disruptive')
    expect(await page.getTitleOfGrantsPage()).toEqual('Disruptive Tech Grants')
  })

  it('Test6: loads Interhack grants page and gives its title', async () => {
    await page.navigateTo('/grants/interhack')
    expect(await page.getTitleOfGrantsPage()).toEqual('Interhack Grants')
  })

  it('Test7: loads Web3 grants page and gives its title', async () => {
    await page.navigateTo('/grants/web3')
    expect(await page.getTitleOfGrantsPage()).toEqual('Web 3.0 Dev Grants')
  })

  it('Test8: loads Members page and gives its title', async () => {
    await page.navigateTo('/members')
    expect(await page.getTitleOfMembersPage()).toEqual('Members')
  })

  it("Test11: login as WG and create a Web3.0 grant", async () => {
    await page.navigateTo('/grants/web3')
    const loginButton = element(by.method("signupHandler"));
    const passwordField = element(by.id("password")); //ye_bQSZ1vNbmu6j1

    // browser.wait(EC.elementToBeClickable(element(loginButton)), DEFAULT_TIMEOUT_IN_MS)
    loginButton.click()
    browser.wait(EC.visibilityOf(passwordField), DEFAULT_TIMEOUT_IN_MS);
    passwordField.sendKeys("ye_bQSZ1vNbmu6j1");

  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER)
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry))
  })
})
