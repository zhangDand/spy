const schedule = require('node-schedule')

var rule = new schedule.RecurrenceRule()
rule.second = 1
// rule.minute = 0




let schd = schedule.scheduleJob.bind(null,'*/20 * * * * ')

module.exports = schd