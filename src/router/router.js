const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { Command } = require('../mongo/mongo')

// 按 ObjectId 查询单条 Linux 命令
router.get('/one/:commandId', (request, response) => {
    // 根据 ObjectId 查询单条 Linux 命令
    Command.findOne({ '_id': request.params.commandId }, (err, result) => {
        if (err) {
            throw err
        } else {
            // 返回 JSON 格式数据
            response.json(result)
        }
    })
})

// 按 Linux 命令名称查询单条 Linux 命令
router.get('/one/name/:commandName', (request, response) => {
    // 根据 Linux 命令名称查询单条 Linux 命令
    Command.findOne({ 'command': request.params.commandName }, (err, result) => {
        if (err) {
            throw err
        } else {
            // 返回 JSON 格式数据
            response.json(result)
        }
    })
})

// 查询所有 Linux 命令
router.get('/list', (request, response) => {
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
router.get('/list/name', (request, response) => {
    // 查询所有 Linux 命令名称
    Command.find({}, (err, result) => {
        if (err) {
            throw err
        } else {
            let commandNames = []
            // 组装 Linux 命令名称数组
            result.filter(command => {
                commandNames.push(command.command)
            })
            // 返回 JSON 格式数据
            response.json(commandNames)
        }
    })
})

// 插入单条 Linux 命令
router.post('/insert', (request, response) => {
    // 从 RequestBody 中获取 Linux 命令模型
    let command = request.body
    // 生成新的 ObjectId
    command._id = mongoose.Types.ObjectId()
    // 插入数据
    Command.create(command, (err, result) => {
        if (err) {
            throw err
        } else {
            response.json(result)
        }
    })
})

// 批量插入 Linux 命令
router.post('/insert/batch', (request, response) => {
    // 从 RequestBody 中获取 Linux 命令模型数组
    let commandList = request.body
    // 生成新的 ObjectId
    commandList.forEach(command => {
        command._id = mongoose.Types.ObjectId()
    })
    // 插入数据
    Command.create(commandList, (err, result) => {
        if (err) {
            throw err
        } else {
            response.json(result)
        }
    })
})

// 更新单条 Linux 命令
router.put('/update', (request, response) => {
    // 从 RequestBody 中获取 Linux 命令模型
    let command = request.body
    // 根据 Linux 命令的名称进行更新
    Command.updateOne({ _id: command._id }, command, (err, result) => {
        if (err) {
            throw err
        } else {
            response.json(result)
        }
    })
})

// 批量更新 Linux 命令
router.put('/update/batch', (request, response) => {
    // 从 RequestBody 中获取 Linux 命令模型数组
    let body = request.body
    // 根据 Linux 命令的名称进行更新
    Command.updateMany({ _id: body._id }, body.command, (err, result) => {
        if (err) {
            throw err
        } else {
            response.json(result)
        }
    })
})

// 删除单条 Linux 命令
router.delete('/delete/:commandId', (request, response) => {
    // 根据 _id 删除单条 Linux 命令
    Command.deleteOne({ _id: request.params.commandId }, (err, result) => {
        if (err) {
            throw err
        } else {
            response.json(result)
        }
    })
})

// 导出路由
module.exports = router
