// Initialize Firebase
var config = {
};
firebase.initializeApp(config);

var catagoriesArray = ['Mobiles', 'Bikes', 'Cars', 'Electronics', 'Furniture', 'Jobs', 'Animals', 'Homes', 'Books', 'Kids', 'Services', 'Fashion'];
var currentUser = localStorage.getItem('user_id');
var main_div = document.getElementById('main-div');
var center = document.getElementById('center');
let resFound = false;
let cacheFound = false;

for (var i = 0; i < catagoriesArray.length; i++) {
  firebase.firestore().collection("Faviorites").doc(currentUser).collection(catagoriesArray[i]).get()
    .then(doc => {
      doc.forEach(element => {
        cacheFound = true;
        document.getElementById('loading').style.display = "none";

        var container = document.createElement('div');
        container.setAttribute('class', 'container');
        container.setAttribute('id', 'abc')
        main_div.appendChild(container);

        var ad_div = document.createElement('div');
        ad_div.setAttribute('class', 'ad-div');
        container.appendChild(ad_div);

        var remove = document.createElement('i');
        remove.setAttribute('class', 'fa fa-trash fa-2x star');
        remove.setAttribute('title', 'Remove from Faviorites');
        remove.setAttribute('id', 'thestar');
        remove.addEventListener('click', (eventOne, eventTwo) => {
          removefromFav(eventOne, eventTwo, element.id, element.data().adCatagory);
        });
        ad_div.appendChild(remove);

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
      })
    })
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

//Navigate to Submit an Ad Page
function gotoSubmitAd() {
  if (localStorage.getItem('user_id')) {
    window.location.href = "../dashboard/dashboard.html";
  }
  else {
    window.location.href = "../login/login.html";
  }
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

//Remove From Faviorites
function removefromFav(eventOne, eventTwo, ad_id, cat) {
  resFound = false;
  firebase.firestore().collection('Faviorites').doc(currentUser).collection(cat).doc(ad_id).delete().then(res => {
    alert("Remove From Faviorites");
    history.go();
  })

  document.getElementById('main-div').innerHTML = "";

  for (var j = 0; j < catagoriesArray.length; j++) {
    firebase.firestore().collection("Faviorites").doc(currentUser).collection(catagoriesArray[j]).get()
      .then(doc => {
        doc.forEach(element => {

          resFound = true;
          document.getElementById('loading').style.display = "block";

          var container = document.createElement('div');
          container.setAttribute('class', 'container');
          main_div.appendChild(container);

          var ad_div = document.createElement('div');
          ad_div.setAttribute('class', 'ad-div');
          container.appendChild(ad_div);

          var remove = document.createElement('i');
          remove.setAttribute('class', 'fa fa-trash fa-2x star');
          remove.setAttribute('title', 'Remove from Faviorites');
          remove.setAttribute('id', 'thestar');
          remove.addEventListener('click', (eventOne, eventTwo) => {
            removefromFav(eventOne, eventTwo, element.id, element.data().adCatagory);
          });
          ad_div.appendChild(remove);

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
        })
      })
  }
}




//Fetching Offline Data
// setTimeout(() => {
//   if (cacheFound = false) {

//   }
// }, 5000);



// if(navigator.onLine){ 
//   console.log('No Connection')
//   var JSONParseFav = JSON.parse(localStorage.getItem('myFavs'));

// for(h=0; h<JSONParseFav.length; h++){
//   //console.log(JSONParseFav[h].adTitle)
//   var container = document.createElement('div');
//           container.setAttribute('class', 'container');
//           main_div.appendChild(container);

//           var ad_div = document.createElement('div');
//           ad_div.setAttribute('class', 'ad-div');
//           container.appendChild(ad_div);

//           // var remove = document.createElement('i');
//           // remove.setAttribute('class', 'fa fa-trash fa-2x star');
//           // remove.setAttribute('title', 'Remove from Faviorites');
//           // remove.setAttribute('id', 'thestar');
//           // remove.addEventListener('click', (eventOne, eventTwo) => {
//           //   removefromFav(eventOne, eventTwo, element.id, element.data().adCatagory);
//           // });
//           // ad_div.appendChild(remove);

//           var img_container = document.createElement('div');
//           img_container.setAttribute('class', 'img-container');
//           /*img_container.addEventListener('click', (eventOne,eventTwo) => {
//             gotoDetailPage(eventOne, eventTwo, element.id, element.data().adCatagory);
//           });*/
//           ad_div.appendChild(img_container);

//           var ad_img = document.createElement('img');
//           ad_img.setAttribute('class', 'ad-img');
//           ad_img.setAttribute('src', JSONParseFav[h].imgs[0]);
//           img_container.appendChild(ad_img);

//           var ad_details = document.createElement('div');
//           /*ad_details.addEventListener('click', (eventOne,eventTwo) => {
//             gotoDetailPage(eventOne, eventTwo, element.id, element.data().adCatagory);
//           });*/
//           ad_details.setAttribute('class', 'ad-details');
//           ad_div.appendChild(ad_details);

//           var ad_title = document.createElement('h5');
//           ad_title.setAttribute('class', 'ad-title');
//           ad_title.innerHTML = JSONParseFav[h].adTitle;
//           ad_details.appendChild(ad_title);

//           var ad_catagory = document.createElement('h6');
//           ad_catagory.setAttribute('class', 'ad-catagory');
//           ad_catagory.innerHTML = JSONParseFav[h].adCatagory;
//           ad_details.appendChild(ad_catagory);

//           var ad_city = document.createElement('h6');
//           ad_city.setAttribute('class', 'ad-city');
//           ad_city.innerHTML = JSONParseFav[h].city;
//           ad_details.appendChild(ad_city);

//           var ad_price = document.createElement('h4');
//           ad_price.setAttribute('class', 'ad-price');
//           ad_price.innerHTML = "Rs : " + JSONParseFav[h].adPrice;
//           ad_details.appendChild(ad_price);

//           var ad_date = document.createElement('h6');
//           ad_date.setAttribute('class', 'ad-date');
//           ad_date.innerHTML = JSONParseFav[h].date;
//           ad_details.appendChild(ad_date);

//           var breakTag = document.createElement('br');
//           main_div.appendChild(breakTag);
// }
// }
// else{
// //Remove From Faviorites
// function removefromFav(eventOne, eventTwo, ad_id, cat) {

//   firebase.firestore().collection('Faviorites').doc(currentUser).collection(cat).doc(ad_id).delete().then(res => {
//     alert("Remove From Faviorites");
//   })

//   document.getElementById('main-div').innerHTML = "";

//   for (var j = 0; j < catagoriesArray.length; j++) {
//     firebase.firestore().collection("Faviorites").doc(currentUser).collection(catagoriesArray[j]).get()
//       .then(doc => {
//         doc.forEach(element => {
//           var container = document.createElement('div');
//           container.setAttribute('class', 'container');
//           main_div.appendChild(container);

//           var ad_div = document.createElement('div');
//           ad_div.setAttribute('class', 'ad-div');
//           container.appendChild(ad_div);

//           var remove = document.createElement('i');
//           remove.setAttribute('class', 'fa fa-trash fa-2x star');
//           remove.setAttribute('title', 'Remove from Faviorites');
//           remove.setAttribute('id', 'thestar');
//           remove.addEventListener('click', (eventOne, eventTwo) => {
//             removefromFav(eventOne, eventTwo, element.id, element.data().adCatagory);
//           });
//           ad_div.appendChild(remove);

//           var img_container = document.createElement('div');
//           img_container.setAttribute('class', 'img-container');
//           /*img_container.addEventListener('click', (eventOne,eventTwo) => {
//             gotoDetailPage(eventOne, eventTwo, element.id, element.data().adCatagory);
//           });*/
//           ad_div.appendChild(img_container);

//           var ad_img = document.createElement('img');
//           ad_img.setAttribute('class', 'ad-img');
//           ad_img.setAttribute('src', element.data().imgs[0]);
//           img_container.appendChild(ad_img);

//           var ad_details = document.createElement('div');
//           /*ad_details.addEventListener('click', (eventOne,eventTwo) => {
//             gotoDetailPage(eventOne, eventTwo, element.id, element.data().adCatagory);
//           });*/
//           ad_details.setAttribute('class', 'ad-details');
//           ad_div.appendChild(ad_details);

//           var ad_title = document.createElement('h5');
//           ad_title.setAttribute('class', 'ad-title');
//           ad_title.innerHTML = element.data().adTitle;
//           ad_details.appendChild(ad_title);

//           var ad_catagory = document.createElement('h6');
//           ad_catagory.setAttribute('class', 'ad-catagory');
//           ad_catagory.innerHTML = element.data().adCatagory;
//           ad_details.appendChild(ad_catagory);

//           var ad_city = document.createElement('h6');
//           ad_city.setAttribute('class', 'ad-city');
//           ad_city.innerHTML = element.data().city;
//           ad_details.appendChild(ad_city);

//           var ad_price = document.createElement('h4');
//           ad_price.setAttribute('class', 'ad-price');
//           ad_price.innerHTML = "Rs : " + element.data().adPrice;
//           ad_details.appendChild(ad_price);

//           var ad_date = document.createElement('h6');
//           ad_date.setAttribute('class', 'ad-date');
//           ad_date.innerHTML = element.data().date;
//           ad_details.appendChild(ad_date);

//           var breakTag = document.createElement('br');
//           main_div.appendChild(breakTag);
//         })
//       })
//   }
// }
// }

//Goto Detail + Stored Values in Local Storage
function gotoDetailPage(eventOne, eventTwo, ad_id, cat) {

  firebase.firestore().collection(cat).doc(ad_id).get().then(docs => {
    //console.log(docs.data().adCatagory);
  })

  localStorage.setItem('fav_id', ad_id);
  localStorage.setItem('fav_cat', cat);

  // console.log(ad_id);
  // console.log(cat);

  window.location.href = "fav_detail/detailpage.html";
}

//Hide Loader And Show Message
setTimeout(function () {
  if (cacheFound == false) {
    document.getElementById('loading').style.display = 'none';
    resFound = true;
    // let text = document.createElement('h6');
    // text.setAttribute('class', 'recordFound');
    // text.innerHTML = "Ads Not Found";
    // main_div.appendChild(text);
    var JSONParseFav = JSON.parse(localStorage.getItem('myFavs'));

    for (h = 0; h < JSONParseFav.length; h++) {
      //console.log(JSONParseFav[h].adTitle)
      var container = document.createElement('div');
      container.setAttribute('class', 'container');
      main_div.appendChild(container);

      var ad_div = document.createElement('div');
      ad_div.setAttribute('class', 'ad-div');
      container.appendChild(ad_div);

      // var remove = document.createElement('i');
      // remove.setAttribute('class', 'fa fa-trash fa-2x star');
      // remove.setAttribute('title', 'Remove from Faviorites');
      // remove.setAttribute('id', 'thestar');
      // remove.addEventListener('click', (eventOne, eventTwo) => {
      //   removefromFav(eventOne, eventTwo, element.id, element.data().adCatagory);
      // });
      // ad_div.appendChild(remove);

      var img_container = document.createElement('div');
      img_container.setAttribute('class', 'img-container');
      /*img_container.addEventListener('click', (eventOne,eventTwo) => {
        gotoDetailPage(eventOne, eventTwo, element.id, element.data().adCatagory);
      });*/
      ad_div.appendChild(img_container);

      var ad_img = document.createElement('img');
      ad_img.setAttribute('class', 'ad-img');
      ad_img.setAttribute('src','../assets/dummy.jpg');
      img_container.appendChild(ad_img);

      var ad_details = document.createElement('div');
      /*ad_details.addEventListener('click', (eventOne,eventTwo) => {
        gotoDetailPage(eventOne, eventTwo, element.id, element.data().adCatagory);
      });*/
      ad_details.setAttribute('class', 'ad-details');
      ad_div.appendChild(ad_details);

      var ad_title = document.createElement('h5');
      ad_title.setAttribute('class', 'ad-title');
      ad_title.innerHTML = JSONParseFav[h].adTitle;
      ad_details.appendChild(ad_title);

      var ad_catagory = document.createElement('h6');
      ad_catagory.setAttribute('class', 'ad-catagory');
      ad_catagory.innerHTML = JSONParseFav[h].adCatagory;
      ad_details.appendChild(ad_catagory);

      var ad_city = document.createElement('h6');
      ad_city.setAttribute('class', 'ad-city');
      ad_city.innerHTML = JSONParseFav[h].city;
      ad_details.appendChild(ad_city);

      var ad_price = document.createElement('h4');
      ad_price.setAttribute('class', 'ad-price');
      ad_price.innerHTML = "Rs : " + JSONParseFav[h].adPrice;
      ad_details.appendChild(ad_price);

      var ad_date = document.createElement('h6');
      ad_date.setAttribute('class', 'ad-date');
      ad_date.innerHTML = JSONParseFav[h].date;
      ad_details.appendChild(ad_date);

      var breakTag = document.createElement('br');
      main_div.appendChild(breakTag);
    }
  }
}, 3000);

// setTimeout(function(){
//   if(resFound == false){
//     document.getElementById('loading').style.display = 'none';
//     let text = document.createElement('h6');
//     text.setAttribute('class', 'recordFound');
//     text.innerHTML = "Ads Not Found";
//     main_div.appendChild(text);
//   }
// },8000)

// console.log(resFound)
// console.log(cacheFound)
