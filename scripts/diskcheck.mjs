// Verify the offline build opens straight from disk (file://) with no broken
// asset paths and a working ENTER — the "downloadable" promise.
import { chromium } from 'playwright'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const url = pathToFileURL(resolve('dist/index.html')).href
const b = await chromium.launch({ headless: true })
const p = await b.newPage({ viewport: { width: 1400, height: 850 } })
const errors = []
p.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
p.on('pageerror', e => errors.push('PAGEERR: ' + e.message))
p.on('requestfailed', r => errors.push('REQFAIL: ' + r.url()))
await p.goto(url, { waitUntil: 'networkidle' })
await p.waitForTimeout(1500)
const state = await p.evaluate(() => {
  const btn = document.querySelector('#enter-btn')
  const r = btn.getBoundingClientRect()
  return { hasEnter: !!btn, litCount: document.querySelector('#lit-count')?.textContent, btnVisible: r.width > 0 }
})
const box = await p.locator('#enter-btn').boundingBox()
await p.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
await p.waitForTimeout(2500)
await p.screenshot({ path: 'docs/shots/disk-entered.png' })
const introGone = await p.evaluate(() => document.querySelector('#intro').classList.contains('hidden'))
console.log(JSON.stringify({ url, state, introGoneAfterClick: introGone, errors }, null, 2))
await b.close()
