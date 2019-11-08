// Initialize Firebase
var config = {
};
firebase.initializeApp(config);

//Navigate to Submit an Ad Page
function gotoSubmitAd() {
  if (localStorage.getItem('user_id')) {
    window.location.href = "dashboard/dashboard.html";
  }
  else {
    window.location.href = "login/login.html";
  }
}

//Logout Button Visibility
if (localStorage.getItem('user_id')) {
  document.getElementById('myaccounts').style.display = "block";
}
else {
  document.getElementById('myaccounts').style.display = "none";
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
    window.location.href = "index.html";
  }).catch(function (error) {
    // An error happened.
    console.log(error);
  });
}

//Getting All Types of Ads
var catagoriesArray = ['Mobiles', 'Bikes', 'Cars', 'Electronics', 'Furniture', 'Jobs', 'Animals', 'Homes', 'Books', 'Kids', 'Services', 'Fashion'];
var main_div = document.getElementById('main-div');
let resFound = false;

for (var i = 0; i < catagoriesArray.length; i++) {
  firebase.firestore().collection(catagoriesArray[i]).get()
    .then(function (doc) {
      doc.forEach(element => {
        //console.log(element.data());
        //console.log(element.id);
        resFound = true;
        document.getElementById('loading').style.display = "none";

        var container = document.createElement('div');
        container.setAttribute('class', 'container');
        main_div.appendChild(container);

        var ad_div = document.createElement('div');
        /*ad_div.addEventListener('click', (eventOne,eventTwo) => {
          gotoDetailPage(eventOne, eventTwo, element.id, element.data().adCatagory);
        })*/
        ad_div.setAttribute('class', 'ad-div');
        container.appendChild(ad_div);

        var heart = document.createElement('i');
        heart.setAttribute('class', 'fa fa-heart fa-2x star');
        heart.setAttribute('title', 'Add To Faviorites');
        heart.setAttribute('id', 'thestar')
        heart.addEventListener('click', (eventOne, eventTwo, eventThree, eventFour, eventFive, eventSix, eventSeven, eventEight, eventNine, eventTen, eventEleven) => {
          addtoFav(eventOne, eventTwo, eventThree, eventFour, eventFive, eventSix, eventSeven, eventEight, eventNine, eventTen, eventEleven, element.id, element.data().imgs, element.data().adTitle, element.data().adCatagory, element.data().city, element.data().adPrice, element.data().date, element.data().adAdderId, element.data().adDescription, element.data().name, element.data().phone);
        });
        ad_div.appendChild(heart);

        var img_container = document.createElement('div');
        img_container.setAttribute('class', 'img-container');
        img_container.addEventListener('click', (eventOne, eventTwo) => {
          gotoDetailPage(eventOne, eventTwo, element.id, element.data().adCatagory);
        });
        ad_div.appendChild(img_container);

        var ad_img = document.createElement('img');
        ad_img.setAttribute('class', 'ad-img');
        ad_img.setAttribute('src', element.data().imgs[0]);
        img_container.appendChild(ad_img);

        var ad_details = document.createElement('div');
        ad_details.addEventListener('click', (eventOne, eventTwo) => {
          gotoDetailPage(eventOne, eventTwo, element.id, element.data().adCatagory);
        });
        ad_details.setAttribute('class', 'ad-details');
        ad_div.appendChild(ad_details);

        var ad_title = document.createElement('h5');
        ad_title.setAttribute('class', 'ad-title');
        ad_title.innerHTML = element.data().adTitle;
        ad_details.appendChild(ad_title);

        /*var ad_description = document.createElement('h6');
        ad_description.setAttribute('class', 'ad-description');
        ad_description.innerHTML = element.data().adDescription;
        ad_details.appendChild(ad_description);*/

        var ad_catagory = document.createElement('h6');
        ad_catagory.setAttribute('class', 'ad-catagory');
        ad_catagory.innerHTML = element.data().adCatagory;
        ad_details.appendChild(ad_catagory);

        var ad_city = document.createElement('h6');
        ad_city.setAttribute('class', 'ad-city');
        ad_city.innerHTML = element.data().city;
        ad_details.appendChild(ad_city);

        var ad_price = document.createElement('h4');
        ad_price.setAttribute('class', 'ad-price');
        ad_price.innerHTML = "Rs : " + element.data().adPrice;
        ad_details.appendChild(ad_price);

        var ad_date = document.createElement('h6');
        ad_date.setAttribute('class', 'ad-date');
        ad_date.innerHTML = element.data().date;
        ad_details.appendChild(ad_date);

        var breakTag = document.createElement('br');
        main_div.appendChild(breakTag);
      });
    })
}

