// use express as a backend server
const express = require('express');

const app = express(); // our app is an express server

app.get('/', (req, res) => {
    return res.send('jack')
});

app.listen(5000, 'localhost', () => {
    console.log('Listening on port 5000.')
})