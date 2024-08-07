import c from 'ansi-colors'
import getUserSignInStatus from '@/api/getUserSignInStatus'
import doneSignIn from '@/api/doneSignIn'
import getUserLotteryInfo from '@/api/getUserLotteryInfo'
import doneLottery from '@/api/doneLottery'
import getLotteryHistory from '@/api/getLotteryHistory'
import doneDipLucky from '@/api/doneDipLucky'

/**
 * 签到/抽奖/沾喜气 (通过调用API完成)
 */
export default async function normalTask() {
  await signIn() // 签到
  await lotteryFree() // 免费抽奖
  // await dipLucky() // 沾喜气
}

async function signIn() {
  const result = await getUserSignInStatus()

  if (result.err_no !== 0) {
    consola.error('获取用户签到数据失败，停止当前任务!')
    return
  }

  if (result.data) {
    consola.warn('当前用户已经签到')
    return
  }

  const signInResult = await doneSignIn()

  if (signInResult.err_no !== 0) {
    consola.error(signInResult.err_msg || '签到错误!')
    return
  }

  consola.success(
    `签到成功, 获得${c.green.bold(String(signInResult.data.incr_point))}积分, 总共${c.green.bold(
      String(signInResult.data.sum_point)
    )}分。`
  )
}

async function lotteryFree() {
  const result = await getUserLotteryInfo()

  if (result.err_no !== 0) {
    consola.error(result.err_msg)
    return
  }

  if (result.data.free_count <= 0) {
    consola.warn('今日已经抽过奖')
    return
  }

  const lotteryResult = await doneLottery()

  if (lotteryResult.err_no !== 0) {
    consola.warn(`抽奖失败, ${lotteryResult.err_msg}`)
    return
  }

  consola.success(`抽奖成功，获得${lotteryResult.data.lottery_name}`)
}

async function dipLucky() {
  const result = await getLotteryHistory()

  if (result.err_no !== 0) {
    consola.warn(`获取围观大奖列表失败, ${result.err_msg}`)
    return
  }

  const dipId = result.data?.lotteries?.[0]?.history_id

  if (dipId) {
    const dipResult = await doneDipLucky(dipId)

    if (dipResult.err_no !== 0) {
      consola.error(`沾喜气失败, ${dipResult.err_msg}`)
      return
    }

    if (dipResult.data.has_dip) {
      consola.warn(`今日已经沾过喜气`)
      return
    }

    if (dipResult.data.dip_action === 1) {
      consola.success(
        `沾喜气成功, 总幸运值为${c.green.bold(String(dipResult.data.total_value))}, 今日获得幸运值${c.green.bold(
          String(dipResult.data.dip_value)
        )}`
      )
    }
  }
}
