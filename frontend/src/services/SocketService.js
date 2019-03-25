import io from 'socket.io-client';
var socket = io('');

// var user = this.$store.getters.loggedInUser

function init(board){
	socket.emit('boardRequested', {board});

	socket.on('userConnected', fun => {
		console.log('user connected in front', fun);
	});

	socket.on('board-change', boardId => {
		console.log(boardId);
		
		// this.$store.dispatch({ type: "loadBoard", boardId })
	});
}

function send(boardId){
	console.log(boardId);
	
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