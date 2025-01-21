const express = require('express')
const router = express.Router()
const command = require('../controller/command')

// TIP: 由于 Express 的路由没有精准匹配优先功能, 而是从前往后扫描, 所以需要手动将精准匹配的路由移动到模糊匹配的路由前面

// 查询所有命令的名称
router.get('/name-list', command.nameList)

// 根据id查询命令
router.get('/:commandId', command.one)

// 查询命令列表
router.get('/', command.list)

// 新增命令
router.post('/', command.insert)

// 批量新增命令
router.post('/batch', command.insertBatch)

// 修改命令
router.put('/', command.update)

// 批量修改命令
router.put('/batch', command.updateBatch)

// 批量删除命令
router.delete('/batch', command.deleteBatch)

// 删除命令
router.delete('/:commandId', command.delete)

// 使用命令名称查询单条命令
router.get('/select/:commandName', command.select)

// 导出路由
module.exports = router
