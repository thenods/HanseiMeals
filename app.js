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

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 5)]
rule.hour = 8;

schedule.scheduleJob(rule, () => {
  tokenChange()
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