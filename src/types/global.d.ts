declare var userConfig: {
  cookies: string
}

declare interface baseAPIData<T> {
  /** 错误code */
  err_no: number
  /** 错误提示 */
  err_msg: string
  data: T
}