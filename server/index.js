const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const passport = require('passport');
const secrets = require('./config/secrets');
const webpack = require('webpack');
const Promise = require('bluebird');
const app = express();

// Find the appropriate database to connect to, default to localhost if not found.
const connect = () => {
  mongoose.connect(secrets.db, (err) => {
    if (err) {
      console.log(`Error connecting to: ${secrets.db}. ${err}`);
    } else {
      console.log(`Succeeded connected to: ${secrets.db}`);
    }
  });
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(`${__dirname}/models`).forEach((file) => {
  if (~file.indexOf('.js')) require(`${__dirname}/models/${file}`);
});

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  const config = require('../webpack/webpack.config.dev-client.js');
  const compiler = webpack(config);
  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
    })
  );

  app.use(require('webpack-hot-middleware')(compiler));
}

// Bootstrap passport config
require('./config/passport')(app, passport);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);

app.listen(app.get('port'));

module.exports = {connect, app};
