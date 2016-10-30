var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.send('Hello');
});

router.get('/ping', function(req, res) {
    res.status(200).send('pong!');
});

module.exports = router;
