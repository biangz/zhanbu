import createXhReport from 'xh-report'
export const requestXhReport = createXhReport()

export const PKG = 'web.yuandao.com' // 悬壶里产品的 PKG
export const APP_VERSION = '1.2.1' // eg. '1.1.1'
export const TOKEN = requestXhReport.uuid(PKG) // 或者你自己项目的 TOKEN用户唯一标识