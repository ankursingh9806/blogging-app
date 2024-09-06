const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const authentication = require('../middleware/authentication');

router.get('/get-user', authentication.authenticate, homeController.getUser);
router.get('/get-my-blogs', authentication.authenticate, homeController.getMyBlogs);
router.get('/get-popular-blogs', authentication.authenticate, homeController.getPopularBlogs);

module.exports = router;