import axios from 'axios'

const defaultHeader = {
  origin: 'https://juejin.cn',
  pragma: 'no-cache',
  referer: 'https://juejin.cn/',
  'sec-ch-ua': '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': 'macOS',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-site',
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
}

const axiosInstance = axios.create({
  baseURL: 'https://api.juejin.cn',
})

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      // @ts-ignore
      config.headers = { ...config.headers, ...defaultHeader }
      config.headers.cookie = userConfig.cookies
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use((response) => {
  return response.data
})

export default axiosInstance
