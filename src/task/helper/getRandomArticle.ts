import getRecommendArticle from '../../api/getRecommendArticle'
import { randomNumber } from '../../utils'

/**
 * 获取推荐文章ID
 * @param limit 获取的文章数
 */
export default async function getRandomArticle(limit: number) {
  const result = await getRecommendArticle()
  if (result.err_no !== 0) {
    consola.error('获取文章推荐列表失败，任务停止!')
    return []
  }
  const articleIdList = result.data?.filter(item => item.item_type === 2).map(item => item.item_info.article_id)
  const length = articleIdList.length
  const targetIds = new Set<string>()

  while(targetIds.size < limit) {
    targetIds.add(articleIdList[randomNumber(length)])
  }

  return Array.from(targetIds)
}