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

//Navigate to Login Page
function gotoLogin() {
  window.location.href = "../login/login.html";
}

//Navigate to Home Page
function gotoHome() {
  window.location.href = "../index.html";
}

//Create Account
function signUp(event) {
  event.preventDefault();

  document.getElementById('btnSignup').innerHTML = "";

  //Getting Values
  var name = document.getElementById('txtName').value;
  var email = document.getElementById('txtEmail').value;
  var pass = document.getElementById('txtPassword').value;
  var phone = document.getElementById('txtPhone').value;
  var city = document.getElementById('txtCity').value;
  var signupBtn = document.getElementById('btnSignup');
  var loader = document.createElement('img');
  loader.setAttribute('src','../assets/loader.gif');
  loader.setAttribute('class','loader');
  loader.setAttribute('id','loaders');
  signupBtn.appendChild(loader);

  //Sign Up
  firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then((res) => {
      console.log("Registerd Successfully");
      localStorage.setItem('user_id', res.user.uid);

      //Adding in Database
      firebase.firestore().collection("users").doc(res.user.uid).set({ name: name, email: email, pass: pass, phone: phone, city: city})
        .then((res) => {
          console.log('Added Successfully')
          window.location.href = "../index.html";
        })
    })
    .catch( (error) => {
      document.getElementById('txtName').value = "";
      document.getElementById('txtEmail').value = "";
      document.getElementById('txtPassword').value = "";
      document.getElementById('txtPhone').value = "";
      document.getElementById('txtCity').value = "";
      document.getElementById('loaders').style.display = "none";
      document.getElementById('btnSignup').innerHTML = "Sign Up";
      alert("Error While Signing Up!")
      console.log(error.message);
    });
}

//Checking User Log In State
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user);
    //window.location = "../index.html";
  } else {
    console.log(user);
  }
});
