
const express       = require('express');
const http          = require('http');
const morgan        = require('morgan');
const bodyParser    = require('body-parser');

const hostname  = 'node';
const port      = '9090';
const app       = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Express Router
app.all('/dishes', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');

    next();
});

app.get('/dishes', (req, res, next) => {
    res.end('We will send all the dishes to you!');
});

app.post('/dishes', (req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on dishes.');
});

app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all the dishes!');
});

// Routes with parameters
app.get('/dishes/:dishId', (req, res, next) => {
    res.end('We will send details of the dish: ' + req.params.dishId + ' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported on /dishes/' + req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('We will update the dish: ' + req.body.name + ' with details: ' + req.body.description);

});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.end('<html><body><h1>This is an Express server</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
