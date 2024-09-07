// initialize quill editor
const quill = new Quill("#editor", {
    theme: "snow",
});

// view my blog
const params = new URLSearchParams(window.location.search);
const blogId = params.get('blogId');

document.addEventListener('DOMContentLoaded', function () {
    viewMyBlog(blogId);
});

async function viewMyBlog(blogId) {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:3000/blog/view-my-blog/${blogId}`, {
            headers: { Authorization: token }
        });
        if (res.status === 200) {
            const blog = res.data.blog;
            document.querySelector('.my-blog-title').textContent = blog.title;
            document.querySelector('.author-name').textContent = `Author: ${blog.User.name}`;
            document.querySelector('.my-blog-published-at').textContent = `Published: ${new Date(blog.publishedAt).toISOString().split('T')[0]}`;
            // document.querySelector('.my-blog-content').textContent = blog.content;
            document.querySelector('.my-blog-content').innerHTML = blog.content; // use quill content
        } else {
            console.log('failed to load blog');
        }
    } catch (err) {
        console.error('error loading blog:', err);
    }
}

// go back, delete blog, edit blog
document.querySelector('.go-back-button').addEventListener('click', function () {
    window.location.href = '../html/home.html';
});
document.querySelector('.delete-blog-button').addEventListener('click', function () {
    if (confirm('Are you sure you want to delete this blog?')) {
        deleteMyBlog(blogId);
    }
});
document.querySelector('.edit-blog-button').addEventListener('click', function () {
    document.querySelector('.edit-blog-form').style.display = 'block';
    document.querySelector('.my-blog-content').style.display = 'none';
    document.querySelector('.my-blog-title').style.display = 'none';
    document.querySelector('.buttons').style.display = 'none';

    document.getElementById('edit-blog-title').value = document.querySelector('.my-blog-title').textContent;
    // document.getElementById('edit-blog-content').value = document.querySelector('.my-blog-content').textContent;
    quill.root.innerHTML = document.querySelector('.my-blog-content').innerHTML;  // set content of quill editor

    document.querySelector('.cancel-edit-button').addEventListener('click', function () {
        document.querySelector('.edit-blog-form').style.display = 'none';
        document.querySelector('.my-blog-content').style.display = 'block';
        document.querySelector('.my-blog-title').style.display = 'block';
        document.querySelector('.buttons').style.display = 'block';
    });

    document.querySelector('.update-blog-button').addEventListener('click', function () {
        updateMyBlog(blogId);
    });
});

async function deleteMyBlog(blogId) {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.delete(`http://localhost:3000/blog/delete-my-blog/${blogId}`, {
            headers: { Authorization: token }
        });
        if (res.status === 200) {
            window.location.href = '../html/home.html';
        } else {
            console.log('failed to delete blog');
        }
    } catch (err) {
        console.error('error deleting blog:', err);
    }
}

async function updateMyBlog(blogId) {
    try {
        const updatedBlogData = {
            title: document.getElementById('edit-blog-title').value,
            // content: document.getElementById('edit-blog-content').value,
            content: quill.root.innerHTML, // get content from quill
        };
        const token = localStorage.getItem('token');
        const res = await axios.put(`http://localhost:3000/blog/update-my-blog/${blogId}`, updatedBlogData, {
            headers: { Authorization: token }
        });
        if (res.status === 200) {
            window.location.href = '../html/home.html';
        } else {
            console.log('failed to update blog');
        }
    } catch (err) {
        console.error('error updating blog:', err);
    }
}