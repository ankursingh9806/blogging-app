const User = require('../models/userModel');
const Blog = require('../models/blogModel');
const { Op } = require('sequelize');

const getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        res.status(200).json({ user, message: 'user data sent' });
    } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: 'internal server error' });
    }
};

const getMyBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.findAll({
            where: { userId: req.user.id },
            order: [['publishedAt', 'DESC']]
        });
        res.status(200).json({ blogs, message: 'user blogs sent' });
    } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: 'internal server error' });
    }
};

const getPopularBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.findAll({
            where: { userId: { [Op.ne]: req.user.id } },
            include: [{ model: User, attributes: ['name'] }],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({ blogs });
    } catch (error) {
        console.error('error:', error);
        res.status(500).json({ message: 'internal server error' });
    }
};

module.exports = {
    getUser,
    getMyBlogs,
    getPopularBlogs,
}