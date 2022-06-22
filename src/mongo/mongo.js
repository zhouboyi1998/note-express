// 引入 Mongoose 包, 创建 MongoDB 客户端
const Mongoose = require('mongoose')
const uri = "mongodb://note:123456@127.0.0.1:27017/note"

// 连接 MongoDB 服务端
Mongoose.connect(uri, (err) => {
    if (err) {
        console.log(err)
        return
    } else {
        console.log("Success to connect MongoDB")
    }
})

// Linux 命令模型
const Command = new Mongoose.Schema({
    id: Mongoose.ObjectId,
    command: String,
    usage: String,
    params: [
        {
            param: String,
            description: String
        }
    ]
})

// 使用模型获取连接
const Connection = Mongoose.model("Command", Command, "linux_command")

// 将连接导出给其它文件使用
module.exports = { Connection }
