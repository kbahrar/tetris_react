const express = require("express")
const path = require('path')
const socketIo = require("socket.io");

const app = express()

// Middlwar for bad JSON request
// app.use((err, req, res, next) => {
// 	if (err)
// 		return res.json({error: 'something is wrong in json'})
// 	next()
// })

app.use(express.static('build'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
});

// serve build as static folder
// router.get('/', express.static('build'));

// Handle 404 - Keep this as a last route
app.get('*', (req, res) => {
    res.redirect(301, '/');
    return;
});

const PORT = 5000;

const server = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on("connection", (Socket) => {
  console.log(Socket.id)
});

module.exports = server