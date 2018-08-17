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
    window.location.href = "../dashboard/dashboard.html";
  }
  else {
    window.location.href = "../login/login.html";
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

//Logout Button Visibility
if (localStorage.getItem('user_id')) {
  document.getElementById('myaccounts').style.display = "block";
}
else {
  document.getElementById('myaccounts').style.display = "none";
}

//Logout
function logOut() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    localStorage.removeItem('user_id');
    console.log('Logout Successfully');
    window.location.href = "../index.html";
  }).catch(function (error) {
    // An error happened.
    console.log(error);
  });
}

//Getting Ads
var main_div = document.getElementById('main-div');
let resFound = false;

firebase.firestore().collection("Books").get()
  .then(function (doc) {
    doc.forEach(element => {
      document.getElementById('loading').style.display = "none";
      resFound = true;
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

let searchingFlag = false;

//Searching
function btnSearch() {

  document.getElementById('btnSearch').innerHTML = "";

  //Getting Value
  var txtSearch = document.getElementById('txtSearch').value;
  var main_div = document.getElementById('main-div');
  main_div.innerHTML = "";
  let searchBtn = document.getElementById('btnSearch');
  var loader = document.createElement('img');
  loader.setAttribute('src', '../assets/loader.gif');
  loader.setAttribute('class', 'loader');
  loader.setAttribute('id', 'loaders');
  searchBtn.appendChild(loader);

  firebase.firestore().collection("Books").where('adPrice', '==', txtSearch).get()
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

  window.location.href = "detail_page/detailpage.html";
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
    })
  }
  else {
    window.location.href = "login/login.html";
  }
}

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