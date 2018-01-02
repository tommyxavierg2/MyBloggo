var http = require('http');
const Pusher = require('pusher');

var pusher = new Pusher({
  appId: '451092',
  key: 'dc27cdf64618a574090d',
  secret: 'e2792e996aeadf579844',
  cluster: 'us2',
  encrypted: true
});

var server = http.createServer().listen(8000);

server.on('request', function (req, res) {
    if (req.method == 'POST') {
        var body = '';
    }

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        pusher.trigger('notifications', 'new-notification', {
          message: body
        });
        console.log(body);
        res.writeHead(200, {'Content-Type': 'text/plain'});
    });
});

console.log('Listening on port 8000');
