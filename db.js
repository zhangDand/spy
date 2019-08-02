const Sequelize = require('sequelize')

console.log('init sequelize...')

var sequelize = new Sequelize('jobinfo','root','123456',{
    host:'localhost',
    dialect:'mysql',
    pool:{
        max:1000,
        min:0,
        idle:10000
    },
    timezone:"+8:00"
})

function defineModel(name,attributes){
    var attrs = {}
    for(let key in attributes) {
        let value = attributes[key]
        if (typeof value === 'object' && value['type']) {
            value.allowNull - value.allowNull || false
            attrs[key] = value
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            }
        }
    }

    attrs.id = {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    }
    return sequelize.define(name,attrs)
}

module.exports.defineModel = defineModel