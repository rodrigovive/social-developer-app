const express = require('express');
const userRouter = require('./resources/user/user.restRouter');

const router = express.Router();
router.use('/users',userRouter);

module.exports = router;