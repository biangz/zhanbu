export * from './zhanbu.js'
export * from './auth.js'
export * from './md5.js'

// 判断是不是组件
export const isvueComponent = (component) => {
    if (component.render) return true;
    if (component.setup) return true;
    return false;
}