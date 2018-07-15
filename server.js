const express = require('express');
const server = express();
const http = require('http').Server(server);
const io = require('socket.io')(http);
const sassMiddleware = require('node-sass-middleware')
const path = require('path');
const app = require('./app/app.js');
const port = process.env.PORT || 1337; 

// SASS compilations.
server.use(sassMiddleware({
  debug: true,
  dest: 'public/css',
  force: true, 
  outputStyle: 'compressed',
  prefix: '/css',
  root: __dirname,
  sourceMap: true,
  src: 'sass'
}));
server.use(express.static(path.join(__dirname, 'public')));

// Serve index.html.
server.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/public/index.html'));
});

// Check if a game session exists based on a given session name.
server.get('/game-session-exists', function(request, response) {
  var exists = app.doesGameSessionExist(request.query.sessionName);
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({'exists': exists}));
});

// Get GameSession object for a given session name.
server.get('/game-session', function(request, response) {
  var gameSession = app.getGameSession(request.query.sessionName);
  console.log(request.query.sessionName);
  console.log(gameSession);
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(gameSession));
}); 

// Handle socket.io connections.
io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('join session name', function(sessionName) {
    app.joinSession(sessionName);
  });
});

// Start up server.
http.listen(port, function(){
  console.log(`listening on localhost:${port}`);
});
