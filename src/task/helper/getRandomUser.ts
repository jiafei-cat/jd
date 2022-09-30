import getRecommendUser from '../../api/getRecommendUser'
import { randomNumber } from '../../utils'

/**
 * 获取推荐用户ID
 * @param limit 获取的用户数
 */
export default async function getRandomUser(limit: number) {
  const result = await getRecommendUser()
  if (result.err_no !== 0) {
    consola.error('获取用户推荐列表失败，任务停止!')
    return []
  }

  const userIds = result.data?.map(item => item.user_id)
  const length = userIds.length
  const targetIds = new Set<string>()

  while(targetIds.size < limit) {
    targetIds.add(userIds[randomNumber(length)])
  }

  return Array.from(targetIds)
}