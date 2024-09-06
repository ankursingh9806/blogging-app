document.getElementById('reset-password-form').addEventListener('submit', resetPassword);

const resetId = window.location.pathname.split('/').pop();

async function resetPassword(e) {
    try {
        e.preventDefault();
        const password = e.target.password.value;
        const newPasswordDetail = {
            password: password,
        };
        if (!newPasswordDetail.password) {
            document.querySelector('.error-message').textContent = 'Enter your new password';
            return;
        }
        const res = await axios.post(`http://localhost:3000/password/reset-password/${resetId}`, newPasswordDetail);
        if (res.status === 200) {
            document.querySelector('.error-message').textContent = '';
            document.querySelector('#password').remove();
            document.querySelector("button[type='submit']").remove();
            document.querySelector('h1').innerHTML = "<h1 style='text-align: center;'>Password changed!</h1>";
            document.querySelector('h2').innerHTML = "<h2 style='text-align: center;'>Your password has been changed successfully!</h2>";
        } else {
            document.querySelector('.error-message').textContent = 'Password not changed';
        }
    } catch (err) {
        if (err.response && err.response.status === 404) {
            document.querySelector('.error-message').textContent = 'Email not found';
        } else if (err.response && err.response.status === 400) {
            document.querySelector('.error-message').textContent = 'Link expired';
        } else {
            document.querySelector('.error-message').textContent = 'An error occurred in changing password';
        }
    }
}