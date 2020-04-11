const express = require('express');

const router = express.Router();

const adminRoutes = require('../controller/admin');

router.get('/', adminRoutes.addBook);

module.exports = router;
