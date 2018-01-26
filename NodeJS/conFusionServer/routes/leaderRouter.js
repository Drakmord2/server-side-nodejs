
// Modules
const express       = require('express');
const bodyParser    = require('body-parser');
const authenticate  = require('../middlewares/authenticate');

// Router
const leaderRouter  = express.Router();
leaderRouter.use(bodyParser.json());

// Routes
leaderRouter.route('/')

    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');

        next();
    })

    .get((req, res, next) => {
        res.end('We will send all the leaders to you!');
    })

    .post(authenticate.verifyUser, (req, res, next) => {
        res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
    })

    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders.');
    })

    .delete(authenticate.verifyUser, (req, res, next) => {
        res.end('Deleting all the leaders!');
    });

leaderRouter.route('/:leaderId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');

        next();
    })

    .get((req, res, next) => {
        res.end('We will send details of the leader: ' + req.params.leaderId + ' to you!');
    })

    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /leaders/' + req.params.leaderId);
    })

    .put(authenticate.verifyUser, (req, res, next) => {
        res.write('Updating the leader: ' + req.params.leaderId + '\n');
        res.end('We will update the leader: ' + req.body.name + ' with details: ' + req.body.description);

    })

    .delete(authenticate.verifyUser, (req, res, next) => {
        res.end('Deleting leader: ' + req.params.leaderId);
    });

// Export module
module.exports = leaderRouter;
