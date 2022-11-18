import initConfig from './executes/initConfig'
import viewPage from './executes/viewPage'
import normalTask from './executes/normalTask'
import dailyTask from './task'

async function main() {
  await initConfig()
  await viewPage()
  await normalTask()
  await dailyTask()
}

try {
  main()
} catch (error) {
  consola.error(error)
}