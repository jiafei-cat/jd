import type { Consola } from 'consola'
import type { AxiosInstance } from 'axios'

declare global {
  var userConfig: userConfig
  var consola: Consola
  var request: AxiosInstance
}
