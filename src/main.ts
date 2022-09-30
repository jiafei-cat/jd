import viewPage from './executes/viewPage'
import initConfig from './executes/initConfig'
import runTask from './task'

async function main() {
  await initConfig()
  // await viewPage()
  await runTask()
}

try {
  main()
} catch (error) {
  consola.error(error)
}