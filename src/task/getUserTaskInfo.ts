import getUserTask, { ITaskItem } from '../api/getUserTask'
import { supportTaskId } from '../config'

async function getUserTaskInfo() {
  const result = await getUserTask()
  if (result.err_no !== 0) {
    throw new Error('获取用户任务列表失败，任务停止!')
  }

  const { today_jscore, growth_tasks } = result?.data

  consola.info(`今日已获得积分: ${today_jscore}`)

  const effectiveTask = Object.keys(growth_tasks)
    .reduce((taskList, key) => taskList.concat(growth_tasks[key]), [] as ITaskItem[])
    .filter(taskItem => taskItem.done < taskItem.limit && supportTaskId.includes(taskItem.task_id))
    .map(({ task_id: taskId, title, score, task_type: type}) => ({ taskId, title, score, type }))

  if (!effectiveTask.length) {
    consola.info('抱歉, 当前没有可以执行的任务!')
    return
  }

  consola.info(`
    总共${effectiveTask.length}个任务:${effectiveTask.map(taskItem => `\n    -【${taskItem.type}】${taskItem.title}`).join()}
  `)

  return 
}

export default getUserTaskInfo