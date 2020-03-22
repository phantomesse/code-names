import express from 'express';
import cors from 'cors';
import { Server } from 'http';
import socketIO from 'socket.io';

import wordsController from './backend/words-controller';
console.log(wordsController.getWords());

const app: express.Application = express();

// Get whether the app is running in prod.
const isProd = process.argv.includes('--prod');

// Set the port.
const port = isProd ? process.env.PORT || 1337 : 1338;
app.set('port', port);

// Allow cross-origin in dev mode.
if (!isProd) {
  app.use(
    cors({
      origin: 'http://localhost:1337',
      optionsSuccessStatus: 200
    })
  );
}

app.get('/', (request, response) => {
  response.send('hello world');
});

// Listen on port.
const server = new Server(app);
server.listen(port, () => {
  if (isProd) console.log(`Live at http://localhost:${port}!`);
  else console.log(`Backend running on http://localhost:${port}`);
});
