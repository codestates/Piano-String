const express = require('express');

const router = express.Router();

const { announcementController } = require('../controller');

router.get('/', announcementController.announcement.get);
router.post('/', announcementController.announcement.post);
router.get('/:uuid', announcementController.uuid.get);
router.patch('/:uuid', announcementController.uuid.patch);
router.delete('/:uuid', announcementController.uuid.delete);

module.exports = router;
