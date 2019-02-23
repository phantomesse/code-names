const express = require('express');
const server = express();
const http = require('http').Server(server);
const io = require('socket.io')(http);
const sassMiddleware = require('node-sass-middleware')
const path = require('path');
const app = require('./app/app.js');
const port = process.env.PORT || 1337;

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

/** Check if a game session exists based on a given session name. */
server.get('/session-names', function(request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(app.getGameSessions()));
});

/** Check if a game session exists based on a given session name. */
server.get('/game-session-exists', function(request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({
    'exists': app.doesGameSessionExist(request.query.sessionName)
  }));
});

/**
 * Get GameSession object for a given session name.
 *
 * If the GameSession does not already exist, create one.
 */
server.get('/game-session', function(request, response) {
  response.setHeader('Content-Type', 'application/json');

  // Get the session name from the request.
  const sessionName = request.query.sessionName;

  // Return an error if the session name is invalid.
  if (sessionName === undefined) {
    response.send(JSON.stringify({
      error: 'session name is undefined'
    }));
    return;
  }

  // Create session if it doesn't exist.
  const gameSession = app.createGameSession(sessionName);

  // Return GameSession as a JSON.
  response.send(JSON.stringify(gameSession));
});

/**
 * Generate new cards for a given game session.
 */
server.get('/reset', function(request, response) {
  response.setHeader('Content-Type', 'application/json');

  // Get the session name from the request.
  const sessionName = request.query.sessionName;

  // Return an error if the session name is invalid.
  if (!app.doesGameSessionExist(sessionName)) {
    response.send(JSON.stringify({
      error: 'session name does not exist'
    }));
    return;
  }

  const gameSession = app.getGameSession(sessionName);
  gameSession.reset();

  // Return GameSession as a JSON.
  response.send(JSON.stringify(gameSession));
});

/**
 * Get number of cards left for each team for a given game session.
 */
server.get('/cards-left', function(request, response) {
  response.setHeader('Content-Type', 'application/json');

  // Get the session name from the request.
  const sessionName = request.query.sessionName;

  // Return an error if the session name is invalid.
  if (!app.doesGameSessionExist(sessionName)) {
    response.send(JSON.stringify({
      error: 'session name does not exist'
    }));
    return;
  }

  // Return cards left as a JSON.
  response.send(JSON.stringify(app.getGameSession(sessionName).getCardsLeft()));
});

/** Handle socket.io connections. */
io.on('connection', function(socket) {
  //console.log('a user connected');

  socket.on('disconnect', function() {
    //console.log('user disconnected');
  });

  socket.on('flip word', function(word, sessionName) {
    console.log(`flipped word (${word}) in session (${sessionName})`);
    app.getGameSession(sessionName).flipWord(word);
    socket.broadcast.emit('flip word', word, sessionName);
  });
});

/** Start up server. */
http.listen(port, function() {
  console.log(`listening on localhost:${port}`);
});
