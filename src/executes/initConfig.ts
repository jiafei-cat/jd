import consola from 'consola'
import * as dotenv from 'dotenv'
import request from '../utils/request'

dotenv.config()
global.consola = consola
global.request = request

const { JUEJIN_COOKIE } = process.env

async function initConfig() {
  consola.start('初始化用户配置...')
  if (!JUEJIN_COOKIE) {
    throw new Error('未配置用户Cookies, 初始化失败!')
  }

  global.userConfig = {
    cookies: JUEJIN_COOKIE
  }
  consola.success('初始化用户配置成功!')
}

export default initConfig