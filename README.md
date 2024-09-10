# Blogging App

A full-featured blogging platform that allows users to create, edit, and publish blogs, as well as view posts written by others.

## Features

- **Responsive Design**: Optimized for both mobile and desktop using modern web standards (e.g., HTML5, CSS3, and responsive frameworks).
- **Authentication**: Token-based authentication using JSON Web Token (JWT) to ensure secure access.
- **Sign Up**: Users can register by providing their name, email, and password.
- **Login**: Registered users can log in using their email and password.
- **Password Reset**: Users can reset their password by receiving a reset link via their registered email.
- **Create Blog**: Users can write and publish blogs using the Quill Text Editor, which supports rich text formatting.
- **View Blogs**: Users can view their own published blogs and read blogs written by other users.
- **Edit Blog**: Users can edit their previously published blogs with the Quill Text Editor.
- **Delete Blogs**: Users have the ability to delete their own blogs.
- **View Popular Blogs**: Users can explore and view blogs written by others.
- **User Profile Management**: Users can update their profile information (name and email) and delete their account if desired.
- **Logout**: Users can securely log out of the application. Logging back in requires re-entering the password.

## Technology Stack

- **Backend**: Node.js, Express
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap, 
- **Authentication**: JSON Web Token (JWT)
- **Database**: MySQL with Sequelize ORM
- **Cloud Services**: AWS (for deployment)
- **Email Service**: Nodemailer
- **Editor**: Quill Text Editor
- **Other Tools**: Axios, Bcrypt, CORS, Dotenv, Helmet, Morgan, UUID 

## APIs Used

### Base URL - `http://localhost:3000/`

### User Endpoints

- `GET /user/welcome-page` - Retrieves the welcome page.
- `GET /user/signup-page` - Retrieves the sign-up page.
- `GET /user/login-page` - Retrieves the login page.
- `POST /user/signup` - Allows users to sign up by providing name, email, and password.
- `POST /user/login` - Logs in users using their email and password.
- `POST /user/logout` - Logs out the current user and invalidates the session.

### Password Endpoints

- `GET /password/forgot-password-page` - Retrieves the forgot password page.
- `POST /password/forgot-password` - Sends a password reset link to the user's registered email.
- `GET /password/reset-password-page/:resetId ` - Retrieves the reset password page using a unique reset token (UUID `resetId`).
- `POST /password/reset-password/:resetId` - Resets the user's password using the reset token (UUID `resetId`).

### Home Endpoints

- `GET /home/get-user` - Retrieves the logged-in user's basic data (e.g., name).
- `GET /home/get-my-blogs` - Retrieves all blogs created by the logged-in user.
- `GET /home/get-popular-blogs` - Retrieves a list of popular blogs written by other users.

### Profile Endpoints

- `GET /profile/profile-get` - Retrieves the logged-in user's profile data (name and email).
- `PUT /profile/profile-update` - Updates the user's profile information (name and email).
- `DELETE /profile/profile-delete` - Deletes the user's account along with all associated data.

### Blog Endpoints

- `POST /blog/publish-blog` - Publishes a new blog post created by the user.
- `GET /blog/view-my-blog/:blogId` - Retrieves a specific blog created by the user, identified by `blogId`.
- `DELETE /blog/delete-my-blog/:blogId` - Deletes a blog post created by the user, identified by `blogId`.
- `PUT /blog/update-my-blog/:blogId` - Updates a blog post created by the user, identified by `blogId`.
- `GET /blog/view-popular-blog/:blogId` - Retrieves a specific blog written by another user, identified by `blogId`.

## Screenshots

### welcome page
![welcome](/screenshots/01-welcome.png)

### signup page
![signup](/screenshots/02-signup.png)

### login page
![login](/screenshots/03-login.png)

### forgot password page
![forgotPassword](/screenshots/04-forgotPassword.png)

### reset password link send
![resetPasswordLinkSend](/screenshots/05-resetPasswordLinkSend.png)

### reset password link 
![resetPasswordLink](/screenshots/06-resetPasswordLink.png)

### change password 
![changePassword](/screenshots/07-changePassword.png)

### password changed
![passwordChanged](/screenshots/08-passwordChanged.png)

### home page 1
![home1](/screenshots/09-home1.png)

### home page 2
![home2](/screenshots/10-home2.png)

### profile page
![profile](/screenshots/11-profile.png)

### publish blog page
![publishBlog](/screenshots/12-publishBlog.png)

### view my blog
![viewMyBlog](/screenshots/13-viewMyBlog.png)

### view popular blog
![viewPopularBlog](/screenshots/14-viewPopularBlog.png)