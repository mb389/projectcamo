const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const secrets = require('./secrets');
const flash = require('express-flash');
const methodOverride = require('method-override');

module.exports = (app, passport) => {
  app.set('port', process.env.PORT || 3000);

  // X-Powered-By header has no functional value.
  // Keeping it makes it easier for an attacker to build the site's profile
  // It can be removed safely
  app.disable('x-powered-by');
  app.set('views', path.join(__dirname, '..', 'views'));

  app.set('view cache', false);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, '../..', 'public')));

  app.set('trust proxy', 'loopback');

  const sess = {
    resave: true,
    saveUninitialized: false,
    secret: secrets.sessionSecret,
    proxy: true, // The "X-Forwarded-Proto" header will be used.
    name: 'sessionId',
    // Add HTTPOnly, Secure attributes on Session Cookie
    // If secure is set, and you access your site over HTTP, the cookie will not be set
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: new MongoStore({
      url: secrets.db,
      autoReconnect: true,
    }),
  };

  /* eslint-disable */
  const node_env = process.env.NODE_ENV;
  console.log('--------------------------');
  console.log('===> 😊  Starting Server . . .');
  console.log(`===>  Environment: ${node_env}`);
  if (node_env === 'production') {
    console.log('===> 🚦  Note: In order for authentication to work in production');
    console.log('===>           you will need a secure HTTPS connection');
    sess.cookie.secure = true; // Serve secure cookies
  }

  app.use(session(sess));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());
};
