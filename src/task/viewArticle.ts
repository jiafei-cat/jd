import c from 'ansi-colors'
import doneReadArticle from '../api/doneReadArticle'
import getRecommendArticle from '../api/getRecommendArticle'
import { randomNumber, randomDelay } from '../utils'

async function viewArticle(time: number) {
  const result = await getRecommendArticle()
  if (result.err_no !== 0) {
    throw new Error('获取文章推荐列表失败，任务停止!')
  }
  const articleIdList = result.data?.filter(item => item.item_type === 2).map(item => item.item_info.article_id)
  const length = articleIdList.length
  const targetIds = new Set<string>()

  while(targetIds.size < time) {
    targetIds.add(articleIdList[randomNumber(length)])
  }

  const tasks = Array.from(targetIds)

  consola.start(`开始执行阅读任务, 需要总的阅读数: ${c.red.bold(String(time))}`)

  let resultArr = []
  for(let i = 0; i < tasks.length; i++) {
    consola.log(`开始阅读第${c.red(String(i + 1))}篇文章: ${c.yellow.bold(`https://juejin.cn/post/${tasks[i]}`)}`)
    let result = await doneReadArticle(tasks[i])
    resultArr.push(result)
    await randomDelay()
    consola.success(`第${c.red.bold(String(i + 1))}篇阅读完成`)
  }

  const successNumber = resultArr.map(i => i.err_no === 0)
  consola.success(`任务完成, 总共成功阅读 ${c.green.bold(String(successNumber.length))} 篇文章, 失败${c.red.bold(String(resultArr.length - successNumber.length))}篇`)
}

export default viewArticle