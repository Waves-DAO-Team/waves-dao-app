import { AppPage } from './app.po'
import {browser, logging} from 'protractor'

describe('workspace-project App', () => {
  let page: AppPage

  beforeEach(() => {
    page = new AppPage()
  })

  it('Test1: footer is present', async () => {
    await page.navigateTo()
    // @ts-ignore this is necessary maybe
    expect(await page.footerIsPresent()).toBe(true)
  })

  it('Test2: loads Disruptive grants page and gives its title', async () => {
    await page.navigateTo('/grants/disruptive')
    expect(await page.getTitleOfGrantsPage()).toEqual('Disruptive Tech Grants')
  })

  it('Test3: loads Interhack grants page and gives its title', async () => {
    await page.navigateTo('/grants/interhack')
    expect(await page.getTitleOfGrantsPage()).toEqual('Interhack Grants')
  })

  it('Test4: loads Web3 grants page and gives its title', async () => {
    await page.navigateTo('/grants/web3')
    expect(await page.getTitleOfGrantsPage()).toEqual('Web 3.0 Dev Grants')
  })

  it('Test5: loads Members page and gives its title', async () => {
    await page.navigateTo('/members')
    expect(await page.getTitleOfMembersPage()).toEqual('Members')
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER)
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry))
  })
})
