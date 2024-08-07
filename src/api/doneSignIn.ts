interface IApi {
  /** 本次签到获得积分 */
  incr_point: number
  /** 用户总积分 */
  sum_point: number
}

/**
 * 用户签到
 */
export default async function doneSignIn() {
  return await request.post<never, baseAPIData<IApi>>('/growth_api/v1/check_in')
}
