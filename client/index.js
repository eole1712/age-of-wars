/* eslint-disable global-require,import/no-extraneous-dependencies */

const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.Server(app);

const isDevelopment = process.argv.indexOf('--development') !== -1;

if (isDevelopment) {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');

  const compiler = webpack(webpackConfig);
  console.log('compile');

  app.use(require('webpack-dev-middleware')(compiler, {
    hot: true,
    stats: {
      colors: true,
    },
  }));
  app.use(require('webpack-hot-middleware')(compiler));
} else {
  app.use(express.static(path.resolve(__dirname, '/build')));
}

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '/build/index.html'));
});

server.listen(3000, () => {
  console.log(`listening on at port ${server.address().port}`);
});
