/**
 * 收藏/取消收藏文章
 * @param isCollect 是否是收藏文章，否次取消收藏
 */
export default async function donCollectArticle(article_id: string, collection_id?: string, isCollect = false) {
  const params: {[index: string]: unknown} = {
    article_id,
  }

  if (isCollect) {
    params.select_collection_ids = [collection_id]
    params.unselect_collection_ids = []
    params.is_collect_fast = false
  }

  return await request.post<never, baseAPIData<{}>>(`/interact_api/v2/collectionset/${isCollect ? 'add_article' : 'delete_article'}`, params)
}