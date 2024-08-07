/**
 * 点赞文章/沸点
 * @param item_id 文章/沸点id
 * @param item_type 2 - 文章/ 4 - 沸点
 * @returns
 */
export default async function doneStarArticle(item_id: string, item_type = 2) {
  return await request.post<never, baseAPIData<{}>>('/interact_api/v1/digg/save', {
    client_type: 2608,
    item_id,
    item_type,
  })
}
