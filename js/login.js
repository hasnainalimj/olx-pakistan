// Initialize Firebase
  var config = {
  };
  firebase.initializeApp(config);

//Navigate to SignIn Page
function createAccount(){
	window.location.href = "../signup/signup.html";
}

//Navigate to Home Page
function gotoHome(){
	window.location.href = "../index.html";
}

//Login Account
function logIn(event){
	event.preventDefault();

	document.getElementById('btnLogin').innerHTML = "";

	//Getting Values
	var email = document.getElementById('txtEmail').value;
	var pass = document.getElementById('txtPassword').value;
	var loginBtn = document.getElementById('btnLogin');
	var loader = document.createElement('img');
	loader.setAttribute('src','../assets/loader.gif');
	loader.setAttribute('class','loader');
	loader.setAttribute('id','loaders');
	loginBtn.appendChild(loader);

	//Loggin In
	firebase.auth().signInWithEmailAndPassword(email,pass).then((res) => {
		
		localStorage.setItem('user_id',res.user.uid);
		console.log("Log In Successfully");
		window.location.href = "../index.html";
	}).catch((e) => {
		document.getElementById('txtEmail').value = "";
		document.getElementById('txtPassword').value = "";
		document.getElementById('loaders').style.display = "none";
		document.getElementById('btnLogin').innerHTML = "Log In";
		alert("Invalid Username Or Password!");
		var eCode = e.code;
		var eMessage = e.message;
		console.log(eMessage);
	})
}

//Checking User Log In State
firebase.auth().onAuthStateChanged(function(user){
 	 if (user) {
   		console.log(user);
		//window.location = "../index.html";
  	} else {
    	console.log(user);
  		}
});
