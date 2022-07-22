const backend_base_url = 'http://127.0.0.1:8000'
const frontend_base_url = 'http://127.0.0.1:5500'


// 회원가입
async function handleSignup() {
    const signupData = {
        username: document.getElementById('floatingInput').value,
        password: document.getElementById('floatingPassword').value,
        email: document.getElementById('floatingInputEmail').value,
        fullname: document.getElementById('floatingInputFullname').value,
    }

    const response = await fetch(`${backend_base_url}/users/`, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(signupData)
    })

    response_json = await response.json()

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/front/login.html`);
    } else {
        alert(response.status)
    }
}


// 로그인
async function handleSignin() {
    const signinData = {
        username: document.getElementById('floatingInput').value,
        password: document.getElementById('floatingPassword').value,
    }

    const response = await fetch(`${backend_base_url}/users/api/token/`, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(signinData)
    })

    response_json = await response.json()

    if (response.status == 200) {
        localStorage.setItem('access', response_json.access);
        localStorage.setItem('refresh', response_json.refresh);

        const base64Url = response_json.access.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(
            function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            }).join(''))

        localStorage.setItem('payload', jsonPayload)
        window.location.replace(`${frontend_base_url}/front/index.html`)
    } else {
        alert(response.status)
    }
}


// 로그아웃
async function handleLogout() {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('payload')

    location.reload()
}


// 게시글 전체 조회 (index 페이지)
async function getArticles() {
    const response = await fetch(`${backend_base_url}/articles/`, {
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        },
        method : 'GET',
    })
    response_json = await response.json()
    return response_json
}


// 게시글 작성
async function postArticle() {
    const title = document.getElementById('article_title').value
    const content = document.getElementById('article_content').value
    const image = document.getElementById('article_image').files[0]

    const formdata = new FormData()

    formdata.append('title', title)
    formdata.append('content', content)
    formdata.append('image', image)

    const response = await fetch(`${backend_base_url}/articles/`, {
        method : 'POST',
        body : formdata
    })

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/front/index.html`);
    } else {
        alert(response.status)
    }
}