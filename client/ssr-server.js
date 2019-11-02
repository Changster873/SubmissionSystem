const express = require('express');
const next = require('next');

// production environment
const dev = process.env.NODE_ENV !== 'production'

// our app is a next.js app set to production
const app = next({ dev })

// get NEXT's default request handler
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.get('*', (req, res) => {
        return handle(req, res);
    })

    server.listen(3000, (err) => {
        // if there is an error, throw it
        if (err) {
            throw err;
        }
        // otherwise, notify user that app is live
        console.log('Ready at http://localhost:3000')
    })
}).catch((error) => {
    // if there is an error, stop app
    console.error(error);
    process.exit(1);
})