import { LandingPage } from './landing-page.po'
import {browser, by, element, logging} from 'protractor'

describe('workspace-project App', () => {
  let page: LandingPage

  beforeEach(() => {
    page = new LandingPage()
  })

  it('Test1: should display title on Landing page', async () => {
    await page.navigateTo()
    expect(await page.getLandingTitleText()).toEqual('Waves Association DAO')
  })

  it('Test10: counts amount of links on Landing page', async () => {
    const list = element.all(by.css('.button'))
    // @ts-ignore this is necessary maybe
    expect(await list.count()).toBe(11)
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER)
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry))
  })
})
