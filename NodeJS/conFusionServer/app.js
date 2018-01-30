
// Modules
const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const bodyParser    = require('body-parser');
const session       = require('express-session');
const passport      = require('passport');
const authenticate  = require('./middlewares/authenticate');

// Global Settings
const config = require('./config');

// Routers
const index         = require('./routes/index');
const users         = require('./routes/userRouter');
const dishRouter    = require('./routes/dishRouter');
const promoRouter   = require('./routes/promoRouter');
const leaderRouter  = require('./routes/leaderRouter');

// Mongoose Settings
const mongoose      = require('mongoose');
mongoose.Promise    = require('bluebird');
const url           = config.mongoUrl;
const options       = config.mongoOpts;
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

app.all('*', (req, res, next) => {
    if (req.secure) {
        return next();
    }

    res.redirect(307, `https://${req.hostname}:${app.get('secPort')}${req.url}`);
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// App Middlewares
app.use( favicon( path.join(__dirname, 'public', 'favicon.ico')));
app.use( logger('dev'));
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended: false }));
app.use( express.static( path.join(__dirname, 'public')));

// Authentication Middleware
app.use( passport.initialize());

// Mount Routes
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
  res.locals.message    = err.message;
  res.locals.error      = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Export module
module.exports = app;
