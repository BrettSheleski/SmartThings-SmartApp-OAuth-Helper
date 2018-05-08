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

        var smartthingsInfo = {
            access_token : null,
            endpoints : []
        };

        try{
            smartthingsInfo.access_token = JSON.parse(body);
        }
        catch(ex){
            res.setHeader('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({error : ex}))
            return;
        }

        var smartthingsInfo = {
            access_token : JSON.parse(body),
            endpoints : []
        };

        request({
            headers : {
                'Authorization' : "Bearer " + smartthingsInfo.access_token.access_token
            },
            url : "https://graph.api.smartthings.com/api/smartapps/endpoints",
            method : 'GET'

        }, function(err, res2, body){
            smartthingsInfo.endpoints = JSON.parse(body);

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(smartthingsInfo));
        });
      });
});

app.listen(3000, function(){
    console.log("Listening on http://localhost:3000/")
});