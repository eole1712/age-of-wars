/* eslint-disable no-param-reassign,react/prop-types */
import React, { Component } from 'react';
import openSocket from 'socket.io-client';

// import Screen from '../Screen';

const socket = openSocket('http://localhost:8000');

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      config: {},
    };

    this.emit = this.emit.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  componentDidMount() {
    socket.on('configuration', config => this.updateState({ config }));
    socket.on('sync', players => this.updateState({ players }));
  }

  updateState(newState) {
    this.setState(prev => ({ ...prev, newState }));
  }

  emit() {
    console.log(this.state);
    const units = this.state.config.UNITS;

    const nb = Math.floor(Object.keys(units).length * Math.random());
    const id = Object.keys(units)[nb];

    socket.emit('buyUnit', id);
  }

  render() {
    console.log('Render game');
    setTimeout(() => {
      this.emit();
    }, 2000);
    return (
      // <Screen onClick={this.emit} />
      <div />
    );
  }
}

export default Game;
