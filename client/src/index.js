/* eslint-disable import/no-extraneous-dependencies,no-undef,global-require */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Players from './components/Players';
import './index.css';

class App {
  constructor() {
    render(
      <AppContainer>
        <Players />
      </AppContainer>,
      document.getElementById('root'),
    );

    if (module.hot) {
      module.hot.accept('./components/Players', () => {
        require('./components/Players');
        render(
          <AppContainer>
            <Players />
          </AppContainer>,
          document.getElementById('root'),
        );
      });
    }
  }
}

export default new App();
