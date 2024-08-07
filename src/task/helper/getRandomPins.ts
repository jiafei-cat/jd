import getRecommendPins from '@/api/getRecommendPins'
import { randomNumber } from '@/utils'

/**
 * 获取推荐文章ID
 * @param limit 获取的文章数
 */
export default async function getRandomPins(limit: number) {
  const result = await getRecommendPins()
  if (result.err_no !== 0) {
    consola.error('获取沸点推荐列表失败，停止当前任务!')
    return []
  }

  const articleIdList = result.data?.map((item) => item.msg_id)
  const length = articleIdList.length
  const targetIds = new Set<string>()

  while (targetIds.size < limit) {
    targetIds.add(articleIdList[randomNumber(length)])
  }

  return Array.from(targetIds)
}
