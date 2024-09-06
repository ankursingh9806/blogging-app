const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Blog = sequelize.define('Blog', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    publishedAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
});

module.exports = Blog;