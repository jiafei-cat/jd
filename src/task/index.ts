import c from 'ansi-colors'
import { TASK_ID } from 'enum'
import getUserTaskInfo from './getUserTaskInfo'
import getUserInfo from './getUserInfo'

import viewArticle from './viewArticle'
import starArticle from './starArticle'
import starPins from './starPins'
import followUser from './followUser'
import collectArticle from './collectArticle'

async function runTask () {
  consola.start('查询当前用户任务列表')
  const taskList = await getUserTaskInfo()
  const userInfo = await getUserInfo()

  if (!taskList.length) {
    consola.log(`没有需要执行的任务, 任务结束!`)
    return
  }

  await taskRunning(taskList)

  await getUserTaskInfo()
}

async function taskRunning(taskList: Awaited<ReturnType<typeof getUserTaskInfo>>) {
  consola.start('开始运行任务')

  for(let taskIndex = 0; taskIndex < taskList.length; taskIndex++) {
    await running(taskList[taskIndex])
  }

  async function running(task: typeof taskList[number]) {
    switch(task.taskId) {
      case TASK_ID.VISIT_ARTICLE:
        await viewArticle(task.time)
      break
      case TASK_ID.STAR_ARTICLE:
        await starArticle(task.time)
      break
      case TASK_ID.STAR_PINS:
        await starPins(task.time)
      break
      case TASK_ID.FOLLOW_USER:
        await followUser(task.time)
      break
      case TASK_ID.COLLECT_ARTICLE:
        await collectArticle(task.time)
      break
      default:
        throw new Error(`未找到任务ID为${task.taskId}的执行方法!`)
    }
  }
}

export default runTask