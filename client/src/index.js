/* eslint-disable import/no-extraneous-dependencies,no-undef,global-require */

import React from 'react';
import ReactDOM from 'react-dom';

import Game from './components/Game';

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root'),
  );
};

render(Game);
