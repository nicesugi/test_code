const backend_base_url = 'http://127.0.0.1:8000'
const frontend_base_url = 'http://127.0.0.1:5500'

async function handleSignup(){

    const signupData = {
        username : document.getElementById('floatingInput').value,
        password : document.getElementById('floatingPassword').value,
        email : document.getElementById('floatingInputEmail').value,
        fullname : document.getElementById('floatingInputFullname').value,
    }
    
    const response = await fetch(`${backend_base_url}/users/`,{
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        method:'POST',
        body:JSON.stringify(signupData)
    })

    response_json = await response.json()

    if (response.status ==200){
        window.location.replace(`${frontend_base_url}/front/login.html`);
    }else{
        alert(response.status)
    }
}
