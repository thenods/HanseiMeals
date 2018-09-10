const http = require('http')

const schedule = require('node-schedule')
const request = require('request')

const tokenChange = require('./tokenChange')
const post = require('./post')

const server = http.createServer()
const port = 3000

server.listen(port, () => {
  console.log(`server started on ${port}`)
})
// 토큰 변경
const rule1 = new schedule.RecurrenceRule();
rule1.minute = 30;

// 급식 올리기
const rule2 = new schedule.RecurrenceRule();
rule2.dayOfWeek = [0, new schedule.Range(1, 5)]
rule2.hour = 7;
rule2.minute = 15;



schedule.scheduleJob(rule1, () => {
  tokenChange()
})

schedule.scheduleJob(rule2, () => {
  const date = new Date()

  const todayforlog = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`

  console.log(`${todayforlog}.  run`)

  const url = 'https://www.foodsafetykorea.go.kr/portal/sensuousmenu/selectSchoolMonthMealsDetail.do'

  

  const body = {
    schl_cd:'B100000662',
    type_cd:'M',
    year: date.getFullYear(),
    month: date.getMonth() + 1
  }



  request.post(url, {
    formData: body
    }, (err, res, body) => {
    if (err) console.log(err)
    else {
      const result = JSON.parse(body).list
      const todayDate = date.getDate()
      const today = result.filter(val => {
        return val.dd_date == todayDate
      })
      post(today[0])
    }
  })
})