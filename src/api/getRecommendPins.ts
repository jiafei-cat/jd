export interface IRecommendItem {
  /** 沸点id */
  msg_id: string
}

export default async function getRecommendPins () {
  return await request.post<never, baseAPIData<IRecommendItem[]>>('/recommend_api/v1/short_msg/recommend', {
    cursor: '0',
    id_type: 4,
    limit: 20,
    sort_type: 300,
  })
}
