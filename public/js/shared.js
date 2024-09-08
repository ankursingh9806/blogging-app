// shared code
document.querySelector('.navbar-brand').addEventListener('click', function () {
    window.location.href = '../html/home.html';
});

document.querySelector('.profile-button').addEventListener('click', function () {
    window.location.href = '../html/profile.html';
});

document.querySelector('.logout-button').addEventListener('click', logout);

async function logout() {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.post('http://localhost:3000/user/logout', {}, {
            headers: {
                Authorization: token
            }
        });
        if (res.status === 200) {
            localStorage.removeItem('token');
            window.location.href = '../html/login.html';
        } else {
            console.error('failed to logout');
        }
    } catch (err) {
        console.error('error in logout:', err);
    }
}

// show on screen
function showMyBlogsOnScreen(blog) {
    const blogContainer = document.createElement('div');

    const blogTitle = document.createElement('a');
    blogTitle.classList.add('my-blog-title');
    blogTitle.textContent = blog.title;
    blogTitle.href = `../html/viewMyBlog.html?blogId=${blog.id}`;
    blogContainer.appendChild(blogTitle);

    document.querySelector('.my-blog-section').appendChild(blogContainer);
}

function showPopularBlogsOnScreen(blog) {
    const blogContainer = document.createElement('div');

    const popularBlogTitle = document.createElement('a');
    popularBlogTitle.classList.add('popular-blog-title');
    popularBlogTitle.textContent = blog.title;
    popularBlogTitle.href = `../html/viewPopularBlog.html?blogId=${blog.id}`;
    blogContainer.appendChild(popularBlogTitle);

    document.querySelector('.popular-blog-section').appendChild(blogContainer);
}