const logoutHandler = async () => {

    console.log('in function');
    //make request to destroy the session
    const response = await fetch('/api/users/logout', {
        method:'POST',
        headers:{ 'Content-Type': 'application.json'}
    });

    document.cookie = 'connect.sid =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path =/;'

    if(response.ok){
        
        document.location.replace('/');
       
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#logout').addEventListener('click', logoutHandler);