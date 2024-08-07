interface IApi {
  count: number
  lotteries: {
    /** id - 沾喜气用 */
    history_id: string
  }[]
}

/**
 *  获取围观大奖
 */
export default async function getLotteryHistory() {
  return await request.post<never, baseAPIData<IApi>>('/growth_api/v1/lottery_history/global_big', {
    page_no: 1,
    page_size: 5,
  })
}
