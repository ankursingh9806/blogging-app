const User = require('../models/userModel');
const { Op } = require('sequelize');
const sequelize = require('../utils/database');

const profileGet = async (req, res, next) => {
    try {
        const profile = await User.findOne({ where: { id: req.user.id } });
        res.status(200).json({ profile, message: 'profile fetched' });
    } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: 'internal server error' });
    }
};

const profileUpdate = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { name, email } = req.body;
        const existingUser = await User.findOne({ where: { email: email, id: { [Op.ne]: req.user.id } } });
        if (existingUser) {
            return res.status(400).json({ message: 'account already' });
        }
        const updatedUser = await User.update({ name: name, email: email }, { where: { id: req.user.id } });
        await t.commit();
        res.status(200).json({ profile: updatedUser, message: 'profile updated' });
    } catch (err) {
        await t.rollback();
        console.error('error:', err);
        res.status(500).json({ error: 'internal server error' });
    }
};

const profileDelete = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        await user.destroy();
        await t.commit();
        res.status(200).json({ message: 'profile deleted' });
    } catch (err) {
        await t.rollback();
        console.error('error:', err);
        res.status(500).json({ error: 'internal server error' });
    }
};

module.exports = {
    profileGet,
    profileUpdate,
    profileDelete,
};