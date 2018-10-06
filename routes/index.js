var express = require("express");
var firebase = require('firebase');
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  // addKidImage();
  loginUser();
  addNewKid();
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


function makeId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

// Get a reference to the database service
var database = firebase.database().ref('/');

function addNewKid() {
  console.log("Adding New Kid");
  var childRef = firebase.database().ref('child/' + 'mtQa2' + '/key');

  childRef.set("pornhubkey.com");

}


function addKidImage(id) {
  console.log("Adding Kid");
  var newId = makeId();
  var childRef = firebase.database().ref('child/' + newId + '/images').push();

  var date = new Date();
  var time = date.valueOf();

  var obj = {
    date: time,
    url: "www.pornhub.com"
  }

  childRef.set(obj);
}


function loginUser() {
  database.on('value', function(snapshot) {
    database.once('value', function(snapshot) {

      var foundChild;
      var foundParent;

      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        if (childKey == "child") {
          foundChild = processChildren(childData);
        } else {
          foundParent = processChildren(childData);
        }
        console.log(childData);
      });

    });
  });
}


function processChildren(data) {
  console.log("processChildren");

  var found = false

  //Loop through kids
  Object.keys(data).forEach(function(key) {
    var newObj = data[key];

    //Verify key url
    console.log(newObj["key"]);
    var url = newObj["key"];
    var found = found || checkImage(url);

  });

  return found;
}

function checkImage(url) {
  return false;
}


module.exports = router;
