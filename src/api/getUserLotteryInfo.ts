

interface IApi {
  /** 免费抽奖次数 */
  free_count: number
  /** 抽奖花费 */
  point_cost: number
  /** 奖品信息 */
  lottery: {[index: string]: unknown}[]

}

/**
 * 获取用户抽奖信息
 */
export default async function getUserLotteryInfo () {
  return await request.get<never, baseAPIData<IApi>>('/growth_api/v1/lottery_config/get')
}
