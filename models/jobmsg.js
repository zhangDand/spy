const db = require('../db.js')
const Sequelize = require('sequelize')

module.exports = db.defineModel('jobmsg',{
    title:Sequelize.TEXT,
    address:Sequelize.STRING,
    type:Sequelize.STRING,
    edureq:Sequelize.STRING,
    yearreq:Sequelize.STRING,
    company:Sequelize.STRING,
    joburl:Sequelize.TEXT,
    compurl:Sequelize.TEXT,
    jobid:{
        type:Sequelize.STRING,
        unique:true,
    },
    salary:Sequelize.STRING,
    iutype:Sequelize.STRING,
    category:Sequelize.STRING,
})