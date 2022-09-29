export default function randomNumber(start: number, end?: number) {
  end = end ?? start
  start = 0

  if (start === end) {
    return start
  }

  return Math.floor(Math.random() * end)+ start
}