//Navigate to Mobile Pages
function gotoMobiles() {
  window.location.href = "catagories_pages/mobiles.html";
}

//Navigate to Mobile Pages
function gotoBikes() {
  window.location.href = "catagories_pages/bikes.html";
}

//Navigate to Mobile Pages
function gotoCars() {
  window.location.href = "catagories_pages/cars.html";
}

//Navigate to Mobile Pages
function gotoElectronics() {
  window.location.href = "catagories_pages/electronics.html";
}

//Navigate to Mobile Pages
function gotoServices() {
  window.location.href = "catagories_pages/services.html";
}

//Navigate to Mobile Pages
function gotoHomes() {
  window.location.href = "catagories_pages/homes.html";
}

//Navigate to Mobile Pages
function gotoJobs() {
  window.location.href = "catagories_pages/jobs.html";
}

//Navigate to Mobile Pages
function gotoFurnitures() {
  window.location.href = "catagories_pages/furnitures.html";
}
//Navigate to Mobile Pages
function gotoKids() {
  window.location.href = "catagories_pages/kids.html";
}

//Navigate to Mobile Pages
function gotoFashions() {
  window.location.href = "catagories_pages/fashions.html";
}

//Navigate to Mobile Pages
function gotoBooks() {
  window.location.href = "catagories_pages/books.html";
}

//Navigate to Mobile Pages
function gotoAnimals() {
  window.location.href = "catagories_pages/animals.html";
}

let searchingFlag = false;

//Search By Catagory
function btnSearch() {

  document.getElementById('btnSearch').innerHTML = "";

  //Getting Search Bar Value
  var txtSearch = document.getElementById('txtSearch').value;
  var main_div = document.getElementById('main-div');
  main_div.innerHTML = "";
  let searchBtn = document.getElementById('btnSearch');
  var loader = document.createElement('img');
  loader.setAttribute('src', 'assets/loader.gif');
  loader.setAttribute('class', 'loader');
  loader.setAttribute('id', 'loaders');
  searchBtn.appendChild(loader);

  firebase.firestore().collection(txtSearch).get()
    .then(function (doc) {
      searches();
      doc.forEach(element => {
        searchingFlag = true;
        document.getElementById('loaders').style.display = "none";
        document.getElementById('btnSearch').innerHTML = "Search";
        //console.log(element.data());
        //console.log(element.id);
        var container = document.createElement('div');
        container.setAttribute('class', 'container');
        main_div.appendChild(container);

        var ad_div = document.createElement('div');
        /*ad_div.addEventListener('click', (eventOne,eventTwo) => {
          gotoDetailPage(eventOne, eventTwo, element.id, element.data().adCatagory);
        })*/
        ad_div.setAttribute('class', 'ad-div');
        container.appendChild(ad_div);

        var heart = document.createElement('i');
        heart.setAttribute('class', 'fa fa-heart fa-2x star');
        heart.setAttribute('title', 'Add To Faviorites');
        heart.setAttribute('id', 'thestar')
        heart.addEventListener('click', (eventOne, eventTwo, eventThree, eventFour, eventFive, eventSix, eventSeven, eventEight, eventNine, eventTen, eventEleven) => {
          addtoFav(eventOne, eventTwo, eventThree, eventFour, eventFive, eventSix, eventSeven, eventEight, eventNine, eventTen, eventEleven, element.id, element.data().imgs, element.data().adTitle, element.data().adCatagory, element.data().city, element.data().adPrice, element.data().date, element.data().adAdderId, element.data().adDescription, element.data().name, element.data().phone);
        });
        ad_div.appendChild(heart);

        var img_container = document.createElement('div');
        img_container.setAttribute('class', 'img-container');
        img_container.addEventListener('click', (eventOne, eventTwo) => {
          gotoDetailPage(eventOne, eventTwo, element.id, element.data().adCatagory);
        });
        ad_div.appendChild(img_container);

        var ad_img = document.createElement('img');
        ad_img.setAttribute('class', 'ad-img');
        ad_img.setAttribute('src', element.data().imgs[0]);
        img_container.appendChild(ad_img);

        var ad_details = document.createElement('div');
        ad_details.addEventListener('click', (eventOne, eventTwo) => {
          gotoDetailPage(eventOne, eventTwo, element.id, element.data().adCatagory);
        });
        ad_details.setAttribute('class', 'ad-details');
        ad_div.appendChild(ad_details);

        var ad_title = document.createElement('h5');
        ad_title.setAttribute('class', 'ad-title');
        ad_title.innerHTML = element.data().adTitle;
        ad_details.appendChild(ad_title);

        /*var ad_description = document.createElement('h6');
        ad_description.setAttribute('class', 'ad-description');
        ad_description.innerHTML = element.data().adDescription;
        ad_details.appendChild(ad_description);*/

        var ad_catagory = document.createElement('h6');
        ad_catagory.setAttribute('class', 'ad-catagory');
        ad_catagory.innerHTML = element.data().adCatagory;
        ad_details.appendChild(ad_catagory);

        var ad_city = document.createElement('h6');
        ad_city.setAttribute('class', 'ad-city');
        ad_city.innerHTML = element.data().city;
        ad_details.appendChild(ad_city);

        var ad_price = document.createElement('h4');
        ad_price.setAttribute('class', 'ad-price');
        ad_price.innerHTML = "Rs : " + element.data().adPrice;
        ad_details.appendChild(ad_price);

        var ad_date = document.createElement('h6');
        ad_date.setAttribute('class', 'ad-date');
        ad_date.innerHTML = element.data().date;
        ad_details.appendChild(ad_date);

        var breakTag = document.createElement('br');
        main_div.appendChild(breakTag);

      });

    })
}

