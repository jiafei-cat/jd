/**
 * 获取用户任务列表
 */
export default async function getUserSignInStatus() {
  return await request.get<never, baseAPIData<boolean>>('/growth_api/v1/get_today_status')
}
