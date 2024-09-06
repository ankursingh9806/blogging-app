document.getElementById('forgot-password-form').addEventListener('submit', forgotPassword);

async function forgotPassword(e) {
    try {
        e.preventDefault();
        const email = e.target.email.value;
        const forgotPasswordDetail = {
            email: email,
        };
        if (!forgotPasswordDetail.email) {
            document.querySelector('.error-message').innerHTML = 'Enter your email';
            return;
        }
        const res = await axios.post('http://localhost:3000/password/forgot-password', forgotPasswordDetail);
        if (res.status === 200) {
            document.querySelector('.error-message').textContent = '';
            document.querySelector('#email').remove();
            document.querySelector("button[type='submit']").remove();
            document.querySelector('h2').innerHTML = `<h2 style='text-align: center;'>We have sent you an email. Please check your email <span style='color: #198754;'>${email}</span> to reset your password.</h2>`
        } else {
            document.querySelector('.error-message').textContent = 'Email not sent'
        }
    } catch (err) {
        if (err.response && err.response.status === 404) {
            document.querySelector('.error-message').textContent = 'Email not found';
        } else {
            document.querySelector('.error-message').textContent = 'An error occurred in sending email';
        }
    }
}