/** Important **/

module.exports = {
  // Find the appropriate database to connect to, default to localhost if not found.
  db: process.env.MONGOHQ_URL || 'mongodb://heroku_9zz6xx3z:ndk3uatkjljejmeoistrvq2m0b@ds025439.mlab.com:25439/heroku_9zz6xx3z' || 'mongodb://localhost/camo',
  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',
  google: {
    clientID: process.env.GOOGLE_CLIENTID || '62351010161-eqcnoa340ki5ekb9gvids4ksgqt9hf48.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || '6cKCWD75gHgzCvM4VQyR5_TU',
    callbackURL: process.env.GOOGLE_CALLBACK || "/auth/google/callback"
  }
};
