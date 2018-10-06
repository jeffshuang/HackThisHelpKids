var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var axios = require('axios');
var firebase = require("firebase");


var config = {
  apiKey: "AIzaSyAUdsE2TisvisIIX6hWEyTkQ0xWvJERTUY",
  authDomain: "hackthekids-ac0c9.firebaseapp.com",
  databaseURL: "https://hackthekids-ac0c9.firebaseio.com",
  projectId: "hackthekids-ac0c9",
  storageBucket: "hackthekids-ac0c9.appspot.com",
  messagingSenderId: "187488860542"
};
firebase.initializeApp(config);



var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.post('/sendPic/', function(req, res) {
    var email = req.body.url;
    console.log(email);
    login(email);
})


function login(urlUsed){
  var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes":
                "age,emotion",
        };

  var subscriptionKey = "0001beb2e84743f88ebb524de2421c20";
  var uriBase = "https://eastus.api.cognitive.microsoft.com/face/v1.0/detect"

  var urlL = Object.keys(params).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
  }).join('&');

  axios({
    method: 'post',
    url: uriBase + '?' + urlL,
    headers:  {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": subscriptionKey
    },
    data: '{"url": ' + '"' + urlUsed + '"}'
  }).then(function(response) {
    console.log(response.data[0].faceAttributes.emotion);
    console.log(response.data[0].faceAttributes.age);
    var obj = response.data[0].faceAttributes.emotion;
    if (obj != null) {
      var childRef = firebase.database().ref('child/' + 'Dnria' + '/emotions').push();
      obj["age"] = response.data[0].faceAttributes.age;
      childRef.set(obj);
    }


  }).catch(function (error) {
    console.log(error);
  });

}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
