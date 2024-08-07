export default async function doneReadArticle(item_id: string) {
  return await request.post<never, baseAPIData<{}>>('/growth_api/v1/user_growth/add_point_report', {
    growth_type: 1,
    item_id,
    task_id: 13,
  })
}
