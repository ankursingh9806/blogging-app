const User = require('../models/userModel');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const welcomePage = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'welcome.html'));
    } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: 'internal server error' });
    }
};

const signupPage = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'signup.html'));
    } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: 'internal server error' });
    }
};

const loginPage = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'));
    } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: 'internal server error' });
    }
};

const generateAccessToken = (id, email) => {
    const payload = {
        userId: id,
        email: email
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return token;
};

const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(409).json({ message: 'user already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name: name,
            email: email,
            password: hashedPassword
        };
        await User.create(newUser);
        res.status(201).json({ message: 'user signed up' });
    } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: 'internal server error' });
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ where: { email: email } });
        if (!existingUser) {
            return res.status(404).json({ message: 'user not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'incorrect password' });
        }
        const token = generateAccessToken(existingUser.id, existingUser.email);
        res.status(200).json({ message: 'user logged in', token: token });
    } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: 'internal server error' });
    }
}

const logout = async (req, res, next) => {
    try {
        res.status(200).json({ message: 'user logged out' });
    } catch (err) {
        console.error('error:', err);
        res.status(500).json({ error: 'internal server error' });
    }
};

module.exports = {
    welcomePage,
    signupPage,
    loginPage,
    generateAccessToken,
    signup,
    login,
    logout
}