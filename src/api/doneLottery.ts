
interface IApi {
  /** 奖品 */
  lottery_name: string
}

/**
 * 抽奖
 */
export default async function doneLottery () {
  return await request.post<never, baseAPIData<IApi>>(`/growth_api/v1/lottery/draw`)
}