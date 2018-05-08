const express = require('express');
const http = require('http');
const querystring = require('querystring');
const request = require('request');
const bodyParser = require("body-parser");

let app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/getAccessToken', function(req, res){

    let form = {
        grant_type : 'authorization_code',
        code : req.body.code,
        client_id : req.body.client_id,
        client_secret : req.body.client_secret,
        redirect_uri : req.body.redirect_uri
    };

    let url = 'https://graph.api.smartthings.com/oauth/token';

    let formData = querystring.stringify(form);
    let contentLength = formData.length;

    console.log(url);
    console.log(formData);

    request({
        headers: {
          'Content-Length': contentLength,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: url,
        body: formData,
        method: 'POST'
      }, function (err, res2, body) {
          res.send(body);
      });
});

app.listen(3000, function(){
    console.log("Listening on http://localhost:3000/")
});