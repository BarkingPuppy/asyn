const https = require('http');

var postData = JSON.stringify({
    msg: 'Hello World!'
})

var options = {
  hostname: 'luffy.ee.ncku.edu.tw',
  port: 12237,
  path: '/match',
  method: 'POST',
  headers: {
       'Content-Type': 'application/json',
       'Content-Length': postData.length
     }
}

var options_get = {
  hostname: 'luffy.ee.ncku.edu.tw',
  port: 12237,
  path: '/get',
  method: 'GET'
}

// var req = https.request(options, (res) => {
//   console.log('statusCode:', res.statusCode);
//   console.log('headers:', res.headers);
// });

var req = https.request(options_get, (res) => {
    console.log('statusCode:', res.statusCode)
})