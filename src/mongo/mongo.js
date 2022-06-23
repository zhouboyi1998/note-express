// 引入 Mongoose 包, 创建 MongoDB 客户端
const Mongoose = require("mongoose")
const URI = "mongodb://note:123456@127.0.0.1:27017/note"

// 连接 MongoDB 服务端
Mongoose.connect(URI, (err) => {
    if (err) {
        console.log(err)
        return
    } else {
        console.log("Connect success --> " + URI)
    }
})

// Linux 命令模型架构
const CommandSchema = new Mongoose.Schema(
    {
        _id: Mongoose.ObjectId,
        command: String,
        usage: String,
        params: [
            {
                param: String,
                description: String
            }
        ]
    },
    {
        // 不需要插入版本号
        versionKey: false
    }
)

// 连接文档集合, 获取 Linux 命令模型
const CommandModel = Mongoose.model("Command", CommandSchema, "linux_command")

// 将模型导出
module.exports = { CommandModel }
