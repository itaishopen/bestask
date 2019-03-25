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
app.use(express.static('public'))
app.use(cors({
  origin: ['http://localhost:8080', ''],
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

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Example app listening on port ${port}`))

const io = require('socket.io')(server);

io.on('connection', (socket) => {console.log(socket.id)})