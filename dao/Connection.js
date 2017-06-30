/**
 *
 */

var redis = require('redis');
var client = redis.createClient(); //creates a new client

client.on('connect', function() {
    console.log('connected');
});

// Saving a key/value pair without a callback
client.set('framework', 'AngularJS');

// Saving a key/value pair
client.set('framework', 'AngularJS', function(err, reply) {
    console.log(reply);
});

// Get a value by key
client.get('framework', function(err, reply) {
    console.log(reply);
});

// Storing hashes (alternative)
client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');

client.hgetall('frameworks', function(err, object) {
    console.log(object);
});

// Storing hashes (alternative)
client.hmset('frameworks', {
    'javascript': 'AngularJS',
    'css': 'Bootstrap',
    'node': 'Express'
});

// Storing lists
client.rpush(['frameworks', 'angularjs', 'backbone'], function(err, reply) {
    console.log(reply); //prints 2
});

// Retrieving items from a list
client.lrange('frameworks', 0, -1, function(err, reply) {
    console.log(reply); // ['angularjs', 'backbone']
});

// Adding items to a set
client.sadd(['tags', 'angularjs', 'backbonejs', 'emberjs'], function(err, reply) {
    console.log(reply); // 3
});

// Retrieving set items
client.smembers('tags', function(err, reply) {
    console.log(reply);
});

// Checking the existence of keys
client.exists('frameworks', function(err, reply) {
    if (reply === 1) {
        console.log('exists');
    } else {
        console.log('doesn\'t exist');
    }
});

// Deleting keys
client.del('frameworks', function(err, reply) {
    console.log(reply);
});

// Setting then expiring keys
client.set('key1', 'val1');  // sets the pair:  key1/val1
client.expire('key1', 30);  // Sets a 30-second lifetime.