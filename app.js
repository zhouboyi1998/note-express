const express = require('express')
const bodyParser = require('body-parser')

// 新建 Express 实例
const app = express()

// 添加中间件: BodyParser 解析 JSON 格式的请求参数
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

// 添加中间件: 打印日志
app.use((request, response, next) => {
    console.log(new Date().toLocaleString() + ' --> ' + request.url)
    next()
})

// 添加路由
app.use('/command', require('./src/router/command'))

// 启动服务
app.listen(18093)

console.log('Server listen on 127.0.0.1:18093')
