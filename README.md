# koa2-demo

基于Koa2搭建的服务器
```
|-- .babelrc  
|-- .gitignore  
|-- app.js  
|-- directoryList.md  
|-- index.js  
|-- package-lock.json  
|-- package.json  
|-- README.md  
|-- config  
|   |-- default.js  
|   |-- development.js  
|   |-- webpac.config.js  
|-- controllers //接口处理  
|   |-- admin  
|   |   |-- index.js  
|   |-- user  
|       |-- index.js  
|-- model  //mongoose model
|   |-- adminModel.js
|   |-- counts.js
|   |-- userModal.js
|-- mongodb  //mongo连接
|   |-- db.js  
|   |-- index.js  
|-- res  //返回数据格式
|   |-- genSend.js  
|   |-- status.js  
|-- router  //路由定义
|   |-- 404.js
|   |-- admin.js
|   |-- index.js
|   |-- user.js
|   |-- weather.js
|-- units  
	|-- seniverse.js  
```

## 安装依赖
npm i

## 运行

npm run serve

