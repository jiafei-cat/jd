import c from 'ansi-colors'
import getUserTask, { ITaskItem } from '../api/getUserTask'
import { supportTaskId } from '../config'

let isGotUserTask = false
let preScore = 0

/**
 * 获取用户任务列表
 */
async function getUserTaskInfo() {
  const result = await getUserTask()
  if (result.err_no !== 0) {
    throw new Error('获取用户任务列表失败，任务停止!')
  }

  const { today_jscore, growth_tasks } = result?.data

  if(isGotUserTask) {
    consola.success(`任务执行完成, 本次任务获得: ${c.green.bold(String(today_jscore - preScore))} 积分`)
    return []
  }

  preScore = today_jscore
  consola.info(`今日已获得积分: ${c.green.bold(String(today_jscore))} 积分`)

  isGotUserTask = true

  const effectiveTask = Object.keys(growth_tasks)
    .reduce((taskList, key) => taskList.concat(growth_tasks[key]), [] as ITaskItem[])
    .filter(taskItem => taskItem.done < taskItem.limit && supportTaskId.includes(taskItem.task_id))
    .map(({ task_id: taskId, title, score, task_type: type, limit, done }) => ({ taskId, title, score, type, time: limit - done}))

  if (!effectiveTask.length) {
    consola.warn('抱歉, 当前没有可以执行的任务!')
    return []
  }

  consola.info(`
    总共${c.red.bold(String(effectiveTask.length))}个任务:${effectiveTask.map(taskItem => `\n    -【${taskItem.type}】${taskItem.title}`).join()}
  `)

  return effectiveTask
}

export default getUserTaskInfo