import initConfig from '@/executes/initConfig'
import viewPageTask from '@/executes/viewPageTask'
import normalTask from '@/executes/normalTask'
import dailyTask from '@/task'

async function main() {
  await initConfig()
  await viewPageTask()
  await normalTask()
  await dailyTask()
}

try {
  main()
} catch (error) {
  consola.error(error)
}
