// 引入 Express, 创建 Express Web 服务
const Express = require("express")
const BodyParser = require("body-parser")
const { CommandModel } = require("./src/mongo/mongo")

// Express Web 服务器
const App = Express()
App.use(BodyParser.json({ limit: "1mb" }))
App.use(BodyParser.urlencoded({ extended: true }))

// 按 Linux 命令名称查询单条 Linux 命令
App.route("/note/command/one/:commandName").get((request, response) => {
    // 获取 URL 中的请求参数 (Linux 命令名称), 根据 Linux 命令名称查询单条 Linux 命令
    CommandModel.findOne({ "command": request.param("commandName") }, (err, result) => {
        if (err) {
            throw err
        } else {
            // 返回 JSON 格式数据
            response.json(result)
        }
    })
})

// 查询所有 Linux 命令
App.route("/note/command/list").get((request, response) => {
    // 查询所有 Linux 命令
    CommandModel.find({}, (err, result) => {
        if (err) {
            throw err
        } else {
            // 返回 JSON 格式数据
            response.json(result)
        }
    })
})

// 查询所有 Linux 命令名称
App.route("/note/command/list/name").get((request, response) => {
    // 查询所有 Linux 命令名称
    CommandModel.find({}, (err, result) => {
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
App.route("/note/command/insert").post((request, response) => {
    // 将请求体中的 JSON 转换成 Linux 命令模型
    let commandModel = CommandModel(request.body)
    // 插入数据
    commandModel.save((err, result) => {
        if (err) {
            throw err
        } else {
            response.json(result)
        }
    })
})

// 更新单条 Linux 命令
App.route("/note/command/update").put((request, response) => {
    // 将请求体中的 JSON 转换成 Linux 命令模型
    let command = request.body
    // 根据 Linux 命令的名称进行更新
    CommandModel.updateOne({ "_id": command._id }, command, (err, result) => {
        if (err) {
            throw err
        } else {
            response.json(result)
        }
    })
})

// 删除单条 Linux 命令
App.route("/note/command/delete/:commandId").delete((request, response) => {
    // 获取 URL 中的请求参数 (字符串格式的 ID), 使用 Model 生成模型对象时, Model 会自动将字符串格式的 ID 转换为 ObjectId
    let command = CommandModel({ _id: request.param("commandId") })
    // 根据 ObjectId 删除单条 Linux 命令
    CommandModel.deleteOne({ _id: command._id }, (err, result) => {
        if (err) {
            throw err
        } else {
            response.json(result)
        }
    })
})

// 监听 127.0.0.1:18093
App.listen(18093)

console.log("Server listen on 127.0.0.1:18093")
