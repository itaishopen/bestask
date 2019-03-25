const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const addBoardRoutes = require('./routes/board-route')
const addCardRoutes = require('./routes/card-route')
const addUserRoutes = require('./routes/user-route')
const addListRoutes = require('./routes/list-route')
const addActivityRoutes = require('./routes/activity-route')

const app = express()
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Example app listening on port ${port}`))
io.on('connection', socket => {
	console.log('coooonet');
	socket.on('boardRequested', ({boardId, user}) => {
		console.log("fun" , boardId);
		
		if (socket.theBoardId) {
			// First un-join the room
			socket.leave(socket.theBoardId);
		}
		console.log('User', user, 'Requested to join room:', boardId);
		socket.join(boardId);
		io.to(boardId).emit('userConnected', user);
		socket.theBoardId = boardId; 
		console.log(socket.theBoardId);
		
	});

	socket.on('post-change', boardId => {
		console.log('POsting a message', boardId, 'to:', socket.theBoardId);
		socket.to(socket.theBoardId).emit('board-change', boardId);
	});
});
app.use(express.static('public'))
app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true // enable set cookie
}));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
  secret: 'best app ever',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/', (req, res) => {
  res.send('you are connected')
})

addBoardRoutes(app)
addCardRoutes(app)
addUserRoutes(app)
addListRoutes(app)
addActivityRoutes(app)

