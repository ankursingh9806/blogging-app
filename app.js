require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const sequelize = require('./utils/database');
const userRoute = require('./routes/userRoute');
const resetPasswordRoute = require('./routes/resetPasswordRoute');
const homeRoute = require('./routes/homeRoute');
const profileRoute = require('./routes/profileRoute');
const blogRoute = require('./routes/blogRoute');

const User = require('./models/userModel')
const ResetPassword = require('./models/resetPasswordModel');
const Blog = require('./models/blogModel');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "https://cdn.quilljs.com"],
            styleSrc: ["'self'", "https://cdn.jsdelivr.net", "https://cdn.quilljs.com", "'unsafe-inline'"],
        }
    }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

app.use('/user', userRoute);
app.use('/password', resetPasswordRoute);
app.use('/home', homeRoute);
app.use('/profile', profileRoute);
app.use('/blog', blogRoute);

// undefined route
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "welcome.html"));
});

User.hasMany(ResetPassword, { foreignKey: 'userId' });
ResetPassword.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Blog, { foreignKey: 'userId' });
Blog.belongsTo(User, { foreignKey: 'userId' });

sequelize
    // .sync({ force: true })
    .sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Node.js application is connected to MySQL');
            console.log('Server is running on port 3000');
        });
    })
    .catch((err) => {
        console.error('Error connecting to MySQL:', err);
    });