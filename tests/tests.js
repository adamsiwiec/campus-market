
var expect  = require("chai").expect;
var assert = require('chai').assert;
var request = require("request");

const pingUrl = 'http://localhost:3000/ping';

describe('Ping website', function() {
    it('Should return status of 200', function(done){
        request.get(pingUrl, function(err, res, body){
            assert.equal(res.statusCode, 200);
            done();
        });
    });
});
