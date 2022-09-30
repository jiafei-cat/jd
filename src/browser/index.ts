import puppeteer from 'puppeteer'

const initBrowser = async () => {
  if (!global.browser) {
    try {
      global.browser = await puppeteer.launch({
        headless: true,
        devtools: false,
        defaultViewport: null,
        slowMo: 250,
        timeout: 0,
        ignoreHTTPSErrors: true,
        ignoreDefaultArgs: ['--enable-automation'],
        args: [
          '--no-sandbox',                    // 沙盒模式
          '--disable-setuid-sandbox',        // uid沙盒
          '--disable-dev-shm-usage',         // 创建临时文件共享内存
          '--disable-accelerated-2d-canvas', // canvas渲染
          '--disable-gpu',                   // GPU硬件加速
        ]
      })
    } catch (error) {
      consola.error('puppeteer初始化失败', error)
    }
  }

  return global.browser
}


export default initBrowser