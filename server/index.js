import express from 'express';
import http from 'http';
import socketio from 'socket.io';

import Game from './src/Game';

const app = express();
const server = http.Server(app);
const io = socketio.listen(server);

server.listen(8000, () => {
  console.log(`listening on at port ${server.address().port}`);
});

const game = new Game(io);

game.start();
