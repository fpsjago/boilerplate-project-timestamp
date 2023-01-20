// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:timestamp", function(req, res) {
  let timestamp = req.params.timestamp;
  if (timestamp.match(/\d{5,}/)) {
    timestamp = +timestamp
  }
  let userDate = new Date(timestamp);
  if (userDate.toUTCString() === "Invalid Date") {
 
   res.json({ error : userDate.toUTCString() })
    
  }
  res.json({ "unix": userDate.valueOf(), "utc": userDate.toUTCString() });
  
});


app.get("/api/", function(req, res) {

  let userDate = new Date();
res.json({ "unix": userDate.valueOf(), "utc": userDate.toUTCString() });
   
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
