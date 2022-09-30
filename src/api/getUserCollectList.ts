interface ICollectItem {
  /** 收藏集id */
  collection_id: string
  /** 是否默认 */
  is_default: boolean
}

/**
 * 获取用户收藏集
 */
export default async function getUserCollectList (userId: string) {
  return await request.post<never, baseAPIData<ICollectItem[]>>('/interact_api/v2/collectionset/list', {
    article_id: '',
    cursor: '0',
    limit: 10,
    user_id: userId
  })
}