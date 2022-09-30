import c from 'ansi-colors'
import doneReadArticle from '../api/doneReadArticle'
import getRandomArticle from './helper/getRandomArticle'

import { randomDelay } from '../utils'

async function viewArticle(time: number) {
  const articleIds = await getRandomArticle(time)

  consola.start(`开始执行阅读任务, 需要总的阅读数: ${c.red.bold(String(time))}`)

  let resultArr = []
  for(let i = 0; i < articleIds.length; i++) {
    consola.log(`开始阅读第${c.red(String(i + 1))}篇文章: ${c.yellow.bold(`https://juejin.cn/post/${articleIds[i]}`)}`)
    let result = await doneReadArticle(articleIds[i])
    resultArr.push(result)
    await randomDelay()
    consola.success(`第${c.red.bold(String(i + 1))}篇阅读完成`)
  }

  const successNumber = resultArr.filter(i => i.err_no === 0)
  consola.success(`任务完成, 总共成功阅读 ${c.green.bold(String(successNumber.length))} 篇文章, 失败${c.red.bold(String(resultArr.length - successNumber.length))}篇`)
}

export default viewArticle