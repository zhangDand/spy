const getinfo = require('../func/getinfo').getinfosFromPage

async function pushData(Ins,infos){
    infos.forEach(async (item)=>{
        let jobid = item.jobid
        console.log(item)
        let ins = await Ins.findOrCreate({
            where:{jobid:jobid},
            defaults:item
        })
        if(!ins[1]){
            ins[0].update(item)
            console.log('||====update For:',jobid,item.title,ins[1],new Date().toString())
        }else{
            console.log('||====create as:',jobid,item.title,ins[1],new Date().toString())
        }

    })
}


var categorys = ['renli','siji','zpcaiwushenji','zpwuliucangchu','zplvyoujiudian','tech']


async function handle(getinfo,cate,sqins,maxpage,delay){
    console.log('handle start')
    await getinfo(pushData.bind(null,sqins),maxpage,cate,delay)

} 

async function player(sqins,maxpage,delay){
    console.log('player start')
    for(let cate of categorys){
        console.log(cate)
        await handle(getinfo,cate,sqins,maxpage,delay)
    }
    jobinfo = null
    // sequelize = null
    console.log('------------------------------------------------------------------------------结束')
}

module.exports = player