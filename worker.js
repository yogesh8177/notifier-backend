var request = require('request'),
    redis = require('redis'),
	tasksQueue = redis.createClient({ host: 'localhost', port: 6379 });

tasksQueue.subscribe('tasksChannel');

tasksQueue.on('message', function(channel, message){
	var json = JSON.parse(message);
	console.log('channel:', channel, 'message:', json);
	request.debug = true;
	setTimeout(function(){
		request.post('http://localhost:3001/notify', {form: {client: json.client, job: json.job, jobID: json.jobId}});
	}, 3000);
	
});