/* eslint-disable no-plusplus,no-param-reassign */

import { find, orderBy } from 'lodash';

import * as config from '../config';

import Player from './Player';

const { DIRECTIONS } = config;

export default class Game {
  constructor(io) {
    this.isInitialised = false;
    this.io = io;

    this.players = [];

    this.lastID = 0;
    this.lastSend = {};
  }

  get json() {
    return {
      players: this.players.map(p => p.json),
    };
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
    this.players.forEach((p) => {
      p.units = orderBy(p.units, 'position', DIRECTIONS[p.id] === -1 ? 'asc' : 'desc');
    });

    const [p1, p2] = this.players;

    if (p1) {
      p1.units.forEach((u, i, units) => {
        const closeEnemyUnit = p2 && p2.units.length ? p2.units[0] : null;
        if (closeEnemyUnit && closeEnemyUnit.position - u.position <= u.range) {
          u.attack(closeEnemyUnit);
        } else if (i === 0 || units[i - 1].position - u.position > u.speed) {
          u.move();
        }
      });
    }

    if (p2) {
      p2.units.forEach((u, i, units) => {
        const closeEnemyUnit = p1 && p1.units.length ? p1.units[0] : null;
        if (closeEnemyUnit && u.position - closeEnemyUnit.position <= u.range) {
          u.attack(closeEnemyUnit);
        } else if (i === 0 || u.position - units[i - 1].position > u.speed) {
          u.move();
        }
      });
    }

    console.log(this.players.map(p => p.units.map(u => u.id + ' ' + u.position)));
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
        const u = this.getPlayer(id);
        if (u) {
          console.log('buyUnit', unitId);
          this.getPlayer(id).buyUnit(unitId);
        }
      });
    });
    this.isInitialised = true;
  }

  start() {
    if (!this.isInitialised) {
      this.init();
    }
    setInterval(() => this.loop(), 10000 / config.FPS);
  }
}
