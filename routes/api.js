var express = require('express');
var passport = require('passport');

var Listing = require('../schemas/listing');
var School = require('../schemas/school');
var mongoose = require('mongoose');
var User = require('../schemas/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var secret = require('../config.js').secret;


var router = express.Router();

function auth(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                return next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
}

/* GET users listing. */
router.get('/', auth, function(req, res) {
    var listy = new Listing({
        name: 'Hello',
        price: 10,
        email: 'hello'
    })
    var price = 20;
    res.send(price);
});

router.get('/listings', function(req, res) {
    res.send('Put all listings here!');
});

router.get('/users', function(req, res) {
    var users = User.find({}, function(err, data) {
        if (err) throw err;
        res.json(data);

    });
});

router.post('/users', function(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.admin = req.body.admin;

    user.save(function(err) {
        if (err) console.log(err);
    });

    res.send(user);

});

router.get('/schools', function(req, res) {
    var schools = School.find({}, function(err, data) {
        if (err) throw err;
        res.json(data);

    });



});

router.post('/schools', function(req, res) {
    var school = new School();
    school.name = req.body.name;
    school.students = req.body.students;
    school.location = req.body.location;

    school.save(function(err) {
        if (err) console.log(err);
    });

    res.send(school);
});

router.post('/jwt/auth', function(req, res) {

    // find the user
    User.findOne({
        email: req.body.email
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, secret, {
                    expiresIn: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
});


router.post('/login/github', passport.authenticate('github'), function(req, res) {
    res.json({
        'success': 'You have logged in',
        'User': req.user
    });
});

router.post('/signup',passport.authenticate('local'), function(req, res) {
    console.log('HERE');
    User.register(new User({
        email: req.body.email,
        username: req.body.username
    }), req.body.password, function(err, account) {
        console.log('HERE');

        if (err) {
            res.send(err);
        }

        req.user = account;
        res.json({
            User: req.user,
            account: account
        });






        // passport.authenticate('local', function(req, res) {
        //     console.log('HERE');
        //
        //     res.json(req.user);
        // });
    });
});

router.get('/me', function(req, res) {
    res.json(req.user);
});

router.get('/github',
  passport.authenticate('github'),
  function(req, res) {
    // Successful authentication, redirect home.
    res.json({
        'success': 'YEAH!'
    });
  });


module.exports = router;
