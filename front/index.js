// 사용자의 로그인 상태 여부를 확인하여 로그인/로그아웃 변경
async function checkLogin(){
    var payload = localStorage.getItem('payload')
    var parsed_payload = await JSON.parse(payload) // str이기 때문에 JSON으로 파싱

    const username = document.getElementById('username')
    const loginoutButton = document.getElementById('logout')
    const welcome = document.getElementById('welcome')

    if(parsed_payload){
        username.innerText = parsed_payload.username
        loginoutButton.innerText = '로그아웃'
        loginoutButton.setAttribute('onclick', 'handleLogout()')

    }else{
        username.innerText = '로그인해주세요'
        welcome.innerText = ''
        loginoutButton.innerText = '로그인'
        loginoutButton.setAttribute('onclick', 'location.href="/front/login.html"')
    }
}
checkLogin()
// checkLogin() > html에서 script 부분을 body 아래에 넣어줄 때 꼭 넣어주기
// script를 head에 넣을 경우  위의 코드처럼 이용 >> window.onload = async function checkLogin(){


// 게시글 보여주기 
async function loadArticles(){
    articles = await getArticles()

    const article_list = document.getElementById('articles')

    articles.forEach(article => {
        const newArticle = document.createElement('div')
        const articleImage = document.createElement('img')
        articleImage.setAttribute('src', `${backend_base_url}${article.image}`)
        newArticle.setAttribute('id', article.id)
        newArticle.innerText = article.title
        newArticle.setAttribute('onclick', 'articleDetail(this.id)')
        newArticle.appendChild(articleImage)
        article_list.appendChild(newArticle)
    }) ;
}
loadArticles()
    