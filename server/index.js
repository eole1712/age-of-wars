import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import path from 'path';

import Game from './core/Game';

const app = express();
const server = http.Server(app);
const io = socketio.listen(server);

app.get('/', (req, res) => {
  res.sendFile(path.resolve('client/index.html'));
});

server.listen(3000, () => {
  console.log(`listening on at port ${server.address().port}`);
});

const game = new Game(io);

game.start();
