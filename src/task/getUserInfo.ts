import getUser from '../api/getUser'

export default async function getUserInfo () {
  const result = await getUser()
  if (result.err_no !== 0) {
    throw new Error('获取用户信息失败，停止任务!')
  }

  global.userId = result.data.user_id
  return result?.data || {}
}