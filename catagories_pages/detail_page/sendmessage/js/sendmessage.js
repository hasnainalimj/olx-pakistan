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

//Go Back
function goBack() {
	history.back();
}

//Getting Name

let user_id = localStorage.getItem('user_id');
let reciever_id = localStorage.getItem('reciever_id');
let ad_id = localStorage.getItem('ad_id');
let ad_cat = localStorage.getItem('ad_cat');
let name = document.getElementById('chat-name');

//Swapping Ids
if (localStorage.getItem('reciever_id') == localStorage.getItem('user_id')) {
	firebase.firestore().collection('room').where('recieverU', '==', localStorage.getItem('reciever_id'))
		.where('adId', '==', localStorage.getItem('ad_id'))
		.get().then(doc => {
			doc.forEach(elem => {
				console.log(elem.data().currentU)
				localStorage.setItem('reciever_id', elem.data().currentU);
				history.go();
			})
		})
}

if (user_id == reciever_id) {
	document.getElementById('chat-name').innerHTML = "User"
}
else {
	firebase.firestore().collection('users').doc(reciever_id).get().then(docs => {
		document.getElementById('chat-name').innerHTML = docs.data().name;
	})
}

//  firebase.firestore().collection(ad_cat).doc(ad_id).get().then((doc) => {
//  	name.innerHTML = doc.data().name;
//  })

//Getting Messages on Realtime

var container_message = document.getElementById('container-message');




firebase.firestore().collection('room').doc(localStorage.getItem('room_id')).collection('messages').onSnapshot(res => {
	let updater = res.docChanges();
	updater.forEach(change => {
		// console.log(change.doc.data());
		var message1 = document.createElement('div');
		message1.innerHTML = change.doc.data().message;
		message1.setAttribute('class', 'message1');
		container_message.appendChild(message1);

		var breakOne = document.createElement('br');
		message1.appendChild(breakOne);

		firebase.firestore().collection('users').doc(change.doc.data().currentUser).get().then(doc => {
			var names = document.createElement('p');
			names.setAttribute('class', 'name');
			names.innerHTML = "Send By : " + doc.data().name;
			message1.appendChild(names);
		})

	})
})

//Sending Messages

function sendMessage(event) {
	event.preventDefault();

	document.getElementById('btnSendMessage').innerHTML = "";

	/*let message = document.getElementById('txtMessage').value;
	let recieverId = localStorage.getItem('reciever_id');
	let senderId = localStorage.getItem('user_id')*/

	let date = new Date();

	let time = date.getTime();

	let currentUser = localStorage.getItem('user_id');

	let recieverId = localStorage.getItem('reciever_id');

	let adId = localStorage.getItem('ad_id');

	let message = document.getElementById('txtMessage').value;

	let times = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

	var sendBtn = document.getElementById('btnSendMessage');
	var loader = document.createElement('img');
	loader.setAttribute('id', 'loaders')
	loader.setAttribute('src', '../../../assets/loader.gif');
	loader.setAttribute('class', 'loader');
	sendBtn.appendChild(loader);

	let room_id = localStorage.getItem('room_id');

	firebase.firestore().collection('room').doc(room_id).collection('messages')
		.doc(((new Date).getTime()).toString())
		.set({
			message: message,
			currentUser: currentUser,
			recieverId: recieverId,
			time: times
		}).then(function () {
			console.log('Message Sended');
			document.getElementById('txtMessage').value = "";
			document.getElementById('loaders').style.display = "none";
			document.getElementById('btnSendMessage').innerHTML = "Send";

			firebase.firestore().collection('users').doc(localStorage.getItem('reciever_id')).get().then(docs => {
				docs.data().token;

				firebase.firestore().collection('users').doc(localStorage.getItem('user_id')).get().then(res => {
					console.log(res.data().name);

					//Way To Push Notification Using Fetch

					firebase.messaging().onMessage((payload) => {
						// console.log('payload', payload)
					})

					var key = 'AIzaSyBsX6aBs9V5Cq-13VnueqInxbQ9l_s5L7M';
					var to = docs.data().token;

					var notification = {
						'title': res.data().name,
						'body': message,
						'click_action': 'http://127.0.0.1:8887/mychats/mychats.html',
						'icon': './notify.png'
					}

					fetch('https://fcm.googleapis.com/fcm/send', {
						'method': 'POST',
						'headers': {
							'Authorization': 'key=' + key,
							'Content-Type': 'application/json'
						},
						'body': JSON.stringify({
							'notification': notification,
							'to': to
						})
					}).then(res => {
						// console.log(res);
					}).catch(err => {
						console.log(err);
					})

				})

			})
		})
}

