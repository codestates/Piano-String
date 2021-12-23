const router = require('express').Router();

const announcementRouter = require('./announcement');
const articleRouter = require('./article');
const userRouter = require('./user');
const { authController } = require('../controller');

router.use('/announcement', announcementRouter);
router.use('/article', articleRouter);
router.use('/user', userRouter);
router.get('/auth', authController.post);

module.exports = router;
