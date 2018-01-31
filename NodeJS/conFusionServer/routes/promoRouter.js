
// Modules
const express       = require('express');
const bodyParser    = require('body-parser');
const authenticate  = require('../middlewares/authenticate');
const cors          = require('./cors');

// Router
const promoRouter   = express.Router();
promoRouter.use(bodyParser.json());

// Routes
promoRouter.route('/')

    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');

        next();
    })

    .get(cors.cors, (req, res, next) => {
        res.end('We will send all the promotions to you!');
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions.');
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.end('Deleting all the promotions!');
    });

promoRouter.route('/:promoId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');

        next();
    })

    .get(cors.cors,(req, res, next) => {
        res.end('We will send details of the promotion: ' + req.params.promoId + ' to you!');
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promoId);
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.write('Updating the promotion: ' + req.params.promoId + '\n');
        res.end('We will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);

    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.end('Deleting promotion: ' + req.params.promoId);
    });

// Export module
module.exports = promoRouter;
