# Notifier Backend

## Nodejs,Socket.io & redis
Notifier backend for a notification service.

**Backend is composed of three components**

1. Server: Responsible to fetch jobs from client and forward them to worker.
2. Worker: Responsible to process job and foward completed job to notifier service.
3. Notifier: This service pushes the notification to the client regarding completed jobs.

Run the components as follows:

1. ```node server.js```
2. ```node worker.js```
3. ```node notifier.js```



