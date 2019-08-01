const request = require('superagent')
const cheerio = require('cheerio')
const url = require('url')
const queryString = require('querystring')


function sleep(ms) {  // 延时函数
  return new Promise(resolve => setTimeout(resolve, ms))
}
async function delay(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(function(){
      resolve();
    }, time);
  });
};

async function getjobFromUrl(firsturl,category){  // 从固定的url中获取职位信息  http://hz.58.com/renli/pn{n}
  try {
      console.log('开始拉取' + '-' + firsturl)
      const res = await request.get(firsturl)
      let infos = []
      let $ = cheerio.load(res.text)
      let joblis = $('#list_con>li')
      // console.log(joblis)
      joblis.each((index,item)=>{
          // let url2 = url
          // let cheerio2 = cheerio
          // let queryString2 = queryString
          let title,salary,type,edureq,yearreq,company,address,joburl,compurl,jobid

          title = $(item).find('.job_title .job_name .name').text().trim()
          address = $(item).find('.job_title .job_name .address').text().trim()
          salary = $(item).find('.job_title .job_salary').text().trim()
          type = $(item).find('.job_comp .job_require .cate').text().trim()
          edureq = $(item).find('.job_comp .job_require .xueli').text().trim()
          yearreq = $(item).find('.job_comp .job_require .jingyan').text().trim()
          
          company = $(item).find('.job_comp .comp_name a').text().trim()

          joburl = $(item).find('.job_title .job_name a').attr('href').trim()
          compurl = $(item).find('.job_comp .comp_name a').attr('href').trim()

          jobidt = queryString.parse(url.parse(joburl).query).entinfo.split('_')
          jobid = jobidt[0]
          iutype = jobidt[1]

          let infobox = {title,address,salary,type,edureq,yearreq,company,joburl,compurl,jobid,iutype,category}
          infos.push(infobox)
          // console.log(title,address,salary,type,edureq,yearreq,company,jobid,iutype)
      })
      return infos
  } catch (err){
      console.error(err)
  }
}

// 根据参数输出固定的链接

async function getinfosFromPage(callback,maxPn,category,delay=1666) {
  //1-70页
  let box = []
  for(let i=1;i<=maxPn;i++){
      let realDelay = delay + Math.floor(Math.random()*10000)
      
      tgturl = i=1?`http://hz.58.com/${category}`:`http://hz.58.com/${category}/pn${i}`

      await sleep(realDelay)
      let infos = await getjobFromUrl(tgturl,category)
      box = box.concat(infos)
      console.log(category + '-标签-' + maxPn + '-页数-'+ i +"  "+ new Date())
      if(callback){
        callback(infos)
      }
  }
  return box
}

module.exports={
  getinfosFromPage :getinfosFromPage,
  sleep:sleep
}


