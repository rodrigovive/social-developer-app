const express = require('express');
const userRouter = require('./resources/user/user.restRouter');

const router = express.Router();
router.use('/user',userRouter);

module.exports = router;