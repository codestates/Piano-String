const express = require('express');

const router = express.Router();

const { userController } = require('../controller');

router.get('/:uuid', userController.uuid.get);
router.patch('/:uuid', userController.uuid.patch);
router.delete('/:uuid', userController.uuid.delete);
router.post('/sign-in', userController.signin.post);
router.post('/sign-up', userController.signup.post);

module.exports = router;
