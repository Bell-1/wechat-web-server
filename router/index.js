import Router from '@koa/router'
import wx from './wx'

// 装载所有子路由
let router = new Router()
router.use('/api/wx', wx.routes(), wx.allowedMethods())

export default router;