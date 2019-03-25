var socket = io('');

var user = this.$store.getters.loggedInUser

function init(board){
	socket.emit('roomRequested', {user, board});

	socket.on('userConnected', user => {
		console.log('user connected in front', { newUser: user });
	});

	socket.on('board-change', boardId => {
		this.$store.dispatch({ type: "loadBoard", boardId })
	});
}

function send(boardId){
	socket.emit('post-change', boardId)
}
function emit(eventName, data){
	socket.emit(eventName, data)
}

function on(eventName, cb) {
	socket.on(eventName, cb)
}


export default {
	user,
	init,
	send,
	on,
	emit
}