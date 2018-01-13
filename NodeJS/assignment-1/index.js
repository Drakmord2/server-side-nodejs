
// Modules
const http          = require('http');
const express       = require('express');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const dishRouter    = require('./routes/dishRouter');
const promoRouter   = require('./routes/promoRouter');
const leaderRouter  = require('./routes/leaderRouter');

// App settings
const hostname  = 'node';
const port      = 3000;
const app       = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

// Routers
app.use('/dishes',      dishRouter);
app.use('/promotions',  promoRouter);
app.use('/leaders',     leaderRouter);

// Server
http.createServer(app).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
