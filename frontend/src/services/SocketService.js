import io from 'socket.io-client';
const SOCKET_URL = (process.env.NODE_ENV !== 'development')
    ? ''
    : '//localhost:3000';
const socket = io(SOCKET_URL);
import store from '../store'

function init(boardId){
	
	socket.emit('boardRequested', {boardId});

	socket.on('board-change', boardId => {		
		store.dispatch({ type: "loadBoard", boardId })
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
	init,
	send,
	on,
	emit
}