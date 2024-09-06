const express = require('express');
const router = express.Router();

const blogController = require('../controllers/blogController');
const authentication = require('../middleware/authentication');

router.post('/publish-blog', authentication.authenticate, blogController.publishBlog);
router.get('/view-my-blog/:blogId', authentication.authenticate, blogController.viewMyBlog);
router.delete('/delete-my-blog/:blogId', authentication.authenticate, blogController.deleteMyBlog);
router.put('/update-my-blog/:blogId', authentication.authenticate, blogController.updateMyBlog);
router.get('/view-popular-blog/:blogId', authentication.authenticate, blogController.viewPopularBlog);

module.exports = router;