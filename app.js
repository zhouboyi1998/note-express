// 引入 Express, 创建 Express Web 服务
const Express = require("express")
const { Connection } = require("./src/mongo/mongo")

// Express Web 服务器
const App = Express()

// 按 Linux 命令名称查询一条 Linux 命令
App.route("/note/command/one/:commandName").get((request, response) => {
    Connection.findOne({ "command": request.param("commandName") }, (err, result) => {
        if (err) {
            throw err
        } else {
            // 返回 JSON 格式数据
            response.json(result)
        }
    })
})

// 获取所有 Linux 命令
App.route("/note/command/list").get((request, response) => {
    Connection.find({}, (err, result) => {
        if (err) {
            throw err
        } else {
            // 返回 JSON 格式数据
            response.json(result)
        }
    })
})

// 获取所有 Linux 命令名称
App.route("/note/command/list/name").get((request, response) => {
    Connection.find({}, (err, result) => {
        if (err) {
            throw err
        } else {
            let nameList = []
            // 组装 Linux 命令名称数组
            result.filter(command => {
                nameList.push(command.command)
                console.log(command.command)
            })
            // 返回 JSON 格式数据
            response.json(nameList)
        }
    })
})

// 监听 127.0.0.1:18093
App.listen(18093)

console.log("Server listen on 127.0.0.1:18093")
