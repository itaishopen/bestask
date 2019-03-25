import io from 'socket.io-client';
const socket = io('http://localhost:3000');
// var user = this.$store.getters.loggedInUser

function init(boardId, user){
	socket.emit('connect')
	console.log(boardId, user);
	
	socket.emit('boardRequested', {boardId, user});

	socket.on('userConnected', fun => {
		console.log('user connected in front', fun);
	});

	socket.on('board-change', boardId => {		
		this.$store.dispatch({ type: "loadBoard", boardId })
	});
}

function send(boardId){
	console.log('send' ,boardId);
	
	socket.emit('post-change', boardId)
}
function emit(eventName, data){
	socket.emit(eventName, data)
}

function on(eventName, cb) {
	socket.on(eventName, cb)
}


export default {
	init,
	send,
	on,
	emit
}