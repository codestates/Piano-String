const express = require('express');

const router = express.Router();

const { articleController } = require('../controller');

router.get('/', articleController.article.get);
router.post('/', articleController.article.post);

router.get('/:uuid', articleController.uuid.get);
router.patch('/:uuid', articleController.uuid.patch);
router.delete('/:uuid', articleController.uuid.delete);



module.exports = router;
