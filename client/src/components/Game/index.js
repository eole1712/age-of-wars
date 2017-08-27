/* eslint-disable no-param-reassign,react/prop-types */
import React, { Component } from 'react';

import { flatMapDepth } from 'lodash';
import socket from '../../helpers/socket';

import Screen from '../Screen';


class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      config: {},
    };

    this.emit = this.emit.bind(this);
  }

  componentDidMount() {
    socket.on('configuration', config => this.setState({ config }));
    socket.on('sync', players => this.setState({ players }));
  }

  emit() {
    const units = this.state.config.UNITS;

    const nb = Math.floor(Object.keys(units).length * Math.random());
    const id = Object.keys(units)[nb];

    socket.emit('buyUnit', id);
  }

  render() {
    return (
      <Screen
        onClick={this.emit}
        units={flatMapDepth(this.state.players, p => p.units)}
        socket={this.socket}
      />
    );
  }
}

export default Game;
