import React, { Component } from 'react';
import openSocket from 'socket.io-client';

import './styles.css';

const socket = openSocket('http://localhost:8000');

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      config: {},
    };
  }

  componentDidMount() {
    socket.on('configuration', (config) => {
      this.setState({ config });
    });

    socket.on('sync', (players) => {
      this.setState({ players });
    });
  }

  emit() {
    const units = this.state.config.UNITS;

    const nb = Math.floor(Object.keys(units).length * Math.random());

    const id = Object.keys(units)[nb];
    console.log(nb, id);
    socket.emit('buyUnit', id);
  }

  render() {
    const { players } = this.state;

    const Players = players.map((player) => {
      const Units = player.units.map(u => (
        <div>
          <i>{u.type}</i> - {u.id} (hp : {u.hp} / position: {u.position})
        </div>
      ));

      return (
        <div>
          <h1>Player : {player.id}</h1>
          <div>HP : <b>{player.hp}</b></div>
          <div>Gold : <b>{player.gold}</b></div>
          <div>Position : <b>{player.position}</b></div>
          {Units}
          <button
            onClick={() => this.emit()}
          >
            New random unit
          </button>
        </div>
      );
    });

    return (
      <div className="App">
        <div className="App-header">
          <h2>Age of wars</h2>
        </div>
        <p className="App-intro">
          {Players}
        </p>
      </div>
    );
  }
}
