const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authController');
const passport = require('passport');

exports.signup = (req, res) => {
  const { username, password } = req.body;

  (async function signup() {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to server');
      const db = client.db(dbName);

      const col = await db.collection('users');
      const user = { username, password };
      const results = await col.insertOne(user);
      debug(req.body);
      req.login(results.ops[0], () => {
        res.redirect('/auth/profile');
      });
    } catch (error) {
      debug(error.stack);
    }
  }());
};


exports.profile = (req, res) => {
  res.json(req.user);
};

exports.signin = (req, res) => {
  res.render('signin', {
    pageTitle: 'Login'
  });
};

exports.login = (passport.authenticate('local', {
  successRedirect: '/auth/profile',
  failureRedirect: '/'
}));

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/auth/signin');
};
