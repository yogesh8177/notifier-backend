var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    bodyParser = require('body-parser'),
	io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('node_modules/socket.io-client'));

app.get('/', function(request, response){
	response.sendFile(__dirname+"/index.html");
});

app.post('/notify', function(request, response){

	if (request.body && request.body.client && request.body.job) {
		var client = io.sockets.connected[request.body.client];
		if(client){
			console.log('will send notification to:', request.body.client);
			client.emit('notification', request.body);

			response.type('text/plain');
			response.send('Result broadcast to client.' + Date.now());
		}else{
			console.log('cannot find client to notify');
			response.status(500).send('cannot find client to notify');
		}
	}else{
		response.status(403).send('client Id is required');
	}
});

io.on('connection', function(socket){
	console.log('Client connected: '+socket.id);
	socket.emit('register', socket.id);

});

server.listen(3001, function(){
    console.log('notifier instance started');
});
