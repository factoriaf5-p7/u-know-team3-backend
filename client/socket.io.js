import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';

const socket = io('http://localhost:4000');

const sendMessage = (e) => {
	e.preventDefault();
	const sendMsg = document.getElementById('input');
	socket.emit('chat', { data: sendMsg.value });
};

const printMessage = (msg) => {
	const ulEl = document.getElementById('messages');
	ulEl.innerHTML += `<p>&nbsp;${msg.data}</p>`;
};

socket.on('connect', function onConnect(msg) {
	console.log('>> Connected to server');
});

socket.on('chat', (msg) => {
	console.log('msg => ', msg);
	printMessage(msg);
});

const sendBtn = document.getElementById('send-button');
sendBtn.addEventListener('click', sendMessage);