export default async function doneReadArticle (userId: string, isFollow = true) {
  return await request.post<never, baseAPIData<{}>>(`/interact_api/v1/follow/${isFollow ? 'do' : 'undo'}`, {
    type: 1,
    id: userId
  })
}