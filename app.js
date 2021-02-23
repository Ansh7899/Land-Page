const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile( __dirname + '/signup.html' );
});

app.post("/",function(req,response){
const firstName = req.body.fname;
const lastName = req.body.lname;
const email = req.body.mail;
const data ={
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
}

const jsonData = JSON.stringify(data);

const url ='https://us1.api.mailchimp.com/3.0/lists/70e3978dcc';

const options = {
  method: "POST",
  auth: "anshhunny2000@gmail.com:3a6602dd64d3096b901f4573cd3b0ecb-us1"
};

const request = https.request(url,options,function(reponse){
if(response.statusCode === 200){
  response.sendFile(__dirname+'/success.html');
}
else{
  response.sendFile(__dirname+'/failure.html');
}
reponse.on("data",function(data){
  console.log(JSON.parse(data));
});
});

request.write(jsonData);
request.end();
});

app.post("/failure", function(req,res){
res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
  console.log("server running on port 3000");
})
