import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';

const socket = io('http://localhost:4000');

// Function declarations:
const getUsername = () => {
	if(document.getElementById('user-name').value) return document.getElementById('user-name').value;
	document.getElementById('user-name').value = prompt(`Introduce tu nombre de usuario: `) || 'Guest_' + Math.floor(Math.random() * 1000000);
};

const getRoom = () => {
	return document.querySelector('input[name="rooms"]:checked').value;
};

// const printUsers = (data) => {
// 	document.getElementById('num-users').value = data.numUsers;
// };

const sendMessage = (e) => {
	e.preventDefault();
	const sendMsg = document.getElementById('input');
	socket.emit('chat', { 
		room: getRoom(),
		userName: getUsername(),
		message: sendMsg.value
	});
	sendMsg.value = '';
};

const printMessage = (data) => {
	const ulEl = document.getElementById('messages');
	ulEl.innerHTML += `<p>&nbsp;${data}</p>`;
};

getUsername();

// Socket stuff

socket.on('connect', function onConnect() {
	console.log('>> Connected to server');
	socket.emit('room', {
		userName: getUsername(),
		room: getRoom() 
	});
});

// socket.on('users', (data) => {
// 	printUsers(data);
// });

socket.on('chat', (data) => {
	console.log('msg => ', data);
	printMessage(data);
});

// Business logic

// Room connection
// room.addEventListener('click', (e) => {
// 	e.preventDefault();
// 	socket.emit('room', { 
// 		data: {
// 			room: room
// 		}
// 	});
// });

const sendBtn = document.getElementById('send-button');
sendBtn.addEventListener('click', sendMessage);