//Goto Detail + Stored Values in Local Storage
function gotoDetailPage(eventOne, eventTwo, ad_id, cat) {

  firebase.firestore().collection(cat).doc(ad_id).get().then(docs => {
    //console.log(docs.data().adCatagory);
  })

  localStorage.setItem('ad_id', ad_id);
  localStorage.setItem('ad_cat', cat);

  window.location.href = "catagories_pages/detail_page/detailpage.html";
}

//Added To Faviorites
function addtoFav(eventOne, eventTwo, eventThree, eventFour, eventFive, eventSix, eventSeven, eventEight, eventNine, eventTen, eventEleven, ad_id, img, title, cat, city, price, date, adder_id, description, name, phone) {
  firebase.firestore().collection(cat).doc(ad_id).get().then(docs => {
    // console.log(docs.id);
  })

  if (localStorage.getItem('user_id')) {
    let favId = ad_id;
    let favImage = img;
    let favTitle = title;
    let favCatagory = cat;
    let favCity = city;
    let favPrice = price;
    let favDate = date;
    let favAdderId = adder_id;
    let favDes = description;
    let favName = name;
    let favPhone = phone;

    let currentUser = localStorage.getItem('user_id');

    firebase.firestore().collection("Faviorites").doc(currentUser).collection(favCatagory).add({
      imgs: favImage,
      adTitle: favTitle,
      adCatagory: favCatagory,
      city: favCity,
      adPrice: favPrice,
      date: favDate,
      adDescription: favDes,
      adAdderId: favAdderId,
      name: favName,
      phone: favPhone
    }).then(function () {
      alert("Added to Faviorites");
      history.go();
    })
  }
  else {
    window.location.href = "login/login.html";
  }
}

firebase.firestore().collection('messages').get().then(doc => {
  doc.forEach(elem => {
    firebase.firestore().collection('messages').doc(elem.id).collection('message')
      .where('recieverId', '==', localStorage.getItem('user_id')).where('recieverId', '==', localStorage.getItem('user_id'))
      .get().then(docs => {
        docs.forEach(elems => {
          console.log(elems.data());
        })
      })
  })
})

/*firebase.firestore().collection('messages').get().then(doc => {
  doc.forEach(elem => {
    firebase.firestore().collection('messages').doc(elem.id).collection('message')
    .where('recieverId','==',localStorage.getItem('user_id')).where('senderId','==',localStorage.getItem('user_id'))
    .get().then(docs => {
      docs.forEach(elems => {
        console.log(elems.data());
      })
    })
  })
})*/

/*firebase.firestore().collection('messages')
.where('senderId','==',localStorage.getItem('user_id'))
.get().then(doc => {
  console.log(doc)
  doc.forEach(elem => {
    console.log(elem.id);
    firebase.firestore().collection('messages').doc(elem.id).collection('message').get().then(docs => {
      docs.forEach(elems => {
        console.log(elems.data())
      })
    })
  })
})*/

/*firebase.firestore().collection('messages')
.where('senderId','==',localStorage.getItem('user_id')).where('recieverId','==',localStorage.getItem('user_id'))
.get().then(doc => {
  console.log(doc)
  doc.forEach(elem => {
    console.log(elem.id);
  })
})*/


