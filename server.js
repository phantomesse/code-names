const express = require('express');
const server = express();
const http = require('http').Server(server);
const io = require('socket.io')(http);
const sassMiddleware = require('node-sass-middleware')
const path = require('path');
const port = process.env.PORT || 1337;
const app = require('./app/app.js');
const Utils = require('./app/utils.js');

/** SASS compilations. */
server.use(sassMiddleware({
  debug: false,
  dest: 'public/css',
  force: true,
  outputStyle: 'compressed',
  prefix: '/css',
  root: __dirname,
  sourceMap: true,
  src: 'sass'
}));
server.use(express.static(path.join(__dirname, 'public')));

/** Serve index.html. */
server.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/public/index.html'));
});

/** Validates a given session name. */
server.get('/validate-session-name', function(request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.send(
    JSON.stringify(Utils.validateSessionName(request.query.sessionName)));
});

server.get('/does-session-exist', function(request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.send(
    JSON.stringify({
      exists: app.doesGameSessionExist(request.query.sessionName)
    }));
});

/** Returns data for a game session. */
server.get('/session', function(request, response) {
  response.setHeader('Content-Type', 'application/json');
  const sessionName = request.query.sessionName;

  // Validate session name.
  const validation = Utils.validateSessionName(sessionName);
  if (!validation.isValid) {
    response.send(JSON.stringify({
      error: 'session name is invalid'
    }));
  }

  response.send(JSON.stringify(app.createGameSession(sessionName)));
});

/** Handle socket.io connections. */
io.on('connection', function(socket) {
  //console.log('a user connected');

  socket.on('disconnect', function() {
    //console.log('user disconnected');
  });

  socket.on('flip word', function(word, sessionName) {
    app.getGameSession(sessionName).flipWord(word);
    socket.broadcast.emit('flip word', word, sessionName);
  });

  socket.on('reset cards', function(sessionName) {
    app.getGameSession(sessionName).reset();
    console.log(app.getGameSession(sessionName));
    socket.broadcast.emit('reset cards', sessionName);
  });
});

/** Start up server. */
http.listen(port, function() {
  console.log(`listening on localhost:${port}`);
});
