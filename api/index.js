const express = require('express');
const request = require('request');
const querystring = require('querystring');

const app = express();

const endpointToken = "https://accounts.spotify.com/api/token";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

// route를 직접 작성할 경우
app.post('/', function (req, res) {
  res.send('Hello World!')
});


/**토큰 발급 */
app.post('/token', async function (req, res) {
  const options = {
    uri: endpointToken,
    headers: { 
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type:"client_credentials"
    },
    json: true,
    
  }
  try {
    console.log(client_id + ':' + client_secret)
    request.post(options, function (err, response, body) {
      res.send(body)
    })
  } catch (e) {
    res.send('error')
  }
  
});

app.post("/search", async function (req, res) {
  
  const token = req.headers.authorization;

  if(!token) {
    res.send("토큰발급먼저하셈")
    return;
  }
  

  const query = querystring.stringify({
    q: "fromis_9",
    type: "artist",
  })

  const options = {
    uri: `https://api.spotify.com/v1/search?${query}`,
    headers: { 
      'Authorization': 'Bearer ' + token
    }    
  }
  // console.log(options);

  // res.send(options)
  try {
    request.get(options, function (err, response, body) {
      console.log(err)
      res.send(body)
    })
  } catch (e) {
    res.send('error')
  }
})

module.exports = {
  path: '/api',
  handler: app
};