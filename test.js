const getinfo = require('./func/getinfo').getjobFromUrl
const request = require('superagent')
const cheerio = require('cheerio')
async function test(){
    let box = await getinfo('https://hz.58.com/renli/?PGTID=0d202408-0004-f0b4-a13e-778d6a43fbb1&ClickID=1')
    console.log(box)

    // let htmltext = await request.get('https://hz.58.com/cantfwy/?PGTID=0d202408-0004-fdcc-c2ff-1b03e56567c2&ClickID=1')
    // let $ = cheerio.load(htmltext.text)
    // let joblis = $('#list_con>li')
    // console.log(joblis)
}

test()
