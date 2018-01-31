
// Modules
const express       = require('express');
const bodyParser    = require('body-parser');
const authenticate  = require('../middlewares/authenticate');
const cors          = require('./cors');

// Model
const Dishes = require('../models/dishes');

// Router
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

// Routes

// Dishes
dishRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
        Dishes.find({})
            .populate('comments.author')
            .then((dishes) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(dishes);

            }, (err) => {next(err)})
            .catch((err) => {next(err)});
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Dishes.create(req.body)
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(dish);

            }, (err) => {next(err)})
            .catch((err) => {next(err)});
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes.');
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Dishes.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(resp);

            }, (err) => {next(err)})
            .catch((err) => {next(err)});
    });

// Dishes by Id
dishRouter.route('/:dishId')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
        Dishes.findById(req.params.dishId)
            .populate('comments.author')
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(dish);

        }, (err) => {next(err)})
            .catch((err) => {next(err)});
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/' + req.params.dishId);
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body}, {new: true})
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(dish);

        }, (err) => {next(err)})
            .catch((err) => {next(err)});
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Dishes.findByIdAndRemove(req.params.dishId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(resp);

            }, (err) => {next(err)})
            .catch((err) => {next(err)});
    });

// Comments by dishes
dishRouter.route('/:dishId/comments')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
        Dishes.findById(req.params.dishId)
            .populate('comments.author')
            .then((dish) => {
                checkDish(req, res, next, dish);

                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(dish.comments);

            }, (err) => {next(err)})
            .catch((err) => {next(err)});
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                checkDish(req, res, next, dish);

                req.body.author = req.user._id;

                dish.comments.push(req.body);
                dish.save()
                    .then((dish) => {
                        res.statusCode = 200;
                        res.setHeader('Content-type', 'application/json');
                        res.json(dish);
                    }, (err) => {next(err)});

            }, (err) => {next(err)})
            .catch((err) => {next(err)});
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes/'+req.params.dishId+'/comments is not allowed');
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                checkDish(req, res, next, dish);

                for (let i = dish.comments.length - 1; i >= 0; i--) {
                    let comId   = dish.comments[i]._id;
                    let comment = dish.comments.id(comId);

                    comment.remove();
                }

                dish.save()
                    .then((dish) => {
                        res.statusCode = 200;
                        res.setHeader('Content-type', 'application/json');
                        res.json(dish);
                    }, (err) => {next(err)});

            }, (err) => {next(err)})
            .catch((err) => {next(err)});
    });

// Comments by Id
dishRouter.route('/:dishId/comments/:commentId')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
        Dishes.findById(req.params.dishId)
            .populate('comments.author')
            .then((dish) => {
                checkDish(req, res, next, dish);

                const comment = dish.comments.id(req.params.commentId);

                checkComment(req, res, next, comment);

                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(comment);

            }, (err) => {next(err)})
            .catch((err) => {next(err)});
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/'+req.params.dishId+'/comments is not allowed');
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                checkDish(req, res, next, dish);

                const comment = dish.comments.id(req.params.commentId);

                checkComment(req, res, next, comment);

                if (req.body.comment) {
                    comment.comment = req.body.comment;
                }

                if (req.body.rating) {
                    comment.rating = req.body.rating;
                }

                dish.save()
                    .then((dish) => {
                        res.statusCode = 200;
                        res.setHeader('Content-type', 'application/json');
                        res.json(dish);
                    }, (err) => {next(err)});

            }, (err) => {next(err)})
            .catch((err) => {next(err)});
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Dishes.findById(req.params.dishId)
            .then((dish) => {
                checkDish(req, res, next, dish);

                const comment = dish.comments.id(req.params.commentId);

                checkComment(req, res, next, comment);

                comment.remove();

                dish.save()
                    .then((dish) => {
                        res.statusCode = 200;
                        res.setHeader('Content-type', 'application/json');
                        res.json(dish);
                    }, (err) => {next(err)});

            }, (err) => {next(err)})
            .catch((err) => {next(err)});
    });

function checkDish (req, res, next, dish) {
    if (dish === null) {
        const err       = new Error('Dish ' + req.params.dishId + ' not found');
        res.statusCode  = 404;

        return next(err);
    }
}

function checkComment (req, res, next, comment) {
    if (comment === null) {
        const err       = new Error('Comment ' + req.params.commentId + ' not found');
        res.statusCode  = 404;

        return next(err);
    }
}

module.exports = dishRouter;
