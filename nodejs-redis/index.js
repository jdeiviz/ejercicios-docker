var os = require('os');
var koa = require('koa');
var redis = require('redis');

var ifaces = os.networkInterfaces();
var app = koa();

/* redis */
var host = 'redis';
var port = process.env.REDIS_PORT || 6379;
var client = redis.createClient(port, host);

var port = 3000;

app.use(function *(){
  console.log('Say Hello world');
	var content = 'Hello World ';

	client.incr('counter', function(err, result) {
    if (err) {
      return next(err);
    }

    content += result;
  });
	
	this.body = content;
});

app.listen(port);
console.log('Running with port:' + port);