import Koa from 'koa'
import onerror from 'koa-onerror'
import bodyParser from 'koa-bodyparser'
import router from './router'
const Send = require('./utils/res')
const config = require('config-lite')(__dirname);
const app = new Koa();


app.context.successSend = Send.successSend;
app.context.failSend = Send.failSend;

app.use(bodyParser());

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 404
app.use(ctx => {
  console.log(ctx.request.url)
    ctx.status = 404;
    ctx.failSend(-404);
});

onerror(app);

function startListen(port = config.port) {
    app.listen(port);
    console.log(`serve start-quick is starting at port ${config.port}`);
}

startListen();