export interface IRecommendItem {
  /** 文章类型: 2 - 文章 | 14 - 推广 */
  item_type: 14 | 2
  item_info: {
    article_id: string
  }
}

export default async function getRecommendArticle () {
  return await request.post<never, baseAPIData<IRecommendItem[]>>('/recommend_api/v1/article/recommend_all_feed', {
    id_type: 2,
    client_type: 2608,
    sort_type: 200,
    cursor: '0',
    limit: 20
  })
}
