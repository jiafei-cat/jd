import getUserTaskInfo from './getUserTaskInfo'

async function runTask () {
  // consola.start()
  const taskList = await getUserTaskInfo()
}

export default runTask