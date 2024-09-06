document.getElementById('signup-form').addEventListener('submit', signup);

async function signup(e) {
    try {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const signupDetails = {
            name: name,
            email: email,
            password: password
        };
        if (!signupDetails.name) {
            document.querySelector('.error-message').textContent = 'Enter your name';
            return;
        }
        if (!signupDetails.email) {
            document.querySelector('.error-message').textContent = 'Enter your email';
            return;
        }
        if (!signupDetails.password) {
            document.querySelector('.error-message').textContent = 'Enter your password';
            return;
        }
        const res = await axios.post('http://localhost:3000/user/signup', signupDetails);
        if (res.status === 201) {
            alert('Signup successfull! Login to continue')
            window.location.href = '../html/login.html';
        } else {
            document.querySelector('.error-message').textContent = 'Signup failed';
        }
    } catch (err) {
        if (err.response && err.response.status === 409) {
            document.querySelector('.error-message').textContent = 'Email already exists';
        } else {
            document.querySelector('.error-message').textContent = 'An error occurred during Signup';
        }
    }
}