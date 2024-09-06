// create blog
document.querySelector('.publish-blog-button').addEventListener('click', publishBlog);
document.querySelector('.discard-blog-button').addEventListener('click', discardBlog);

function discardBlog() {
    window.location.href = '../html/home.html';
}

async function publishBlog() {
    try {
        document.querySelector('.error-message').textContent = '';
        const newBlogData = {
            title: document.querySelector('.blog-title').value,
            content: document.querySelector('.blog-content').value,
            publishedAt: new Date()
        };
        if (!newBlogData.title) {
            document.querySelector('.error-message').textContent = 'Enter a title';
            return;
        }
        if (!newBlogData.content) {
            document.querySelector('.error-message').textContent = 'Enter some content';
            return;
        }
        const token = localStorage.getItem('token');
        const res = await axios.post('http://localhost:3000/blog/publish-blog', newBlogData, {
            headers: { Authorization: token }
        });
        if (res.status === 201) {
            window.location.href = '../html/home.html';
        } else {
            console.log('failed to publish blog');
        }
    } catch (err) {
        console.error('error publishing blog:', err);
    }
}