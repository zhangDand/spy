// 生成数据库实例
let model = require('./model')
let jobmsg = model.jobmsg
jobmsg.sync()

// 爬虫测试
let spy = require('./task/spy58')
// 定时计划
const schd = require('./schedul/testSch')
spy(jobmsg,20,4000)
console.log('我是好人' + new Date())
schd(()=>{
  console.log('我是好人' + new Date())
  spy(jobmsg,70,10000)
})