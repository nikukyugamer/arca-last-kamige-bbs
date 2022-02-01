const { chromium } = require('playwright-chromium')

const arcalastKamigeBbs = async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  const url = 'https://kamigame.jp/arcalast/%E6%8E%B2%E7%A4%BA%E6%9D%BF.html'

  await page.goto(url)
  await page.waitForSelector('#get_additional_comments_button')

  const searchResult = await page.locator('xpath=//*[@id="comment_list"]/div[1]/p').textContent()
  console.log(searchResult)

  await page.screenshot({ path: 'tmp/debug_screenshot_01.png', fullPage: true })

  // 最初だけボタンを押す
  await page.click('#get_additional_comments_button')
  await page.waitForSelector('#comment-inline-ad-2') // 2 から始まり 1 ずつ増えていく
  await page.screenshot({ path: 'tmp/debug_screenshot_02.png', fullPage: true })

  await page.click('#last_comment')
  // TODO: #comment-inline-ad-3 などで待ったほうがいい
  await page.waitForTimeout(10000);
  await page.screenshot({ path: 'tmp/debug_screenshot_03.png', fullPage: true })

  await page.click('#comment-inline-ad-3')
  // TODO: #last_comment や #comment-inline-ad-4 などで待ったほうがいい
  await page.waitForTimeout(10000);
  await page.screenshot({ path: 'tmp/debug_screenshot_04.png', fullPage: true })

  // FIXME: 広告ページが入ることがあるのでスキップする

  await browser.close()
}

arcalastKamigeBbs()
