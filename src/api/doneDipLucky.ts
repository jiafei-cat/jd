interface IApi {
  dip_action: number
  /** 是否已经沾喜气过 */
  has_dip: boolean
  /** 总共幸运值 */
  total_value: number
  /** 获得的幸运值 */
  dip_value: number
}

/**
 * 沾喜气
 */
export default async function doneDipLucky (id: string) {
  return await request.post<never, baseAPIData<IApi>>('/growth_api/v1/lottery_lucky/dip_lucky', {
    lottery_history_id: id
  })
}