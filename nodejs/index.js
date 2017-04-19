var os = require('os');
var koa = require('koa');

var ifaces = os.networkInterfaces();
var app = koa();

var port = 3000;

app.use(function *(){
  console.log('Say Hello world');
  var content = 'Hello World\n\n';

  	Object.keys(ifaces).forEach(function (ifname) {
	  var alias = 0;

	  ifaces[ifname].forEach(function (iface) {
	    if ('IPv4' !== iface.family || iface.internal !== false) {
	      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
	      return;
	    }

	    if (alias >= 1) {
	      // this single interface has multiple ipv4 addresses
	      content += ifname + ':' + alias + ' ' + iface.address + '\n';
	    } else {
	      // this interface has only one ipv4 adress
	      content += ifname + ' ' + iface.address + '\n';
	    }
	    ++alias;
	  });
	});

	this.body = content;
  });

app.listen(port);
console.log('Running with port:' + port);