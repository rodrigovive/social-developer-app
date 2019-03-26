const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

// @route GET api/users/test
// @desc Test users route
// @access Public
router.get('/test',controller.index);

// @route GET api/users/register
// @desc Register user
// @access Public
router.post('/register',controller.register);

// @route GET api/users/login
// @desc Login User / Returning Token
// @access Public
router.post('/login',controller.login);

// @route GET api/users/current
// @desc Return current user
// @access Private
router.post('/current', controller.passportAuthenticate, controller.current);

module.exports = router;