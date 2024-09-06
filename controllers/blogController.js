const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const sequelize = require('../utils/database');

const publishBlog = async (req, res, next) => {
    try {
        const { title, content, publishedAt } = req.body;
        const newBlog = await Blog.create({
            title: title,
            content: content,
            publishedAt: publishedAt,
            userId: req.user.id
        });
        res.status(201).json({ newBlog, message: 'blog published' });
    } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: 'internal server error' });
    }
};

const viewMyBlog = async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findOne({
            where: { id: blogId, userId: req.user.id },
            include: [{ model: User, attributes: ['name'] }]
        });
        if (!blog) {
            return res.status(404).json({ message: 'blog not found' });
        }
        res.status(200).json({ blog });
    } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: 'internal server error' });
    }
};

const deleteMyBlog = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { blogId } = req.params;
        const result = await Blog.destroy({ where: { id: blogId, userId: req.user.id } });
        if (result) {
            await t.commit();
            res.status(200).json({ message: 'blog deleted' });
        } else {
            await t.rollback();
            res.status(404).json({ message: 'blog not found' });
        }
    } catch (err) {
        await t.rollback();
        console.error('error:', err);
        res.status(500).json({ error: 'internal server error' });
    }
};

const updateMyBlog = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { blogId } = req.params;
        const { title, content, updatedAt } = req.body;
        const blogData = await Blog.findOne({ where: { id: blogId, userId: req.user.id } });
        if (!blogData) {
            return res.status(404).json({ message: 'blog not found' });
        }
        const updatedBlogData = {
            title,
            content,
            updatedAt
        };
        await Blog.update(updatedBlogData, { where: { id: blogId, userId: req.user.id } });
        await t.commit();
        res.status(200).json({ message: 'blog updated' });
    } catch (err) {
        await t.rollback();
        console.error('error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const viewPopularBlog = async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findOne({
            where: { id: blogId },
            include: [{ model: User, attributes: ['name'] }]
        });
        if (!blog) {
            return res.status(404).json({ message: 'blog not found' });
        }
        res.status(200).json({ blog });
    } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: 'internal server error' });
    }
};

module.exports = {
    publishBlog,
    viewMyBlog,
    deleteMyBlog,
    updateMyBlog,
    viewPopularBlog
}