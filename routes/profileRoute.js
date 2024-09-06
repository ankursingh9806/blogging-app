const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');
const authentication = require('../middleware/authentication');

router.get('/profile-get', authentication.authenticate, profileController.profileGet);
router.put('/profile-update', authentication.authenticate, profileController.profileUpdate);
router.delete('/profile-delete', authentication.authenticate, profileController.profileDelete);

module.exports = router;