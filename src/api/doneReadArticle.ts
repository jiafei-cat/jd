export interface IRecommendItem {
  /** 文章类型: 2 - 文章 | 14 - 推广 */
  item_type: 14 | 2
  item_info: {
    article_id: string
  }
}

export default async function doneReadArticle (item_id: string) {
  return await request.post<never, baseAPIData<IRecommendItem[]>>('/growth_api/v1/user_growth/add_point_report', {
    growth_type: 1,
    item_id,
    task_id: 13
  })
}