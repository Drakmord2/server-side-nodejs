
// Modules
const express       = require('express');
const bodyParser    = require('body-parser');
const passport      = require('passport');
const authenticate  = require('../middlewares/authenticate');
const cors          = require('./cors');

// Model
const User = require('../models/users');

// Router
const UserRouter = express.Router();
UserRouter.use(bodyParser.json());

// Routes
UserRouter.route('/signup')
    .post(cors.corsWithOptions, (req, res, next) => {
        const newUsername = {username: req.body.username};
        const newPassword = req.body.password;

        User.register(new User(newUsername), newPassword, (err, user) => {
            if (err) {
                return onError(err, res);
            }

            if (req.body.firstname) {
                user.firstname = req.body.firstname;
            }

            if (req.body.lastname) {
                user.lastname = req.body.lastname;
            }

            return user.save((err, user) => {
                if (err) {
                    return onError(err, res);
                }

                passport.authenticate('local')(req, res, () => {
                    const respObj = {success: true, status: 'Registration Successful!'};

                    return onSuccess(respObj, res);
                });
            });

        });
    });

UserRouter.route('/login')
    .post(cors.corsWithOptions, passport.authenticate('local'), (req, res) => {

        const token = authenticate.getToken({_id: req.user._id});
        const respObj = {success: true, status: "Login Successful", token: token};

        return onSuccess(respObj, res);
    });

UserRouter.route('/logout')
    .get(cors.corsWithOptions, (req, res, next) => {
        if (req.user) {
            res.clearCookie('session-id');

            return res.redirect('/');
        }
    });

function onError (err, res) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');

    res.json({err: err});
}

function onSuccess (respObj, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    res.json(respObj);
}

module.exports = UserRouter;
