// Initialize Firebase
var config = {
  apiKey: "AIzaSyC31jcopTH0d62jHQa0QTg3GoUi0IJ2sTc",
  authDomain: "olx-bechdy-pak.firebaseapp.com",
  databaseURL: "https://olx-bechdy-pak.firebaseio.com",
  projectId: "olx-bechdy-pak",
  storageBucket: "olx-bechdy-pak.appspot.com",
  messagingSenderId: "912803592022"
};
firebase.initializeApp(config);

//Navigate to Submit an Ad Page
function gotoSubmitAd() {
  if (localStorage.getItem('user_id')) {
    window.location.href = "../../dashboard/dashboard.html";
  }
  else {
    window.location.href = "../../login/login.html";
  }
}

//Loading Name After Login
if (localStorage.getItem('user_id')) {
  firebase.firestore().collection('users').doc(localStorage.getItem('user_id')).get().then(docs => {
    document.getElementById('showname').innerHTML = docs.data().name;
    // console.log(docs.data().name.length);
    if (docs.data().name.length >= 12) {
      document.getElementById('showname').style.fontSize = 'x-small';
      document.getElementById('showname').style.height = '40px';
    }
    else if (docs.data().name.length >= 14) {
      document.getElementById('showname').style.fontSize = 'xx-small';
      document.getElementById('showname').style.height = '40px';
    }
  })
}

//Logout
function logOut() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    localStorage.removeItem('user_id');
    console.log('Logout Successfully');
    window.location.href = "../../index.html";
  }).catch(function (error) {
    // An error happened.
    console.log(error);
  });
}

//Logout Button Visibility
if (localStorage.getItem('user_id')) {
  document.getElementById('myaccounts').style.display = "block";
}
else {
  document.getElementById('myaccounts').style.display = "none";
}

var ids = localStorage.getItem('fav_id');
var catagory = localStorage.getItem('fav_cat');

firebase.firestore().collection('Faviorites').doc(localStorage.getItem('user_id')).collection(catagory).doc(ids).get().then(docs => {

  document.getElementById('loading').style.display = "none";

  var reciever_id = localStorage.setItem('reciever_id', docs.data().adAdderId);

  var ad_container = document.getElementById('ad-container');

  var ad_title = document.createElement('h1');
  ad_title.innerHTML = docs.data().adTitle;
  ad_title.setAttribute('class', 'ads-titles');
  ad_container.appendChild(ad_title);

  var ad_city = document.createElement('p');
  ad_city.innerHTML = "City : ";
  ad_city.setAttribute('class', 'ads-city');
  ad_container.appendChild(ad_city);

  var here_city = document.createElement('span');
  here_city.innerHTML = docs.data().city;
  here_city.setAttribute('class', 'here-city');
  ad_city.appendChild(here_city);

  var ad_id = document.createElement('p');
  ad_id.innerHTML = "Ad Id : ";
  ad_id.setAttribute('class', 'ads-id');
  ad_container.appendChild(ad_id);

  var here_id = document.createElement('span');
  here_id.innerHTML = docs.id;
  here_id.setAttribute('class', 'here-id');
  ad_id.appendChild(here_id);

  var ad_date = document.createElement('p');
  ad_date.innerHTML = "Added At : ";
  ad_date.setAttribute('class', 'ads-date');
  ad_container.appendChild(ad_date);

  var here_date = document.createElement('span');
  here_date.innerHTML = docs.data().date;
  here_date.setAttribute('class', 'here-date');
  ad_date.appendChild(here_date);

  var breakOne = document.createElement('br');
  ad_container.appendChild(breakOne);

  var breakTwo = document.createElement('br');
  ad_container.appendChild(breakTwo);

  var breakThree = document.createElement('br');
  ad_container.appendChild(breakThree);

  for (var k = 0; k < docs.data().imgs.length; k++) {
    var ad_image = document.createElement('img');
    ad_image.setAttribute('src', docs.data().imgs[k]);
    ad_image.setAttribute('class', 'ads-images');
    ad_container.appendChild(ad_image);
  }

  var breakFour = document.createElement('br');
  ad_container.appendChild(breakFour);

  var breakFive = document.createElement('br');
  ad_container.appendChild(breakFive);

  var ad_catagory = document.createElement('p');
  ad_catagory.innerHTML = "Catagory : ";
  ad_catagory.setAttribute('class', 'ads-catagory');
  ad_container.appendChild(ad_catagory);

  var here_catagory = document.createElement('span');
  here_catagory.innerHTML = docs.data().adCatagory;
  here_catagory.setAttribute('collection', 'here-catagory');
  ad_catagory.appendChild(here_catagory);

  var ad_description = document.createElement('div');
  ad_description.innerHTML = docs.data().adDescription;
  ad_description.setAttribute('class', 'ads-description');
  ad_container.appendChild(ad_description);

  var breakSix = document.createElement('br');
  ad_container.appendChild(breakSix);

  var adder_details = document.createElement('div');
  adder_details.setAttribute('class', 'adder-details');
  ad_container.appendChild(adder_details);

  var adder_name = document.createElement('h5');
  adder_name.innerHTML = docs.data().name;
  adder_name.setAttribute('class', 'adder-name');
  adder_details.appendChild(adder_name);

  var adder_phone = document.createElement('h5');
  adder_phone.innerHTML = docs.data().phone;
  adder_phone.setAttribute('class', 'adder-phone');
  adder_details.appendChild(adder_phone);

  var adder_price = document.createElement('h3');
  adder_price.innerHTML = "Rs : ";
  adder_price.setAttribute('class', 'adder-price');
  adder_details.appendChild(adder_price);

  var here_price = document.createElement('span');
  here_price.innerHTML = docs.data().adPrice;
  here_price.setAttribute('class', 'here-price');
  adder_price.appendChild(here_price);

  var user = localStorage.getItem('user_id');
  var reciever = localStorage.getItem('reciever_id');

  // if (user !== reciever) {

  //   var btnChat = document.createElement('button');
  //   btnChat.innerHTML = "Send Message";
  //   btnChat.setAttribute('class', 'btn btn-warning btnSendMessage');
  //   btnChat.setAttribute('id', 'btnChatting');
  //   btnChat.setAttribute('onclick', 'btnChat(event)');
  //   ad_container.appendChild(btnChat);

  // }

})

//Creating Room

//Chat Button
function btnChat(event) {
  event.preventDefault();

  if (localStorage.getItem('user_id')) {

    let date = new Date();
    let ad_id = localStorage.getItem('ad_id');
    let reciever_id = localStorage.getItem('reciever_id');
    let currentUser = localStorage.getItem('user_id');
    let times = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    let chatExist = false;

    firebase.firestore().collection('room').where('users.' + currentUser, '==', true).where('users.' + reciever_id, '==', true).get().then(resp => {
      resp.forEach(doc => {
        console.log(doc.id);
        console.log(doc.data());

        localStorage.setItem('room_id', doc.id);

        if (ad_id == doc.data().adId) {
          console.log("Matched");
          chatExist = true;
          window.location.href = "sendmessage/sendmessage.html";
        }
      })
      if (chatExist == false) {
        firebase.firestore().collection('room').add({
          createdAt: times,
          users: {
            [currentUser]: true,
            [reciever_id]: true
          },
          adId: ad_id,
          currentU: currentUser,
          recieverU: reciever_id

        }).then(res => {
          console.log(res.id);
          localStorage.setItem('room_id', res.id);
          window.location.href = "sendmessage/sendmessage.html";
        }).catch(e => {
          console.log(e)
        })
      }
    })
  }
  else {
    window.location.href = "../../login/login.html";
  }
}