import { Header } from './header.po'
import {browser, logging} from 'protractor'

describe('workspace-project App', () => {
  let page: Header

  beforeEach(() => {
    page = new Header()
  })

  it('Test2: should check that logo icon is clickable', async () => {
    await page.navigateTo()
    // @ts-ignore this is necessary maybe
    expect(await page.logoClickable()).toBe(true)
  })

  it('Test4: header is present', async () => {
    await page.navigateTo()
    // @ts-ignore this is necessary maybe
    expect(await page.headerIsPresent()).toBe(true)
  })

  it('Test9: goes to Disruptive page and checks that active menu item has blue color', async () => {
    await page.navigateTo('/grants/disruptive')
    expect(await page.getActiveMenuItemColor()).toBe('rgba(0, 85, 255, 1)')
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER)
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry))
  })
})
