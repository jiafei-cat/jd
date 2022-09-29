import delay from './delay'
import randomNumber from './randomNumber'

function randomDelay() {
  return delay(randomNumber(1000, 5000))
}

export {
  delay,
  randomNumber,
  randomDelay,
}