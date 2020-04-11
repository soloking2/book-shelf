const express = require('express');
const bookController = require('../controller/library');

const router = express.Router();

router.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/auth/signin');
  }
});
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getSingle);


module.exports = router;
