const loginHandler = async (event) => {
    event.preventDefault();

    //gets the data from the email and password fields

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {"Content-Type": 'application/json'}
        });

        if(response.ok){
            document.location.replace('/');
        } else {
            alert('Failed to log in');
        }
    }
};

const signupHandler = async (event) => {
    event.preventDefault();

    //gets the data from the proper fields
    const userName = document.querySelector('#username-signup');
    const firstName = document.querySelector('#first-name-signup');
    const lastName = document.querySelector('#last-name-signup');
    const email = document.querySelector('#email-signup');
    const password = document.querySelector('#password-signup');

    if(userName && firstName && lastName && email && password) {
        const response = await fetch('/api/users', {
            method:'POST',
            body: JSON.stringify({firstName, lastName, email, password}),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok){
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginHandler);

document.querySelector('.signup-form').addEventListener('submit', signupHandler);