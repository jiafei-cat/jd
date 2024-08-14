import type { Page, Browser } from 'puppeteer'
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

const resolveObj = {
  resolve: (arg: any) => {},
}

function handle(target: any) {
  resolveObj.resolve(target.page())
}

function awaitNewPageByClick(browser: Browser) {
  return new Promise((resolve) => {
    resolveObj.resolve = resolve
    browser.off('targetcreated', handle)
    /** 监听点击后是否有新页面打开 */
    browser.once('targetcreated', handle)

    /** 2s 后如果还没有检测到打开新页面，则不再继续等待 */
    setTimeout(resolve, 3000)
  })
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
  await goPage('https://juejin.cn/user/center/signin?from=main_page', '.code-calender button')

  consola.start('抽奖')
  await goPage('https://juejin.cn/user/center/lottery?from=sign_in_successz', '.text-free')

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
  const page = await browser.newPage()

  await pageInit(page)
  await page.goto(url, { waitUntil: 'domcontentloaded' })

  await handleClickPageElement(page, clickElement)
  await handleScrollAndClosePages(browser)
}

async function pageInit(page: Page) {
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('hideExtension', 'true') // 屏蔽插件弹窗
    localStorage.setItem('isShowFlashNoteLead', 'false') // 屏蔽笔记弹窗
  })

  await page.setCookie(...parseCookiesToJson(global.userConfig.cookies, 'https://api.juejin.cn'))
  await page.setCookie(...parseCookiesToJson(global.userConfig.cookies, 'https://juejin.cn'))
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

  // const targetList = await curPage.$$(clickElement)

  try {
    consola.info(`点击目标元素 ${clickElement}`)
    // const el = await targetList[0].evaluate((el: any) => {
    //   el.click()
    //   return el
    // })
    const el = await curPage.click(clickElement)
    consola.info(el)
    const newPageByClick = await awaitNewPageByClick(browser)
    consola.info(newPageByClick)
    consola.success(`点击元素 ${clickElement} 成功!`)
  } catch (error) {
    consola.error(`点击元素 ${clickElement} 失败! ${error}`)
    await curPage.close()
    return
  }
}

async function handleScrollAndClosePages(browser: Browser) {
  const pages = await browser.pages()
  consola.info(`滚动页面, 当前页面数量 ${pages.length}`)
  if (!pages.length) {
    return
  }

  await delay(1000)
  if (pages?.[pages.length - 1]) {
    await pages[pages.length - 1].mouse.wheel({ deltaY: 5000 })
  }
  await delay(1000)

  consola.info(`当前浏览器页面数量 ${pages.length}`)
  for (let i = 0; i < pages.length; i++) {
    await pages[i].close()
  }
  consola.info(`关闭所有页面`)
}
