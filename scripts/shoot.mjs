// Visual QA rig — VISIBLE Playwright page (hidden tabs freeze rAF on canvas apps).
// Real clicks only, never dispatchEvent.
//
//   node scripts/shoot.mjs           → intro + web overview + zoomed shots
//   node scripts/shoot.mjs <name> "<steps>"
//     steps: semicolon list of  enter | wait:MS | shot:LABEL | click:X,Y |
//            wheel:X,Y,DY | move:X,Y | drag:X1,Y1,X2,Y2 | tab:web|time | key:KEY
//
// Shots land in docs/shots/<name>-<label>.png

import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const W = 1600, H = 950
const name = process.argv[2] ?? 'qa'
const steps = process.argv[3]
  ?? 'enter; wait:5200; shot:overview; wheel:800,475,-2400; wait:1200; shot:mid; wheel:800,475,-2400; wait:1200; shot:close; click:800,475; wait:900; shot:clicked'

mkdirSync('docs/shots', { recursive: true })

const browser = await chromium.launch({ headless: false, args: [`--window-size=${W},${H + 90}`] })
const page = await browser.newPage({ viewport: { width: W, height: H } })

// optional pre-seed of mastered nodes: SEED='id1,id2,...' node scripts/shoot.mjs ...
if (process.env.SEED) {
  await page.addInitScript(seed => {
    localStorage.setItem('axiom-progress-v1', JSON.stringify(seed.split(',')))
  }, process.env.SEED)
}

await page.goto('http://localhost:5127', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)

for (const raw of steps.split(';')) {
  const s = raw.trim()
  if (!s) continue
  const ci = s.indexOf(':')
  const cmd = ci < 0 ? s : s.slice(0, ci)
  const argStr = ci < 0 ? '' : s.slice(ci + 1)
  const args = argStr.split(',').map(a => a.trim())
  if (cmd === 'enter') {
    // genuine pixel click at the button's real centre (hit-tested by the browser)
    const box = await page.locator('#enter-btn').boundingBox()
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2)
    await page.waitForTimeout(200)
  } else if (cmd === 'wait') {
    await page.waitForTimeout(Number(args[0]))
  } else if (cmd === 'shot') {
    const p = `docs/shots/${name}-${args[0]}.png`
    await page.screenshot({ path: p })
    console.log(`shot → ${p}`)
  } else if (cmd === 'click') {
    await page.mouse.click(Number(args[0]), Number(args[1]))
  } else if (cmd === 'move') {
    await page.mouse.move(Number(args[0]), Number(args[1]))
  } else if (cmd === 'wheel') {
    await page.mouse.move(Number(args[0]), Number(args[1]))
    // chunked so the zoom eases like a human scroll
    const total = Number(args[2])
    for (let i = 0; i < 8; i++) {
      await page.mouse.wheel(0, total / 8)
      await page.waitForTimeout(40)
    }
  } else if (cmd === 'drag') {
    await page.mouse.move(Number(args[0]), Number(args[1]))
    await page.mouse.down()
    for (let i = 1; i <= 10; i++) {
      await page.mouse.move(
        Number(args[0]) + (Number(args[2]) - Number(args[0])) * (i / 10),
        Number(args[1]) + (Number(args[3]) - Number(args[1])) * (i / 10),
        { steps: 2 },
      )
    }
    await page.mouse.up()
  } else if (cmd === 'tab') {
    await page.click(`#tabs .tab[data-tab="${args[0]}"]`)
  } else if (cmd === 'key') {
    await page.keyboard.press(args[0])
  } else if (cmd === 'dom') {
    await page.click(argStr.trim()) // real click on a DOM element by selector
  } else if (cmd === 'type') {
    await page.keyboard.type(argStr.trim())
  } else if (cmd === 'eval') {
    console.log('eval →', JSON.stringify(await page.evaluate(argStr.trim())))
  }
}

await browser.close()
console.log('done')
