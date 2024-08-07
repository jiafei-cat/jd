import c from 'ansi-colors'
import doneStarArticle from '@/api/doneStarArticle'
import getRandomPins from './helper/getRandomPins'
import { randomDelay } from '@/utils'

/**
 * 随机点赞沸点
 * @param time 点赞沸点数量
 */
async function starPins(time: number) {
  const pinIds = await getRandomPins(time)

  consola.start(`开始执行沸点文章任务, 需要总的点赞数: ${c.red.bold(String(time))}`)
  let resultArr = []
  for (let i = 0; i < pinIds.length; i++) {
    consola.log(`开始点赞第${c.red(String(i + 1))}篇沸点: ${c.yellow.bold(`https://juejin.cn/pin/${pinIds[i]}`)}`)
    let result = await doneStarArticle(pinIds[i], 4)
    resultArr.push(result)
    await randomDelay()
    consola.success(`第${c.red.bold(String(i + 1))}篇点赞完成`)
  }

  const successNumber = resultArr.filter((i) => i.err_no === 0)
  const failedNumber = resultArr.length - successNumber.length
  consola.success(`
    任务完成, 总共成功点赞 ${c.green.bold(String(successNumber.length))} 篇沸点, 
    失败${c.red.bold(String(failedNumber))}篇
    ${
      failedNumber
        ? '失败原因: ' +
          resultArr
            .filter((i) => i.err_no !== 0)
            .map((i) => i.err_msg)
            .join('-')
        : ''
    }
  `)
}

export default starPins
