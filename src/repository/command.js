const mongoose = require('mongoose')
const URI = 'mongodb://note:123456@127.0.0.1:27017/note'

// 连接 MongoDB 数据库
mongoose.connect(URI, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connect MongoDB success --> ' + URI)
    }
})

// 命令模型
const CommandSchema = new mongoose.Schema(
    {
        _id: mongoose.ObjectId,
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

// 获取集合连接
const Command = mongoose.model('Command', CommandSchema, 'note_command')

// 导出连接
module.exports = { Command }
