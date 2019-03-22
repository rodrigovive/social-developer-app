const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

// @route GET api/user/test
// @desc Test users route
// @access Public

router.get('/test',controller.index);

module.exports = router;