/*for(var k=0; k<catagoriesArray.length; k++){
   firebase.firestore().collection(catagoriesArray[k]).where('adAdderId','==',localStorage.getItem('user_id')).get().then( doc => {
     doc.forEach(element => {
       console.log(element.data().adAdderId);
       console.log(element.data().adTitle);
     })
   })
 }*/

/*firebase.firestore().collection("messages").where("recieverId","==",localStorage.getItem('user_id')).get()
.then(doc => {
  doc.forEach(elem => {
    console.log("elem",elem.data())
    firebase.firestore().collection("message").get().then(docs => {
    })
  })
})*/

/* firebase.firestore().collection("messages").doc("message").where("recieverId","==",localStorage.getItem('user_id')).get()
 .then(doc => {
   doc.forEach(elem => {
     console.log(elem.data());
   })
 })*/

//Getting Token And Store in User Document

let user_id = localStorage.getItem('user_id');

if (user_id) {
  firebase.messaging().requestPermission().then(function () {
    console.log("Notification Permission Granted");
    return firebase.messaging().getToken();
  }).then(token => {
    //console.log("Token => ",token);
    firebase.firestore().collection('users').doc(user_id).update({
      token: token
    })
  }).catch(error => {
    console.log('Unable to get permission to notify.', error);
  })
}
else {
  console.log('Login Please');
}

// firebase.messaging().onMessage((payload) => {
//   // console.log('payload', payload)
// })

// //Way To Push Notification Using Fetch

// var key = 'AIzaSyBsX6aBs9V5Cq-13VnueqInxbQ9l_s5L7M';
// var to = 'fO1dJkYBX-g:APA91bFP8ikZ6bq_TyjpUJjYs9oRkWPs0E-m5n46Z93jFEjtFUVnhVvuLILuLqjuUkSeYbGGFsNd2M-8o5PGoJqEIzPKFOK3bTx-3WaePTNV2_zKkz5DzeUPbu1eqe4MeDEP1ni-qYvc';
// var notification = {
//   'title' : 'New Message',
//   'body' : 'Hello How Are You'
// }

// fetch('https://fcm.googleapis.com/fcm/send',{
//   'method': 'POST',
//   'headers': {
//     'Authorization': 'key=' + key,
//     'Content-Type': 'application/json'
//   },
//   'body': JSON.stringify({
//     'notification': notification,
//     'to': to
//   })
// }).then(res => {
//   // console.log(res);
// }).catch(err => {
//   console.log(err);
// })

// firebase.firestore().collection('users').doc(user_id).get().then(doc => {
//   console.log('Token => ', doc.data().token)
// })

//Getting Faviorites Records and Store in Local Storage For Offline Modes
var catagoriesArray = ['Mobiles', 'Bikes', 'Cars', 'Electronics', 'Furniture', 'Jobs', 'Animals', 'Homes', 'Books', 'Kids', 'Services', 'Fashion'];
var cache = new Array();

if (localStorage.getItem('user_id')) {
  for (var a = 0; a < catagoriesArray.length; a++) {
    firebase.firestore().collection('Faviorites').doc(localStorage.getItem('user_id')).collection(catagoriesArray[a]).get()
      .then(docs => {
        docs.forEach(elems => {
          cache.push(elems.data());
        })
      })
  }
}

setTimeout(function () {
  var JSONReadyFav = JSON.stringify(cache);
  localStorage.setItem('myFavs', JSONReadyFav);
}, 5000);

var JSONParseFav = JSON.parse(localStorage.getItem('myFavs'));
//console.log(JSONParseFav);

// for (h = 0; h < JSONParseFav.length; h++) {
//   console.log(JSONParseFav[h].adTitle)
// }

//Hide Loader And Show Message
setTimeout(function () {
  if (resFound == false) {
    document.getElementById('loading').style.display = 'none';
    let text = document.createElement('h6');
    text.setAttribute('class', 'recordFound');
    text.innerHTML = "Ads Not Found";
    main_div.appendChild(text);
  }
}, 6000);

function searches() {
  setTimeout(function () {
    if (searchingFlag == false) {
      document.getElementById('loaders').style.display = "none";
      document.getElementById('btnSearch').innerHTML = "Search";
      let text = document.createElement('h6');
      text.setAttribute('class', 'recordFound');
      text.innerHTML = "Irrelevant Search";
      main_div.appendChild(text);
    }
  }, 8000);
}

// //Register Service Worker
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./firebase-messaging-sw.js').then(function(){
    console.log('Service Worker Registerd Successfully');
  })
}
