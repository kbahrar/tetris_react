const express = require("express")
const bodyParse = require("body-parser")
const cors = require("cors");

const app = express()

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.use(cors)

// Middlwar for bad JSON request
app.use((err, req, res, next) => {
	if (err)
		return res.json({error: 'something is wrong in json'})
	next()
})

// Handle 404 - Keep this as a last route
app.use(function(req, res, next) {
    res.status(404);
    res.send('<center><h1>Page not found</h1></center>');
});

const PORT =  5000;

const server = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);

module.exports = server