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
var server = require('http').Server(app);
var io = require('socket.io')(server);
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

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Example app listening on port ${port}`))
io.on('connection', socket => {
	socket.on('boardRequested', ({boardId}) => {
		console.log('User', 'Requested to join room:', boardId);
		socket.join(boardId);
		io.to(boardId).emit('userConnected', 'puki');
		socket.theBoardId = boardId; 
		console.log('------ connected to',socket.theBoardId);
		
	});

	socket.on('post-change', boardId => {
		console.log('POsting a message', boardId, 'to:', socket.theBoardId);
		socket.to(socket.theBoardId).emit('board-change', boardId);
	});

	socket.on('disconnect', function (evt) {
		console.log('DISCONNECTED', socket.theBoardId, socket.id, evt)
	});
});



addBoardRoutes(app)
addCardRoutes(app)
addUserRoutes(app)
addListRoutes(app)
addActivityRoutes(app)

