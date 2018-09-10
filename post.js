const FB = require('fb')
const fs = require('fs')

const token = require('./token.json').token

FB.setAccessToken(token);
console.log('토큰 설정 완료', token)

const post = (today) => {
  const lunch = today.lunch ? today.lunch.replace(/,/gi, '\n') : '급식 없는 날(행복)'
  
  console.log(lunch)

  FB.api('/932244020305222/feed', 'post', { message: lunch}, (res) => {
    console.log(!!res.error ? res.error : 'done!')
  })
}

module.exports = post