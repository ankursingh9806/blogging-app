document.getElementById('login-form').addEventListener('submit', login);

async function login(e) {
    try {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const loginDetails = {
            email: email,
            password: password
        };
        if (!loginDetails.email) {
            document.querySelector('.error-message').textContent = 'Enter your email';
            return;
        }
        if (!loginDetails.password) {
            document.querySelector('.error-message').textContent = 'Enter your password';
            return;
        }
        const res = await axios.post('http://localhost:3000/user/login', loginDetails);
        if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            window.location.href = '../html/home.html';
        } else {
            document.querySelector('.error-message').textContent = 'Login failed';
        }
    } catch (err) {
        if (err.response && err.response.status === 404) {
            document.querySelector('.error-message').textContent = 'Email not found';
        } else if (err.response && err.response.status === 401) {
            document.querySelector('.error-message').textContent = 'Incorrect password';
        } else {
            document.querySelector('.error-message').textContent = 'An error occurred during Login';
        }
    }
}