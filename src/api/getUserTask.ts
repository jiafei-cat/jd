export interface ITask {
  /** 任务列表 */
  growth_tasks: {
    [index: string]: ITaskItem[]
  }
  /** 今日已获得积分 */
  today_jscore: number
}

export interface ITaskItem {
  /** 任务id 主键 */
  task_id: number
  /** 完成次数 */
  done: number
  /** 最多完成次数 */
  limit: number
  /** 一次任务的分值 */
  score: number
  app_jump_url: string
  btn_name: string
  icon: string
  service_id: number
  task_type: string
  title: string
  web_jump_url: string
}

export default async function getUserTask () {
  return await request.post<never, baseAPIData<ITask>>('/growth_api/v1/user_growth/task_list', {
    growth_type: 1
  })
}