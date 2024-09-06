// view popular blog
const params = new URLSearchParams(window.location.search);
const blogId = params.get('blogId');

document.addEventListener('DOMContentLoaded', function () {
    viewPopularBlog(blogId);
});

async function viewPopularBlog(blogId) {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:3000/blog/view-popular-blog/${blogId}`, {
            headers: { Authorization: token }
        });
        if (res.status === 200) {
            const blog = res.data.blog;
            document.querySelector('.popular-blog-title').textContent = blog.title;
            document.querySelector('.author-name').textContent = `Author: ${blog.User.name}`;
            document.querySelector('.popular-blog-published-at').textContent = `Published: ${new Date(blog.publishedAt).toISOString().split('T')[0]}`;
            document.querySelector('.popular-blog-content').textContent = blog.content;
        } else {
            console.log('failed to load blog');
        }
    } catch (err) {
        console.error('error loading blog:', err);
    }
}

// go back
document.querySelector('.go-back-button').addEventListener('click', function () {
    window.location.href = '../html/home.html';
});