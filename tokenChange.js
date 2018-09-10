const fs = require('fs')
const FB = require('fb')

const tokenChange = () => {
  FB.api('/932244020305222?fields=access_token', (res) => {
    console.log(res.error || res.access_token)
    if(!res.error) {
      const token = res.access_token;
      fs.writeFile('token.json', `{"token":"${token}"}`, (err) => {
        console.log(err ? err : '토큰 변경 완료')
      })
    }
  })
}

module.exports = tokenChange

