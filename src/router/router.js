const express = require('express')
const router = express.Router()
const { Command } = require('../mongo/mongo')

// 按 Linux 命令名称查询单条 Linux 命令
router.get('/one/:commandName', (request, response) => {
    // 获取 URL 中的请求参数 (Linux 命令名称), 根据 Linux 命令名称查询单条 Linux 命令
    Command.findOne({ 'command': request.param('commandName') }, (err, result) => {
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
router.post('/insert', (request, response) => {
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
router.put('/update', (request, response) => {
    // 将请求体中的 JSON 转换成 Linux 命令模型
    let command = request.body
    // 根据 Linux 命令的名称进行更新
    Command.updateOne({ '_id': command._id }, command, (err, result) => {
        if (err) {
            throw err
        } else {
            response.json(result)
        }
    })
})

// 删除单条 Linux 命令
router.delete('/delete/:commandId', (request, response) => {
    // 获取 URL 中的请求参数 (字符串格式的 ID), 使用 Model 生成模型对象时, Model 会自动将字符串格式的 ID 转换为 ObjectId
    let command = Command({ _id: request.param('commandId') })
    // 根据 ObjectId 删除单条 Linux 命令
    Command.deleteOne({ _id: command._id }, (err, result) => {
        if (err) {
            throw err
        } else {
            response.json(result)
        }
    })
})

// 导出路由
module.exports = router