/*firebase.firestore().collection('room').add({
	createdAt: times,
	users:{
		[firebase.auth.currentUser.id]:true,
		[recieverId] : true
	},
	adId : adId
}).then(res => {
	console.log(res.data());
}).catch(e => {
	console.log(e)
})*/

/*let found = false;

firebase.firestore().collection("messages").where("senderId","==",senderId).where("recieverId","==",recieverId)
.get().then((doc) => {
	doc.forEach(element => {
		found = true;
		firebase.firestore().collection("messages").doc(doc.docs[0].id).collection("message").add({
			senderId : senderId,
			recieverId : recieverId,
			adId : adId,
			message : message,
			time : times
		}).then(function(){
			document.getElementById('txtMessage').value = "";
			console.log("send and update");
		})
	})

	setTimeout(() => {
		if(found == false){
			firebase.firestore().collection("messages").add({
				senderId : senderId,
				recieverId : recieverId
			}).then(docRef => {
				firebase.firestore().collection("messages").doc(docRef.id).collection("message")
				.add({
					senderId : senderId,
					recieverId : recieverId,
					adId : adId,
					message : message,
					time : times
				}).then(messRef => {
					document.getElementById('txtMessage').value = "";
					console.log("send successfully")	
				})
			})
		}
	},4000)
	document.getElementById('loaders').style.display = "none";
	document.getElementById('btnSendMessage').innerHTML = "Send";
})

*/


//Getting Messages

/*var recieverId = localStorage.getItem('reciever_id');
var senderId = localStorage.getItem('user_id');
var container_message = document.getElementById('container-message');
let adId = localStorage.getItem('ad_id');

firebase.firestore().collection("messages").where("recieverId","==",recieverId)
.onSnapshot(function(querySnapshot){
	querySnapshot.docChanges().forEach(element => {
		//console.log(element.doc.data());
		firebase.firestore().collection("messages").doc(element.doc.id).collection("message").where("adId","==",adId)
		.onSnapshot(function(res){
			res.docChanges().forEach(mess => {
				//console.log(mess.doc.data());

				var message2 = document.createElement('div');
				message2.innerHTML = mess.doc.data().message;
				message2.setAttribute('class','message2');
				container_message.appendChild(message2);
			})
		})
	});
})
*/
/*firebase.firestore().collection("messages").where("senderId","==",senderId)
.onSnapshot(function(querySnapshot){
	querySnapshot.docChanges().forEach(element => {
		//console.log(element.doc.data());
		firebase.firestore().collection("messages").doc(element.doc.id).collection("message").onSnapshot(function(res){
			res.docChanges().forEach(mess => {
				//console.log(mess.doc.data());

				var message1 = document.createElement('div');
				message1.innerHTML = mess.doc.data().message;
				message1.setAttribute('class','message1');
				container_message.appendChild(message1);
			})
		})
	});
})*/

/*function sendMessage(event){
	event.preventDefault();
	
	let date = new Date();

	let time = date.getTime();
	console.log("time in miliseconds =========>",time);

	let senderId = localStorage.getItem('user_id');
	console.log("sender id =========>",senderId);

	let recieverId = localStorage.getItem('reciever_id');
	console.log("reciever id =========>",recieverId);

	let adId = localStorage.getItem('ad_id');
	console.log("ad id =========>",adId);

	let message = document.getElementById('txtMessage').value;
	console.log("message =========>",message)

	let times = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
	console.log("time =========>",times);

	firebase.firestore().collection("Messages").add({
		senderId : senderId,
		recieverId : recieverId,
		adId : adId,
		message : message,
		time : times
	}).then(function(){
		document.getElementById('txtMessage').value = "";
		console.log("Message Send :)");
	})
}
	firebase.firestore().*/










//----------------------------------------------------------------------

// let limit = 10;
// let reached = false;

// function getData() {
// 	firebase.firestore().collection('room').doc(localStorage.getItem('room_id')).collection('messages').onSnapshot(res => {
// 		let updater = res.docChanges();
// 		updater.forEach(change => {
// 			// console.log(change.doc.data());
// 			var message1 = document.createElement('div');
// 			message1.innerHTML = change.doc.data().message;
// 			message1.setAttribute('class', 'message1');
// 			container_message.appendChild(message1);

// 			var breakOne = document.createElement('br');
// 			message1.appendChild(breakOne);

// 			firebase.firestore().collection('users').doc(change.doc.data().currentUser).get().then(doc => {
// 				var names = document.createElement('p');
// 				names.setAttribute('class', 'name');
// 				names.innerHTML = "Send By : " + doc.data().name;
// 				message1.appendChild(names);
// 			})

// 		})
// 	})
// }