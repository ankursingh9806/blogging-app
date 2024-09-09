// profile
document.addEventListener('DOMContentLoaded', profileGet);
document.getElementById('profile-form').addEventListener('submit', profileUpdate);
document.querySelector('.delete-account-button').addEventListener('click', function (e) {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? Press OK to continue.');
    if (confirmDelete) {
        profileDelete(e);
    }
});

async function profileGet() {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/profile/profile-get', {
            headers: {
                Authorization: token
            }
        });
        if (res.status === 200) {
            const profile = res.data.profile;
            document.getElementById('name').value = profile.name;
            document.getElementById('email').value = profile.email;
        } else {
            console.log('failed to load profile');
        }
    } catch (err) {
        console.error('error in loading profile:', err);
    }
}

async function profileUpdate(e) {
    try {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const newProfileData = {
            name: name,
            email: email
        }
        const token = localStorage.getItem('token');
        const res = await axios.put('http://localhost:3000/profile/profile-update', newProfileData, {
            headers: {
                Authorization: token
            }
        });
        if (res.status === 200) {
            document.querySelector('.error-message').textContent = 'Profile updated!';
        } else {
            document.querySelector('.error-message').textContent = 'Failed to update profile.';
        }
    } catch (err) {
        if (err.response && err.response.status === 400) {
            document.querySelector('.error-message').textContent = 'An account with this email already exists.';
        } else {
            document.querySelector('.error-message').textContent = 'Error updating profile.';
        }
    }
}

async function profileDelete() {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.delete('http://localhost:3000/profile/profile-delete', {
            headers: {
                Authorization: token
            }
        });
        if (res.status === 200) {
            alert('Your account has been deleted!');
            localStorage.clear();
            window.location.href = '../html/welcome.html';
        } else {
            document.querySelector('.error-message').textContent = 'Failed to delete account.';
        }
    } catch (err) {
        document.querySelector('.error-message').textContent = 'Error in deleting account.';
    }
}