// Initialize Firebase
var config = {
};
firebase.initializeApp(config);

//Navigate to Home Page
function gotoHome() {
  window.location.href = "../index.html";
}

let currentUser;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    currentUser = user.uid;
  }
})

var user_id = localStorage.getItem('user_id');

firebase.firestore().collection('users').doc(user_id).get().then(doc => {
  console.log(doc.data());
  var txtName = document.getElementById('txtName').value = doc.data().name;
  var txtPhone = document.getElementById('txtPhone').value = doc.data().phone;
  var txtCity = document.getElementById('txtCity').value = doc.data().city;
})

//Submit Ad
function sumbitAnAdd(event) {
  event.preventDefault();

  document.getElementById('btnAdSumbit').innerHTML = "";

  //Getting Values
  var txtAdTitle = document.getElementById('txtAdTitle').value;
  var selectCatagory = document.getElementById('selectCatagory').value;
  var txtAdDescription = document.getElementById('txtAdDescription').value;
  var selectFile = document.getElementById('selectFile').files;
  var txtPhone = document.getElementById('txtPhone').value;
  var txtCity = document.getElementById('txtCity').value;
  var txtName = document.getElementById('txtName').value;
  var txtPrice = document.getElementById('txtPrice').value;
  var btnAdSumbit = document.getElementById('btnAdSumbit');
  var loader = document.createElement('img');
  loader.setAttribute('src', '../assets/loader.gif');
  loader.setAttribute('class', 'loader');
  loader.setAttribute('id', 'loaders')
  btnAdSumbit.appendChild(loader);

  let promises = uploadPics(selectFile);

  let urls = [];

  Promise.all(promises).then(function (res) {
    var allvalues = {
      adTitle: txtAdTitle,
      adCatagory: selectCatagory,
      adDescription: txtAdDescription,
      adPrice: txtPrice,
      name: txtName,
      phone: txtPhone,
      city: txtCity,
      adAdderId: currentUser,
      imgs: res,
      date: new Date()
    }

    if (selectCatagory == "-----Select Catagory-----") {
      alert("Please Select Appropriate Catagory");
    }
    else {
      firebase.firestore().collection(selectCatagory).add(allvalues)
        .then((res) => {
          console.log('Ad Submitted Successfully');
          window.location.href = "../index.html";
        }).catch((e) => {
          var eCode = e.code;
          var eMessage = e.message;
          console.log(eMessage);
          document.getElementById('loaders').style.display = "none";
          document.getElementById('btnAdSumbit').innerHTML = "Submit";
        })
    }
  })
}

// var allvalues = {
//   txtAdTitle,
//   selectCatagory,
//   txtAdDescription,
//   txtName,
//   txtPhone,
//   txtCity
// }

// console.log(allvalues);

// //Getting User Id From Local Storage
// var u_id = localStorage.getItem('user_id');

// console.log(u_id);

// firebase.firestore().collection('ads').doc(u_id).collection(selectCatagory).add(allvalues).then((res) =>{
//   console.log('Ad Submitted Successfully');
// }).catch((e) => {
//   var eCode = e.code;
//   var eMessage = e.message;
//   console.log(eMessage);
// })
/*}*/

const storage = firebase.storage();
function uploadPics(array) {
  let storageRef = storage.ref();

  let promises = [];

  for (let i = 0; i < array.length; i++) {

    promises.push(new Promise(function (resolve, reject) {
      let imgRef = storageRef.child("/images/" + Math.random() + ".jpg");
      imgRef.put(array[i])
        .then(function (snapshot) {
          imgRef.getDownloadURL().then(function (url) {
            console.log(url);
            resolve(url);
          })
        })
    }))
  }
  return promises;
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
    window.location.href = "../index.html";
  }).catch(function (error) {
    // An error happened.
    console.log(error);
  });
}
