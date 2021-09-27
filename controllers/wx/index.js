const config = require('config-lite')(__dirname);
import sha1 from 'crypto-js/sha1';
import http from '../../utils/http'
import {randomString} from '../../utils'

const {
  token,
  appId,
  secret
} = config.wx;
let accessToken = ''; // 微信token
let accessTicket = ''; // 微信ticket

// 检查jsApi 回调
export const checkSignature = (query) => {
  const {
    signature,
    timestamp,
    nonce,
    echostr
  } = query;
  const tmpArr = [token, timestamp, nonce].sort();
  //3.将三个参数字符串拼接成一个字符串进行sha1加密
  var tempStr = tmpArr.join('');
  const hashCode = sha1(tempStr).toString(); //创建加密类型
  if (hashCode === signature) {
    // 对比加密是否一致
    return echostr
  } else {
    return false
  }
}

// 获取微信jsapi token
export const getToken = async () => {
  if (accessToken !== '') {
    return accessToken;
  }
  const res = await http.get('https://api.weixin.qq.com/cgi-bin/token', {
    grant_type: 'client_credential',
    appid: appId,
    secret,
  });

  const {
    access_token,
    expires_in
  } = res;
  accessToken = access_token;

  setTimeout(() => {
    accessToken = '';
  }, expires_in)

  return accessToken;
}

// 获取微信jsAPI ticket
export const getTicket = async (accessToken) => {
  if (!accessToken) {
    throw new Error('access_token 不能为空');
  }
  const res = await http.get('https://api.weixin.qq.com/cgi-bin/ticket/getticket', {
    access_token: accessToken,
    type: 'jsapi',
  });

  const {
    errcode,
    ticket,
    expires_in,
    errmsg
  } = res;
  if (errcode === 0) {
    accessTicket = ticket;
    setTimeout(() => {
      accessTicket = '';
    }, expires_in)

  } else {
    throw new Error(`获取ticket失败 ${errcode}: ${errmsg}`)
  }
  return accessTicket;
}

// 获取微信配置
export const getConfig = async (query) => {
  const token = await getToken();
  const ticket = await getTicket(token);
  const {
    url
  } = query;
  console.log('url', url)
  console.log('ticket', ticket)
  const nonceStr = randomString(16);
  const timestamp = ~~(new Date() / 1000);
  const str = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
  const signature = sha1(str).toString();

  return {
    signature,
    timestamp,
    nonceStr,
    appId,
  }
}