import type { Consola } from 'consola'
import type { AxiosInstance } from 'axios'
import type { Browser } from 'puppeteer'

declare global {
  var userConfig: userConfig
  var consola: Consola
  var request: AxiosInstance
  var userId: string
  var browser: Browser
}
