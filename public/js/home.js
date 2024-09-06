// home
document.querySelector('.create-blog-button').addEventListener('click', function () {
    window.location.href = '../html/createBlog.html';
});
document.addEventListener('DOMContentLoaded', getUser);
document.addEventListener('DOMContentLoaded', getMyBlogs);
document.addEventListener('DOMContentLoaded', getPopularBlogs);

async function getUser() {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/home/get-user', {
            headers: {
                Authorization: token
            }
        });
        if (res.status === 200) {
            const user = res.data.user;
            document.querySelector('.welcome-heading').innerHTML = `Hello, <span style="color: #198754;">${user.name}</span>! Ready to share your next post?`;
        } else {
            console.log('failed to load user');
        }
    } catch (err) {
        console.error('error in loading user:', err);
    }
}

async function getMyBlogs() {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/home/get-my-blogs', {
            headers: { Authorization: token }
        });
        if (res.status === 200) {
            res.data.blogs.forEach((blog) => {
                showMyBlogsOnScreen(blog);
            });
        } else {
            console.log('failed to load my blogs');
        }
    } catch (err) {
        console.error('error in loading my blogs:', err);
    }
}

async function getPopularBlogs() {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/home/get-popular-blogs', {
            headers: { Authorization: token }
        });
        if (res.status === 200) {
            res.data.blogs.forEach((blog) => {
                showPopularBlogsOnScreen(blog);
            });
        } else {
            console.log('failed to load popular blogs');
        }
    } catch (err) {
        console.error('error in loading popular blogs:', err);
    }
}