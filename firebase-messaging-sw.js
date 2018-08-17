importScripts (src="https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js");
importScripts (src="https://www.gstatic.com/firebasejs/5.2.0/firebase-messaging.js");

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

  const messaging = firebase.messaging();