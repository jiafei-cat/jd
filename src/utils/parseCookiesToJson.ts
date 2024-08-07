export default function parseCookiesToJson(stringCookies: string, url: string) {
  return stringCookies
    .split(';')
    .filter(Boolean)
    .reduce(
      (pre, cur) => {
        const [key, value] = cur.split('=')
        pre.push({ url, name: key.trim(), value })
        return pre
      },
      [] as {
        url: string
        name: string
        value: string
      }[]
    )
}
