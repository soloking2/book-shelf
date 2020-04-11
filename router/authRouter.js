const express = require('express');

const router = express.Router();

const authController = require('../controller/authController');

router.post('/signup', authController.signup);
router.route('/profile')
  .all((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  })
  .get(authController.profile);
router.route('/signin')
  .get(authController.signin)
  .post(authController.login);

router.get('/logout', authController.logout);

module.exports = router;
