
var socket = io('');
import utils from './util.service.js';
import storgeService from './storage.service.js';


const msgs = []
var user = _getUser()

function init(topic){
	socket.emit('roomRequested', {user, topic});

	socket.on('userConnected', user => {
		console.log('user conncted in front', { newUser: user });
	});

	socket.on('msg-recived', msg => {
		console.log('Got new msg', msg);
		msgs.push(msg);
	});
}

function send(msg){
	socket.emit('post-msg', msg)
}
function emit(eventName, data){
	socket.emit(eventName, data)
}

function on(eventName, cb) {
	socket.on(eventName, cb)
}


export default {
	user, 
	msgs,
	init,
	send,
	on,
	emit
};


function _getUser() {
    var user = storgeService.load('user');
	if (!user) {
		user = {
			nickName: prompt('first time. what is your name?'),
			id: utils.getRandomString(6)
		};
		storgeService.store('user', user);
	}
	return user;
}