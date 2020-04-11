const passport = require('passport');
const debug = require('debug')('app:localStrategy');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');

module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  (username, password, done) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;

      try {
        client = await MongoClient.connect(url);
        debug('Connecting to server');

        const db = client.db(dbName);

        const col = await db.collection('users');

        const user = await col.findOne({ username });
        debug(user.password);

        if (user.password === password) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  }));
};
