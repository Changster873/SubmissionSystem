// use express as a backend server
const express = require('express');
var bodyparser = require('body-parser')
const path = require('path')

const app = express(); // our app is an express server

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.text())

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')
    // // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow ,
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-ControlAllow-Headers');
    // Pass to next layer of middleware
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    return res.send('hi')
});

app.post('/submit', (req, res) => {
    console.log('yes')
    console.log(req.body)
})

app.listen(process.env.PORT || 5000, 'localhost', () => {
    console.log('Listening on port 5000.')
})