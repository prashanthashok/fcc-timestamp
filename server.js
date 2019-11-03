// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp", function(req, res) {
  res.json({unix: Date.now(), utc: Date()})        
});

app.get("/api/timestamp/:date_string", function(req, res){
  let dateString = req.params.date_string;
  //let intRegex = new RegExp('^\d{5,}$');
  if(/\d{5,}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    res.json({unix: dateString, utc: new Date(dateInt).toUTCString()}) 
  }
  
  let dateObj = new Date(dateString);
  if(dateObj.toString() === 'Invalid Date') {
    res.json({error: "Invalid Date"});
  } else {
    res.json({unix: dateObj.getTime(), utc: dateObj.toUTCString()});
  }
})

//Original implementation
// app.get("/api/timestamp/:date_string?", function(req, res) {
//   let inputDateString = req.params.date_string;
  
//   let dateRegex = new RegExp('^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$');
//   //
  
//   let isISO8601Format = false;
//   let isUnixTimeStamp = false;
//   let invalidDate = false;
//   let json;
//   let inputDate;
  
//   //Test what format input date string is in i.e., yyyy-mm-dd or unix timestamp
//   isISO8601Format = dateRegex.test(inputDateString) ? true : false;
//   isUnixTimeStamp = parseInt(inputDateString) ? true : false;
    
  
//   if(isISO8601Format){
//    inputDate = new Date(inputDateString);
//   }
  
//   if(isUnixTimeStamp) {
//     inputDate = new Date(parseInt(inputDateString));
//   }
  
//   invalidDate = inputDate == 'Invalid Date' ? true : false;
  
//   //if input is valid, return error
//   if(invalidDate)
//     {
//       json = {"error": "Invalid Date"};
//     }
//   else {
//     let milliDate = new Date(inputDate);
//     let unixTimestamp = isUnixTimeStamp ? inputDate : milliDate.getTime(); 
//     let utcDateTime = milliDate.toUTCString();
//     json = {"unix":unixTimestamp, "utc": utcDateTime };
//   }
  
//   res.json(json);
// });

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
