import c from 'ansi-colors'
import { TASK_ID } from 'enum'
import getUserTaskInfo from './getUserTaskInfo'
import { ITaskItem } from '../api/getUserTask'

import viewArticle from './viewArticle'

async function runTask () {
  consola.start('查询当前用户任务列表')
  const taskList = await getUserTaskInfo()

  if (!taskList.length) {
    consola.log(`没有需要执行的任务, 任务结束!`)
    return
  }

  await taskRunning(taskList)
}

async function taskRunning(taskList: Awaited<ReturnType<typeof getUserTaskInfo>>) {
  consola.start('开始运行任务')

  const taskIndex = 0

  await running(taskList[taskIndex])

  async function running(task: typeof taskList[number]) {
    switch(task.taskId) {
      case TASK_ID.VISIT_ARTICLE:
        await viewArticle(task.time)
      break
      default:
        throw new Error(`未找到任务ID为${task.taskId}的执行方法!`)
    }
  }
}

export default runTask