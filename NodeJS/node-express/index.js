
const express = require('express');
const http = require('http');

const hostname = 'node';
const port = '9090';

const app = express();

app.use((req, res, next) => {
    console.log(req.headers);

    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.end('<html><body><h1>This is an Express server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
