const HTTP = require('http');
const HTTPS = require('https');
const qs = require('qs');

// 检查协议
function checkCrotocol (url){
  return url.indexOf('https') > -1 ? HTTPS : HTTP;
}

function get (url, param = {}){
		let http = checkCrotocol(url);
    let _resolve, _reject;

    const promise = new Promise((resolve, reject)=>{
      _resolve = resolve;
      _reject = reject;
    })

    if(typeof param !== 'object') {
      _reject('参数格式不正确');
    }
    
    const reqUrl = `${url}?${qs.stringify(param)}`;
    const req = http.get(reqUrl, res=>{
      let html = '';
      res.on('data', (chunk) => {
				html += chunk;
			});
			res.on('end', () => {
        try {
          const jsonData = JSON.parse(html);
          _resolve(jsonData)
        } catch (error) {
          _resolve(html);
        }
			});
    })
    req.on('error', err => {
      _reject(err)
    })

    return promise;
}

function post (url, data = {}, param = {}){
  let http = checkCrotocol(url);
  let _resolve, _reject;

  const promise = new Promise((resolve, reject)=>{
    _resolve = resolve;
    _reject = reject;
  })

  if(typeof param !== 'object' || typeof data !== 'object') {
    _reject('参数格式不正确');
  }
  
  const reqUrl = `${url}?${qs.stringify(param)}`;
  const postData = JSON.stringify(data);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }
  const req = http.request(reqUrl, options, res=>{
    let html = '';
    res.on('data', (chunk) => {
      html += chunk;
    });
    res.on('end', () => {
      try {
        const jsonData = JSON.parse(html);
        _resolve(jsonData)
      } catch (error) {
        _resolve(html);
      }
    });
  })
  req.on('error', err => {
    _reject(err)
  })

  req.write(postData);
  req.end();

  return promise;
}

const request = {
  get,
  post,
}

module.exports = request;