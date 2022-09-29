import initConfig from './task/initConfig'
import runTask from './task'

function main() {
  initConfig()
  runTask()
}


try {
  main()
} catch (error) {
  consola.error(error)
}