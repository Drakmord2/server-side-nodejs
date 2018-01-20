
// Modules
const express         = require('express');
const path            = require('path');
const favicon         = require('serve-favicon');
const logger          = require('morgan');
const cookieParser    = require('cookie-parser');
const bodyParser      = require('body-parser');

// Routers
const index         = require('./routes/index');
const users         = require('./routes/users');
const dishRouter    = require('./routes/dishRouter');
const promoRouter   = require('./routes/promoRouter');
const leaderRouter  = require('./routes/leaderRouter');

// Mongoose Settings
const mongoose      = require('mongoose');
mongoose.Promise    = require('bluebird');
const url           = 'mongodb://mongo:27017/conFusion';
const options       = {};
const conn          = mongoose.connection;

conn.once('open', () => {
    console.log('\n- Connected corretly to server\n');
});

mongoose.connect(url, options, (err) => {
    if (err) {
        console.log('\n- MongoDB connection error: [%s]\n', err);
        process.exit(1);
    }
});

// Application
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// App settings
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/',            index);
app.use('/users',       users);
app.use('/dishes',      dishRouter);
app.use('/promotions',  promoRouter);
app.use('/leaders',     leaderRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err     = new Error('Not Found');
  err.status    = 404;

  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message    = err.message;
  res.locals.error      = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Export module
module.exports = app;
