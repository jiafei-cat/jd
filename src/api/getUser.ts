interface IUser {
  /** 用户ID */
  user_id: string
}

export default async function getUserInfo() {
  return await request.get<never, baseAPIData<IUser>>('/user_api/v1/user/get')
}
