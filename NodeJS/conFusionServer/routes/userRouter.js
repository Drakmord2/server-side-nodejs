
// Modules
const express       = require('express');
const bodyParser    = require('body-parser');

// Model
const User = require('../models/users');

// Router
const UserRouter = express.Router();
UserRouter.use(bodyParser.json());

// Routes
UserRouter.route('/signup')
    .post((req, res, next) => {
        const newUsername = {username: req.body.username};

        User.findOne(newUsername)
            .then((user) => {
                if (user !== null) {
                    const msg = `User ( ${newUsername.username} ) already exists`;
                    return unauth(msg, next);
                }

                return User.create({
                    username: req.body.username,
                    password: req.body.password
                });

            }, (err) => next(err))
            .then((user) => {
                if (user) {
                    res.statusCode = 200;
                    res.setHeader('Content-type', 'application/json');

                    return res.json({status: "Registration Successful", user: user});
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

UserRouter.route('/login')
    .post((req, res, next) => {
        if (! req.session.user) {
            const user = req.body.username;
            const pass = req.body.password;

            return User.findOne({username: user, password: pass})
                .then((user) => {
                    if (user === null) {
                        const msg = 'Wrong username or password.';
                        return unauth(msg, next);
                    }

                    req.session.user = 'authenticated';

                    res.statusCode = 200;
                    res.setHeader('Content-type', 'application/json');

                    return res.json({status: "Login Successful", user: req.body.username});

                }, (err) => next(err))
                .catch((err) => next(err));
        }

        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');

        return res.json({status: "Already logged in", user: req.body.username});
    });

UserRouter.route('/logout')
    .get((req, res, next) => {
        if (req.session.user) {
            req.session.destroy();
            res.clearCookie('session-id');

            return res.redirect('/');
        }

        const msg = 'User not logged in';
        return unauth(msg, next);
    });

function unauth (msg, next) {
    const err   = new Error(msg);
    err.status  = 401;

    next(err);
}

module.exports = UserRouter;
