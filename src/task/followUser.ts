import c from 'ansi-colors'
import doneFollowUser from '@/api/doneFollowUser'
import getRandomUser from './helper/getRandomUser'
import { randomDelay } from '@/utils'

/**
 * 随机关注好友
 * @param time 关注好友数量
 */
async function followUser(time: number) {
  const userIds = await getRandomUser(time)

  consola.start(`开始执行关注掘友任务, 需要总的关注数为: ${c.red.bold(String(time))}`)

  let followResultArr = []
  let unFollowResultArr = []

  for (let i = 0; i < userIds.length; i++) {
    consola.log(`开始关注第${c.red(String(i + 1))}个用户: ${c.yellow.bold(`https://juejin.cn/user/${userIds[i]}`)}`)
    let followResult = await doneFollowUser(userIds[i])
    followResultArr.push(followResult)
    await randomDelay()
    consola.success(`第${c.red.bold(String(i + 1))}个关注完成`)

    let unFollowResult = await doneFollowUser(userIds[i], false)
    consola.success(`取消${c.red.bold(userIds[i])}关注完成`)
    unFollowResultArr.push(unFollowResult)
    await randomDelay()
  }

  const followSuccessNumber = followResultArr.filter((i) => i.err_no === 0)
  const unFollowSuccessNumber = unFollowResultArr.filter((i) => i.err_no === 0)
  consola.success(
    `任务完成, 总共成功关注 ${c.green.bold(String(followSuccessNumber.length))} 个用户, 失败${c.red.bold(
      String(followResultArr.length - followSuccessNumber.length)
    )}个`
  )
  consola.success(
    `任务完成, 总共成功取消关注 ${c.green.bold(String(unFollowSuccessNumber.length))} 个用户, 失败${c.red.bold(
      String(unFollowResultArr.length - unFollowSuccessNumber.length)
    )}个`
  )
}

export default followUser
