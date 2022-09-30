export interface IRecommendItem {
  /** 用户id */
  user_id: string
}

export default async function getRecommendUser () {
  return await request.get<never, baseAPIData<IRecommendItem[]>>('/user_api/v1/author/recommend', {
    data: {
      cursor: 0,
      limit: 20,
    }
  })
}
