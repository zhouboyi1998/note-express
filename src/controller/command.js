const mongoose = require('mongoose')
const { Command } = require('../repository/command')

// 根据id查询命令
exports.one = async (request, response) => {
    // 根据id查询命令
    const result = await Command.findOne({ _id: request.params.commandId }).exec()
    response.json(result)
}

// 查询命令列表
exports.list = async (request, response) => {
    // 查询命令列表
    const result = await Command.find().lean().exec()
    response.json(result)
}

// 新增命令
exports.insert = async (request, response) => {
    // 获取请求体参数
    let command = request.body
    // 生成文档id
    command._id = mongoose.Types.ObjectId()
    // 新增命令
    const result = await Command.create(command)
    response.json(result)
}

// 批量新增命令
exports.insertBatch = async (request, response) => {
    // 获取请求体参数
    let commandList = request.body.map(command => ({
        ...command,
        // 为每一个新增的命令生成文档id
        _id: mongoose.Types.ObjectId()
    }))
    // 批量新增命令
    const result = await Command.create(commandList)
    response.json(result)
}

// 修改命令
exports.update = async (request, response) => {
    // 获取请求体参数
    let command = request.body
    // 修改命令
    const result = await Command.updateOne({ _id: command._id }, command).exec()
    response.json(result)
}

// 批量修改命令
exports.updateBatch = async (request, response) => {
    // 获取请求体参数
    let commandList = request.body
    // 遍历命令数组
    const promiseList = commandList.map(command =>
        Command.updateOne({ _id: command._id }, command).exec()
    )
    // 等待所有修改操作完成
    let resultList = await Promise.all(promiseList)
    response.json(resultList)
}

// 删除命令
exports.delete = async (request, response) => {
    // 根据文档id删除命令
    const result = await Command.deleteOne({ _id: request.params.commandId }).exec()
    response.json(result)
}

// 批量删除命令
exports.deleteBatch = async (request, response) => {
    // 获取请求体参数
    let commandList = request.body
    // 遍历命令数组
    const promiseList = commandList.map(command =>
        Command.deleteOne({ _id: command._id }, command).exec()
    )
    // 等待所有修改操作完成
    let resultList = await Promise.all(promiseList)
    response.json(resultList)
}

// 查询命令
exports.select = async (request, response) => {
    // 根据命令名称查询数据
    const result = await Command.findOne({ command: request.params.commandName }).exec()
    response.json(result)
}

// 查询命令名称列表
exports.nameList = async (request, response) => {
    // 查询命令列表
    const result = await Command.find().lean().exec()
    // 获取命令名称列表
    const nameList = result.map(command => command.command)
    response.json(nameList)
}
