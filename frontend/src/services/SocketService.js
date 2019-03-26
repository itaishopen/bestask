import io from 'socket.io-client';
// const port = process.env.PORT || 3000;
const socket = io(':3000');
// var user = this.$store.getters.loggedInUser

function init(boardId){
	
	socket.emit('boardRequested', {boardId});

	// this.on('userConnected', fun => {
	// 	console.log('user connected in front', fun);
	// });

	// socket.on('board-change', boardId => {		
	// 	console.log('WE GOT A BOARD CHANGE')
	// 	this.$store.dispatch({ type: "loadBoard", boardId })
	// });
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
	init,
	send,
	on,
	emit
}