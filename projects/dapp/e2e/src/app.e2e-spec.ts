import { AppPage } from './app.po'
import { browser, logging } from 'protractor'

describe('workspace-project App', () => {
  let page: AppPage

  beforeEach(() => {
    page = new AppPage()
  })

  it('Test1: should display title on Landing page', async () => {
    await page.navigateTo()
    expect(await page.getLandingTitleText()).toEqual('Waves Association DAO')
  })

  it('Test2: should check that logo icon is clickable', async () => {
    await page.navigateTo()
    // @ts-ignore this is necessary maybe
    expect(await page.logoClickable()).toBe(true)
  })

  it('Test3: footer is present', async () => {
    await page.navigateTo()
    // @ts-ignore this is necessary maybe
    expect(await page.footerIsPresent()).toBe(true)
  })

  it('Test4: header is present', async () => {
    await page.navigateTo()
    // @ts-ignore this is necessary maybe
    expect(await page.headerIsPresent()).toBe(true)
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

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER)
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry))
  })
})
