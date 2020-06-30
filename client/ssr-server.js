const express = require('express');
const next = require('next');
const path = require('path')
var bodyparser = require('body-parser')
var fs = require('fs');

// production environment
const dev = process.env.NODE_ENV !== 'production'

// our app is a next.js app set to production
const app = next({ dev })

// get NEXT's default request handler
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.use(express.static(path.join(__dirname, 'public')));

    server.use(bodyparser.urlencoded({ extended: true }))
    server.use(bodyparser.json())

    server.get('*', (req, res) => {
        return handle(req, res);
    })

    server.get('/', (req, res) => {
        console.log('home')
    })

    // store the files that students submit
    server.post('/submit', (req, res) => {
        console.log('hi')
        
    })

    server.listen(process.env.PORT || 3000, (err) => {
        // if there is an error, throw it
        if (err) {
            throw err;
        }
        // otherwise, notify user that app is live
        console.log('Ready, up and running...')
    })
}).catch((error) => {
    // if there is an error, stop app
    console.error(error);
    process.exit(1);
})