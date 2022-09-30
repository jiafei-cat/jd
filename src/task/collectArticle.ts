import c from 'ansi-colors'
import getUserCollectList from '../api/getUserCollectList'
import getRandomArticle from './helper/getRandomArticle'
import donCollectArticle from '../api/donCollectArticle'

import { randomDelay } from '../utils'

async function collectArticle(time: number) {
  const articleIds = await getRandomArticle(time)
  const collectionList = await getUserCollectList(userId)
  const collectionId = collectionList.data?.find(i => i.is_default)?.collection_id

  if (!collectionId) {
    consola.error('获取用户收藏集失败，任务停止!')
    return
  }

  consola.start(`开始执行收藏文章任务, 需要总的收藏数: ${c.red.bold(String(time))}`)

  let collectResultArr = []
  let unCollectResultArr = []

  for(let i = 0; i < articleIds.length; i++) {
    consola.log(`开始收藏第${c.red(String(i + 1))}个文章: ${c.yellow.bold(`https://juejin.cn/post/${articleIds[i]}`)}`)
    let followResult = await donCollectArticle(articleIds[i], collectionId, true)
    collectResultArr.push(followResult)
    await randomDelay()
    consola.success(`第${c.red.bold(String(i + 1))}个收藏完成`)

    let unFollowResult = await donCollectArticle(articleIds[i])
    consola.success(`取消${c.red.bold(articleIds[i])}收藏完成`)
    unCollectResultArr.push(unFollowResult)
    await randomDelay()
  }
  

  const collectSuccessNumber = collectResultArr.filter(i => i.err_no === 0)
  const unCollectSuccessNumber = unCollectResultArr.filter(i => i.err_no === 0)

  consola.success(`
    任务完成, 总共成功收藏 ${c.green.bold(String(collectSuccessNumber.length))} 个文章, 
    失败${c.red.bold(String(collectResultArr.length - collectSuccessNumber.length))}个
  `)

  consola.success(`
    任务完成, 总共成功取消收藏 ${c.green.bold(String(unCollectSuccessNumber.length))} 个文章, 
    失败${c.red.bold(String(unCollectResultArr.length - unCollectSuccessNumber.length))}个
  `)
}

export default collectArticle