const express = require("express")
const path = require('path')
const socketIo = require("socket.io");
const Socket = require("./classes/socket.class")

const app = express()

app.use(express.static('build'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
});

// Handle 404
app.get('*', (req, res) => {
    res.redirect(301, '/');
    return;
});

const PORT = 5000;

const server = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);

const socket = new Socket()
socket.run(server)

module.exports = server