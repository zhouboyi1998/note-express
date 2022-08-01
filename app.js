const express = require("express")
const bodyParser = require("body-parser")
const { Command } = require("./src/mongo/mongo")

// Express Web Server
const app = express()

// 添加中间件 BodyParser: 解析 JSON 格式的请求参数
app.use(bodyParser.json({ limit: "1mb" }))
app.use(bodyParser.urlencoded({ extended: true }))

// 添加中间件: 打印日志
app.use((request, response, next) => {
    console.log(new Date().toLocaleString() + ' --> ' + request.url)
    next()
})

// 按 Linux 命令名称查询单条 Linux 命令
app.route("/note/command/one/:commandName").get((request, response) => {
    // 获取 URL 中的请求参数 (Linux 命令名称), 根据 Linux 命令名称查询单条 Linux 命令
    Command.findOne({ "command": request.param("commandName") }, (err, result) => {
        if (err) {
            throw err
        } else {
            // 返回 JSON 格式数据
            response.json(result)
        }
    })
})

// 查询所有 Linux 命令
app.route("/note/command/list").get((request, response) => {
    // 查询所有 Linux 命令
    Command.find({}, (err, result) => {
        if (err) {
            throw err
        } else {
            // 返回 JSON 格式数据
            response.json(result)
        }
    })
})

// 查询所有 Linux 命令名称
app.route("/note/command/list/name").get((request, response) => {
    // 查询所有 Linux 命令名称
    Command.find({}, (err, result) => {
        if (err) {
            throw err
        } else {
            let nameList = []
            // 组装 Linux 命令名称数组
            result.filter(command => {
                nameList.push(command.command)
            })
            // 返回 JSON 格式数据
            response.json(nameList)
        }
    })
})

// 插入单条 Linux 命令
app.route("/note/command/insert").post((request, response) => {
    // 将请求体中的 JSON 转换成 Linux 命令模型
    let command = Command(request.body)
    // 插入数据
    command.save((err, result) => {
        if (err) {
            throw err
        } else {
            response.json(result)
        }
    })
})

// 更新单条 Linux 命令
app.route("/note/command/update").put((request, response) => {
    // 将请求体中的 JSON 转换成 Linux 命令模型
    let command = request.body
    // 根据 Linux 命令的名称进行更新
    Command.updateOne({ "_id": command._id }, command, (err, result) => {
        if (err) {
            throw err
        } else {
            response.json(result)
        }
    })
})

// 删除单条 Linux 命令
app.route("/note/command/delete/:commandId").delete((request, response) => {
    // 获取 URL 中的请求参数 (字符串格式的 ID), 使用 Model 生成模型对象时, Model 会自动将字符串格式的 ID 转换为 ObjectId
    let command = Command({ _id: request.param("commandId") })
    // 根据 ObjectId 删除单条 Linux 命令
    Command.deleteOne({ _id: command._id }, (err, result) => {
        if (err) {
            throw err
        } else {
            response.json(result)
        }
    })
})

// 监听 127.0.0.1:18093
app.listen(18093)

console.log("Server listen on 127.0.0.1:18093")
