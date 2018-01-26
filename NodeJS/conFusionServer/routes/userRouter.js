
// Modules
const express       = require('express');
const bodyParser    = require('body-parser');
const passport      = require('passport');

// Model
const User = require('../models/users');

// Router
const UserRouter = express.Router();
UserRouter.use(bodyParser.json());

// Routes
UserRouter.route('/signup')
    .post((req, res, next) => {
        const newUsername = {username: req.body.username};
        const newPassword = req.body.password;

        User.register(new User(newUsername), newPassword, (err, user) => {
            if (err) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.json({err: err});
            }

            return passport.authenticate('local')(req, res, () => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: true, status: 'Registration Successful!'});
            });

        });
    });

UserRouter.route('/login')
    .post(passport.authenticate('local'), (req, res) => {

        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');

        return res.json({success: true, status: "Login Successful"});
    });

UserRouter.route('/logout')
    .get((req, res, next) => {
        if (req.user) {
            res.clearCookie('session-id');

            return res.redirect('/');
        }
    });

module.exports = UserRouter;
