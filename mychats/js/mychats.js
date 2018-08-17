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

let recievers;

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

//Getting My Chats

let currentUser = localStorage.getItem('user_id');
let main_div = document.getElementById('main-div');
let resFound = false;

if (currentUser) {
  var catagoriesArray = ['Mobiles', 'Bikes', 'Cars', 'Electronics', 'Furniture', 'Jobs', 'Animals', 'Homes', 'Books', 'Kids', 'Services', 'Fashion'];

  firebase.firestore().collection('room').where('users.' + currentUser, '==', true).get().then(res => {
    res.forEach(elem => {
      // console.log(elem.data());
      // console.log(elem.id);
      // console.log(elem.data().adId);
      catagoriesArray.forEach(record => {
        firebase.firestore().collection(record).doc(elem.data().adId).get().then(elems => {
          if (!elems.data()) return;
          // console.log(elems.data().adTitle);
          resFound = true;
          document.getElementById('loading').style.display = "none";

          let container = document.createElement('div');
          container.setAttribute('class', 'container');
          main_div.appendChild(container);

          let chat_container = document.createElement('div');
          chat_container.setAttribute('class', 'chat-container');
          container.appendChild(chat_container);
          // chat_container.addEventListener('click', () => {
          //   showRoomMessages(elem.id, elem.data().adId)
          // });

          let chat_image = document.createElement('img');
          chat_image.setAttribute('src', elems.data().imgs[0]);
          chat_image.setAttribute('class', 'user-image');
          chat_image.addEventListener('click', () => {
            showRoomMessages(elem.id, elem.data().adId)
          });
          chat_container.appendChild(chat_image);

          let text = document.createElement('h4');
          text.setAttribute('class', 'new-message');
          text.innerHTML = elems.data().adTitle;
          text.addEventListener('click', () => {
            showRoomMessages(elem.id, elem.data().adId)
          });
          chat_container.appendChild(text);

          var remove = document.createElement('i');
          remove.style.marginTop = '15px';
          remove.setAttribute('class', 'fa fa-trash fa-2x star');
          remove.setAttribute('title', 'Delete Chat');
          remove.setAttribute('id', 'thestar');
          remove.addEventListener('click', (eventOne) => {
            deletChats(eventOne, elem.id);
          });
          chat_container.appendChild(remove);

          let breaks = document.createElement('br');
          main_div.appendChild(breaks);
        })
      })

      // document.getElementById('loading').style.display = "none";

      // let container = document.createElement('div');
      // container.setAttribute('class', 'container');
      // main_div.appendChild(container);

      // let chat_container = document.createElement('div');
      // chat_container.setAttribute('class', 'chat-container');
      // container.appendChild(chat_container);

      // chat_container.addEventListener('click', () => {
      //   showRoomMessages(elem.id, elem.data().adId)
      // });

      // let chat_image = document.createElement('img');
      // chat_image.setAttribute('src', '../assets/user-icon.png');
      // chat_image.setAttribute('class', 'user-image');
      // chat_container.appendChild(chat_image);

      // let text = document.createElement('h4');
      // text.setAttribute('class', 'new-message');
      // text.innerHTML = elems.data().adTitle;
      // chat_container.appendChild(text);

      // let breaks = document.createElement('br');
      // main_div.appendChild(breaks);
    })
  })
}

function showRoomMessages(roomid, adid) {
  //  firebase.firestore().collection('room').doc(roomid).collection('messages').get().then(res => {
  //    console.log(res.data())
  //  })

  if (currentUser) {
    firebase.firestore().collection('room').doc(roomid).get().then(doc => {
      if (currentUser == doc.data().currentU) {
        recievers = doc.data().recieverU;
      }
      else if (currentUser == doc.data().recieverU) {
        recievers = doc.data().currentU;
      }
    })
  }

  let ad_id = localStorage.setItem('ad_id', adid);

  var catagoriesArray = ['Mobiles', 'Bikes', 'Cars', 'Electronics', 'Furniture', 'Jobs', 'Animals', 'Homes', 'Books', 'Kids', 'Services', 'Fashion'];

  catagoriesArray.forEach(category => {
    firebase.firestore().collection(category).doc(adid).get()
      .then((snapshot) => {
        if (!snapshot.data()) return;
        console.log(snapshot.data().adAdderId)
        let reciever_id = localStorage.setItem('reciever_id', snapshot.data().adAdderId);
        let room_id = localStorage.setItem('room_id', roomid);
        window.location.href = "../catagories_pages/detail_page/sendmessage/sendmessage.html";
      })
  })
  // firebase.firestore().collection('room').doc(room_id).collection('messages').get().then(res => {
  //   res.forEach(doc => {
  //     console.log(doc.data());
  //   })
  // })
}

//Hide Loader And Show Message
setTimeout(function () {
  if (resFound == false) {
    document.getElementById('loading').style.display = 'none';
    let text = document.createElement('h6');
    text.setAttribute('class', 'recordFound');
    text.innerHTML = "Chats Not Found";
    main_div.appendChild(text);
  }
}, 6000);

//Delete Chats
function deletChats(eventOne, roomid) {
  //console.log(roomid);
  resFound = false;
  firebase.firestore().collection('room').doc(roomid).delete().then(()=>{
    alert('Chat Deleted');
    history.go();
  })
}