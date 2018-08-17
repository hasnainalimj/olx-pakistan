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

var catagoriesArray = ['Mobiles', 'Bikes', 'Cars', 'Electronics', 'Furniture', 'Jobs', 'Animals', 'Homes', 'Books', 'Kids', 'Services', 'Fashion'];
var currentUser = localStorage.getItem('user_id');
var main_div = document.getElementById('main-div');
let resFound = false;

for(var k=0; k<catagoriesArray.length; k++){
    firebase.firestore().collection(catagoriesArray[k]).where('adAdderId','==',localStorage.getItem('user_id')).get().then( doc => {
      doc.forEach(element => {
        /*console.log(element.data().adAdderId);
        console.log(element.data().adTitle);*/
        resFound = true;
        document.getElementById('loading').style.display = "none";

        var container = document.createElement('div');
        container.setAttribute('class', 'container');
        main_div.appendChild(container);

        var ad_div = document.createElement('div');
        ad_div.setAttribute('class', 'ad-div');
        container.appendChild(ad_div);

        var remove = document.createElement('i');
        remove.setAttribute('class','fa fa-trash fa-2x star');
        remove.setAttribute('title','Delete Ad');
        remove.setAttribute('id','thestar');
        remove.addEventListener('click', (eventOne,eventTwo) => {
          deleteMyAd(eventOne,eventTwo,element.id,element.data().adCatagory);
        });
        ad_div.appendChild(remove);

        var img_container = document.createElement('div');
        img_container.setAttribute('class', 'img-container');
        img_container.addEventListener('click', (eventOne,eventTwo) => {
          gotoDetailPage(eventOne, eventTwo, element.id, element.data().adCatagory);
        });
        ad_div.appendChild(img_container);

        var ad_img = document.createElement('img');
        ad_img.setAttribute('class', 'ad-img');
        ad_img.setAttribute('src', element.data().imgs[0]);
        img_container.appendChild(ad_img);

        var ad_details = document.createElement('div');
        ad_details.addEventListener('click', (eventOne,eventTwo) => {
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
function deleteMyAd(eventOne,eventTwo,ad_id,cat){

   /* console.log(ad_id);
    console.log(cat)*/

	firebase.firestore().collection(cat).doc(ad_id).delete().then(res => {
    alert("Ad Deleted Successfully");		
    history.go();
	})
   	
   	document.getElementById('main-div').innerHTML = "";

   	for(var l=0; l<catagoriesArray.length; l++){
    firebase.firestore().collection(catagoriesArray[l]).where('adAdderId','==',localStorage.getItem('user_id')).get().then( doc => {
      doc.forEach(element => {
        /*console.log(element.data().adAdderId);
        console.log(element.data().adTitle);*/
        
        var container = document.createElement('div');
        container.setAttribute('class', 'container');
        main_div.appendChild(container);

        var ad_div = document.createElement('div');
        ad_div.setAttribute('class', 'ad-div');
        container.appendChild(ad_div);

        var remove = document.createElement('i');
        remove.setAttribute('class','fa fa-trash fa-2x star');
        remove.setAttribute('title','Delete Ad');
        remove.setAttribute('id','thestar');
        remove.addEventListener('click', (eventOne,eventTwo) => {
          deleteMyAd(eventOne,eventTwo,element.id,element.data().adCatagory);
        });
        ad_div.appendChild(remove);

        var img_container = document.createElement('div');
        img_container.setAttribute('class', 'img-container');
        img_container.addEventListener('click', (eventOne,eventTwo) => {
          gotoDetailPage(eventOne, eventTwo, element.id, element.data().adCatagory);
        });
        ad_div.appendChild(img_container);

        var ad_img = document.createElement('img');
        ad_img.setAttribute('class', 'ad-img');
        ad_img.setAttribute('src', element.data().imgs[0]);
        img_container.appendChild(ad_img);

        var ad_details = document.createElement('div');
        ad_details.addEventListener('click', (eventOne,eventTwo) => {
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

//Goto Detail + Stored Values in Local Storage
function gotoDetailPage(eventOne, eventTwo, ad_id, cat) {

   firebase.firestore().collection(cat).doc(ad_id).get().then(docs => {
     //console.log(docs.data().adCatagory);
   })
 

   localStorage.setItem('ad_id', ad_id);
   localStorage.setItem('ad_cat', cat);

  window.location.href = "../catagories_pages/detail_page/detailpage.html";
}

//Hide Loader And Show Message
setTimeout(function(){
  if(resFound == false){
    document.getElementById('loading').style.display = 'none';
    let text = document.createElement('h6');
    text.setAttribute('class','recordFound');
    text.innerHTML = "Ads Not Found";
    main_div.appendChild(text);
  }
},6000);