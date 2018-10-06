var express = require("express");
var firebase = require("firebase");
var request = require('request');
var axios = require('axios')
var router = express.Router();

var subscriptionKey = "0001beb2e84743f88ebb524de2421c20";
var uriBase = "https://eastus.api.cognitive.microsoft.com/face/v1.0/detect"

function login(){
  var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes":
                "age,emotion",
        };

  var urlL = Object.keys(params).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
  }).join('&');

  axios({
    method: 'post',
    url: uriBase+urlL,
    headers:  {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": subscriptionKey
    },
    data: '{"url": ' + '"' + 'http://img.timeinc.net/time/photoessays/2008/people_who_mattered/obama_main_1216.jpg' + '"}'
  }).then(function(response) {
    console.log(response)
  })
}

/**var options = {
  url: uriBase + "?" + urlL,
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": subscriptionKey
  },
  data: '{"url": ' + '"' + 'http://img.timeinc.net/time/photoessays/2008/people_who_mattered/obama_main_1216.jpg' + '"}'
};
**/

//
// request.post(options, function optionalCallback(err, httpResponse, body) {
//   if (err) {
//     return console.error('upload failed:', err);
//   }
//   console.log(options)
//   console.log('Upload successful!  Server responded with:', body);
// });



/* GET home page. */
router.get("/", function(req, res, next) {
  // addKidImage();
  loginUser();
  // addNewKid();
  res.render("index", { title: "Penis" });

  var storageRef = firebase.storage().ref();

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

// Add child that doesnt exist
function addNewKid() {
  console.log("Adding New Kid");
  var newId = makeId();
  var childRef = firebase.database().ref('child/' + newId + '/key');

  childRef.set("pornhubkey.com");

}

// Add parent that doesnt exist
function addNewParent() {
  console.log("Adding New Parent");
  // var newId = makeId();
  // var childRef = firebase.database().ref('child/' + newId + '/key');

  // childRef.set("pornhubkey.com");

}

// Add images for that kid
function addKidImage(id) {
  console.log("Adding Kid");
  var childRef = firebase.database().ref('child/' + 'Dnria' + '/images').push();

  var date = new Date();
  var time = date.valueOf();

  var obj = {
    date: time,
    url: "www.pornhub.com"
  }

  childRef.set(obj);
}




function checkAge(image) {
  return 30;
}



function loginUser(currentImage) {
  database.on('value', function(snapshot) {
    database.once('value', function(snapshot) {

      var foundChild = false;
      var foundParent = false;
      var age = checkAge(currentImage);

      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        if (childKey == "child") {
          foundChild = processData(childData);
        } else {
          foundParent = processData(childData);
        }
        console.log(childData);
      });

      if (foundChild == false) {

        // no child or parent found so add new person
        if (foundParent == false) {
          if (age > 20) {
            addNewParent();
          } else {
            addNewKid();
          }
        // found parent
        } else {
          goToAdminPage();
        }
      } else {
        // Add child images for that child
        addKidImage(foundChild);
        goToKidPage();
      }

    });
  });
}



function processData(data) {
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

function goToAdminPage() {
  console.log("Go to admin page");
}

function goToKidPage() {
  console.log("Go to kid page");
}

module.exports = router;
