import type { Browser } from 'puppeteer'
import { parseCookiesToJson } from '../utils'
import initBrowser from '../browser'
import { delay } from '../utils'
import getRandomArticle from '../task/helper/getRandomArticle'
import getRandomPins from '../task/helper/getRandomPins'

interface IOptions {
  article?: number
  pins?: number
}

/**
 * 浏览页面
 */
export default async function viewPage (options?:IOptions) {
  console.log('浏览网页')
  const { article = 1, pins = 1 } = options || { article: 1, pins: 1 }
  const articleList = await getRandomArticle(article)
  const pinIds = await getRandomPins(pins)

  const browser = await initBrowser()
  consola.start('浏览首页')
  await goPage(browser, 'https://juejin.cn', '.entry', 3000)
  consola.start('浏览沸点首页')
  await goPage(browser, 'https://juejin.cn/pins', '.pin-action-row .comment-action')
  consola.start('签到')
  await goPage(browser, 'https://juejin.cn/user/center/signin?from=sign_in_menu_bar', '.code-calender .signin') // 签到
  consola.start('抽奖')
  await goPage(browser, 'https://juejin.cn/user/center/lottery?from=sign_in_success', '.text-free') // 抽奖
  consola.start('沾喜气')
  await goPage(browser, 'https://juejin.cn/user/center/lottery?from=sign_in_success', '#stick-txt-0') // 沾喜气
  
  consola.start('浏览文章详情')
  for (let i = 0; i < articleList.length; i++) {
    await goPage(browser, `https://juejin.cn/post/${articleList[i]}`, '.panel-btn.with-badge')
  }

  consola.start('浏览沸点详情')
  for (let i = 0; i < pinIds.length; i++) {
    await goPage(browser, `https://juejin.cn/pin/${pinIds[i]}#comment-list`)
  }

  await browser.close()
}


async function goPage(browser: Browser, url: string, clickElement?: string, delayTime?: number) {
  const page = await browser.newPage()
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('hideExtension', 'true') // 屏蔽插件弹窗
    localStorage.setItem('isShowFlashNoteLead', 'false') // 屏蔽笔记弹窗
  })
  await page.setCookie(...parseCookiesToJson(global.userConfig.cookies, 'https://api.juejin.cn'))
  await page.setCookie(...parseCookiesToJson(global.userConfig.cookies, 'https://juejin.cn'))

  await page.goto(url, { waitUntil: 'load' })

  delayTime && await delay(delayTime) // 等待网络请求

  if (clickElement) {
    const targetList = await page.$$(clickElement)
    if (targetList?.length) {
      await delay(1000)
      await targetList[0].evaluate((el: any) => {
        el.click()
      })
    }

    delayTime && await delay(delayTime) // 等待页面被打开

    const pages = await browser.pages()

    if (pages?.length > 1) {
      let i = pages.length
      while (i--) {
        if (page !== pages[i]) {
          await pages[i].close()
        }
      }
    }
    await delay(1000)
  }

  await page.mouse.wheel({deltaY: 5000})

  await delay(1000)

  await page.close()
}