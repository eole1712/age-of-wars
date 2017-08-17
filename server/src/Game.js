/* eslint-disable no-plusplus,no-param-reassign */

import { find } from 'lodash';

import * as config from '../config';
import Player from './Player';

export default class Game {
  constructor(io) {
    this.isInitialised = false;
    this.io = io;

    this.players = [];
    this.lastID = 0;
  }

  get json() {
    return this.players.map(p => p.json);
  }

  addPlayer(p) {
    this.players.push(p);
  }

  removePlayer(playerId) {
    this.players = this.players.filter(p => p.id !== playerId);
  }

  getPlayer(playerId) {
    return find(this.players, { id: playerId });
  }

  sync() {
    this.io.emit('sync', this.json);
  }

  loop() {
    this.sync();
  }

  init() {
    this.io.on('connection', (socket) => {
      console.log('User connected');
      if (this.players.length === 2) {
        socket.emit('disconnect');
        console.log('Too much players');
      }

      socket.emit('configuration', config);
      const id = this.players.length ? 'TWO' : 'ONE';

      const user = new Player(id);

      this.addPlayer(user);
      this.sync();

      socket.on('disconnect', () => {
        this.removePlayer(id);
      });

      socket.on('buyUnit', (unitId) => {
        console.log('buyUnit', unitId);
        this.getPlayer(id).buyUnit(unitId);
        this.sync();
      });
    });
    this.isInitialised = true;
  }

  start() {
    if (!this.isInitialised) {
      this.init();
    }
    // setInterval(() => this.loop(), 1000 / config.FPS);
  }
}
