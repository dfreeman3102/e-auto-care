const loginHandler = async (event) => {
    event.preventDefault();

    // Gets the data from the email and password fields
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": 'application/json' }
            });

            if (response.ok) {
                document.location.replace('/appointments');
            } else {
                const errorMsg = await response.text();
                alert(`Failed to log in: ${errorMsg}`);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Failed to log in due to an error');
        }
    } else {
        alert('Please enter both email and password');
    }
};

const signupHandler = async (event) => {
    event.preventDefault();

    // Gets the data from the proper fields
    const userName = document.querySelector('#username-signup').value.trim();
    const firstName = document.querySelector('#first-name-signup').value.trim();
    const lastName = document.querySelector('#last-name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (userName && firstName && lastName && email && password) {
        try {
            const response = await fetch('/api/users', { 
                method: 'POST',
                body: JSON.stringify({ userName, firstName, lastName, email, password }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                const errorMsg = await response.text();
                alert(`Failed to sign up: ${errorMsg}`);
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('Failed to sign up due to an error');
        }
    } else {
        alert('Please fill in all fields');
    }
};

document.querySelector('.login-form').addEventListener('submit', loginHandler);
document.querySelector('.signup-form').addEventListener('submit', signupHandler);
