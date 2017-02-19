var express = require('express'),
	app = express(),
	cors = require('cors'),
	server = require('http').Server(app),
	redis = require('redis'),
	bodyParser = require('body-parser'),
	tasksQueue = redis.createClient({ host: 'localhost', port: 6379 });


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/job', function(request, response){
	console.log(request.body);
	if(request.body && request.body.ID && request.body.message){
		tasksQueue.publish('tasksChannel', 
			JSON.stringify({
							  client: request.body.ID,
							  job: request.body.message,
							  jobId: request.body.jobID
						   }));
		response.type('application/json');
		response.send({data: 'success'});
	}else{
		response.type('application/json');
		response.send({error: 'error'});
	}
	
});


server.listen(3000, function(){
	console.log('Server listening on port 3000');
});