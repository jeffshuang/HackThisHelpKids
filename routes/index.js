var express = require("express");
var firebase = require('firebase');
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Penis" });
});

var config = {
    apiKey: "AIzaSyAUdsE2TisvisIIX6hWEyTkQ0xWvJERTUY",
    authDomain: "hackthekids-ac0c9.firebaseapp.com",
    databaseURL: "https://hackthekids-ac0c9.firebaseio.com",
    projectId: "hackthekids-ac0c9",
    storageBucket: "hackthekids-ac0c9.appspot.com",
    messagingSenderId: "187488860542"
  };
firebase.initializeApp(config);


module.exports = router;
