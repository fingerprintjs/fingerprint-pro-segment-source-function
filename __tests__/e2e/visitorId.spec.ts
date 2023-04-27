import { test, expect, Page } from '@playwright/test'
import { areVisitorIdAndRequestIdValid, wait } from './utils'
import { ElementHandle } from 'playwright-core'

const TEST_ID = process.env.TEST_ID || 'test_id'

const testWebsiteURL = new URL(`https://${process.env.TEST_CLIENT_DOMAIN}`)
testWebsiteURL.searchParams.set('id', TEST_ID)

const storageURL = new URL(`https://${process.env.TEST_CLIENT_DOMAIN}/test`)

interface GetResult {
  requestId: string
  visitorId: string
  visitorFound: boolean
}

test.describe('visitorId', () => {
  async function parseResult(el: ElementHandle<SVGElement | HTMLElement>): Promise<GetResult | null> {
    const textContent = await el.textContent()
    if (textContent == null) {
      return null
    }
    let jsonContent
    try {
      jsonContent = JSON.parse(textContent as string)
    } catch (e) {
      // do nothing
    }

    return jsonContent
  }

  async function testForSpec(spec: string, visitorId: string, requestId: string | null = null) {
    storageURL.searchParams.set('id', `${TEST_ID}_${spec}`)
    const response = await fetch(storageURL)
    expect(response.status).toBe(200)
    const responseBody = await response.json()
    expect(responseBody).toBeTruthy()
    expect(responseBody.data.anonymousId).toBe(visitorId)
    if (requestId) {
      expect(responseBody.data.context.requestId).toBe(requestId)
    }
  }

  async function runTest(page: Page, url: string) {
    await page.goto(url, {
      waitUntil: 'networkidle',
    })

    await wait(5000)
    const getResult = await page.waitForSelector('code').then(parseResult)
    expect(getResult).toBeTruthy()
    const { visitorId, requestId } = getResult!!
    expect(areVisitorIdAndRequestIdValid(visitorId, requestId)).toStrictEqual(true)

    await wait(20000)
    await testForSpec('identify', visitorId)
    await testForSpec('page', visitorId, requestId)
    await testForSpec('track', visitorId)
    await testForSpec('group', visitorId)
  }

  test('should show visitorId in the HTML (NPM & CDN)', async ({ page }) => {
    await runTest(page, testWebsiteURL.href)
  })
})
