/* eslint-disable import/no-extraneous-dependencies,no-undef,global-require */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Game from './components/Game';
import './index.css';

class App {
  constructor() {
    render(
      <AppContainer>
        <Game />
      </AppContainer>,
      document.getElementById('root'),
    );

    if (module.hot) {
      module.hot.accept('./components/Game', () => {
        console.log('hot call');
        render(
          <AppContainer>
            <Game />
          </AppContainer>,
          document.getElementById('root'),
        );
      });
    }
  }
}

export default new App();
