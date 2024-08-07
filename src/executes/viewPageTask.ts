import type { Page } from 'puppeteer'
import { parseCookiesToJson } from '@/utils'
import initBrowser from '@/browser'
import { delay } from '@/utils'
import getRandomArticle from '@/task/helper/getRandomArticle'
import getRandomPins from '@/task/helper/getRandomPins'

interface IOptions {
  /** 随机浏览文章数量 */
  article?: number
  /** 随机浏览沸点数量 */
  pins?: number
}

/**
 * 模拟浏览页面任务 (非通过API)
 */
export default async function viewPageTask(options?: IOptions) {
  const { article = 1, pins = 1 } = options || { article: 1, pins: 1 }

  consola.start('浏览首页')
  await goPage('https://juejin.cn', '.entry')

  consola.start('浏览沸点首页')
  await goPage('https://juejin.cn/pins', '.pin-action-row .comment-action')

  consola.start('签到')
  await goPage('https://juejin.cn/user/center/signin?from=sign_in_menu_bar', '.code-calender .signin')

  consola.start('抽奖')
  await goPage('https://juejin.cn/user/center/lottery?from=sign_in_success', '.text-free')

  const articleList = await getRandomArticle(article)
  consola.start(`随机浏览文章详情，数量 ${article}`)
  for (let i = 0; i < articleList.length; i++) {
    consola.start(`浏览文章详情，https://juejin.cn/post/${articleList[i]}`)
    await goPage(`https://juejin.cn/post/${articleList[i]}`, '.panel-btn.with-badge')
  }

  const pinIds = await getRandomPins(pins)
  for (let i = 0; i < pinIds.length; i++) {
    consola.start(`浏览沸点详情，https://juejin.cn/pin/${pinIds[i]}#comment-list`)
    await goPage(`https://juejin.cn/pin/${pinIds[i]}#comment-list`)
  }

  await browser.close()
}

/**
 * 访问页面
 * @param url
 * @param clickElement 需要点击的页面元素
 */
async function goPage(url: string, clickElement?: string) {
  const browser = await initBrowser()

  const page = await pageInit()
  await page.goto(url, { waitUntil: 'domcontentloaded' })

  await handleClickPageElement(page, clickElement)
  await handleScrollAndClosePages(page, await browser.pages())
}

async function pageInit() {
  const page = await browser.newPage()
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('hideExtension', 'true') // 屏蔽插件弹窗
    localStorage.setItem('isShowFlashNoteLead', 'false') // 屏蔽笔记弹窗
  })

  await page.setCookie(...parseCookiesToJson(global.userConfig.cookies, 'https://api.juejin.cn'))
  await page.setCookie(...parseCookiesToJson(global.userConfig.cookies, 'https://juejin.cn'))

  return page
}

async function handleClickPageElement(curPage: Page, clickElement?: string) {
  if (!clickElement) {
    return
  }

  console.time('元素加载用时: ')
  try {
    await curPage.waitForSelector(clickElement)
  } catch (error) {
    console.timeEnd('元素加载用时: ')
    consola.error(`加载不到目标元素 ${clickElement}`)
    return
  }
  console.timeEnd('元素加载用时: ')

  const targetList = await curPage.$$(clickElement)

  try {
    consola.start(`点击目标元素 ${clickElement}`)
    await targetList[0].evaluate((el: any) => {
      el.click()
    })
    consola.success(`点击元素 ${clickElement} 成功!`)
  } catch (error) {
    consola.error(`点击元素 ${clickElement} 失败!`)
    await curPage.close()
    return
  }
}

async function handleScrollAndClosePages(statePage: Page, pages: Page[]) {
  if (pages?.length > 1) {
    let i = pages.length
    while (i--) {
      if (statePage !== pages[i]) {
        await pages[i].close()
      }
    }
  }

  await delay(1000)

  await statePage.mouse.wheel({ deltaY: 5000 })

  await delay(1000)

  await statePage.close()
}
