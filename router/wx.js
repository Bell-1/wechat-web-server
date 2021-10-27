import Router from '@koa/router'
import {
  checkSignature,
  getConfig
} from '../controllers/wx/index'
const config = require('config-lite')(__dirname);
const wx = new Router();

wx.get('/callback', async (ctx) => {
  const query = ctx.request.query;
  try {
    const res = await checkSignature(query);
    ctx.body = res; //(res, '验证通过');
  } catch (error) {
    ctx.status = 500;
    ctx.failSend(res);
  }
})

wx.get('/getSign', async (ctx) => {
  const query = ctx.request.query;
  console.log('query', query)
  try {
    const res = await getConfig(query);
    ctx.body = {
      code: 0,
      success: true,
      msg: '成功',
      data: res,
    };
  } catch (error) {
    ctx.failSend(error);
  }
})



export default wx