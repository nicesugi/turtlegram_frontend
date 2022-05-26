const backend_base_url = "http://127.0.0.1:5002"
const frontend_base_url = "http://127.0.0.1:5500"

async function handleSignin(){
    
    const signupData = {
        email : document.getElementById("floatingInput").value,
        password : document.getElementById("floatingPassword").value
    }
    console.log(signupData)

    // if (signupData.email=='' || signupData.password=='') {alert('정보를 입력해주세요')}  // 둘다 미입력
    // // if (signupData.email === '') {alert("이메일을 입력해주세요");}               // 이메일만 미입력시
    // // if (signupData.password === '') {alert("비밀번호를 입력해주세요");}          // 비밀번호만 미입력시
    // if (signupData.email.includes('@') == false) {alert('이메일을 다시 입력해주세요')}    //string.includes() 포함인지 아닌지
    // if (document.getElementById("floatingInput").innerHTML == localStorage.getItem("email")); {alert('가입이 된 이메일입니다.')}

    const response = await fetch(`${backend_base_url}/signup` ,{
        method:'POST',
        body:JSON.stringify(signupData)
    }
    )
    console.log(response)  

    response_json = await response.json() 
    console.log(response_json)              // 콘솔창에 메세지 석세스랑 토큰찍힘

    if (response.status == 200) {
        alert('가입 완료')
        window.location.replace(`${frontend_base_url}/login.html`);
    } 
    // if (response.status == 405) {
    //     alert('정보를 입력해주세요')
    // } 
    // if (response.status == 400) {
    //     alert('이메일을 다시 입력해주세요')
    // }
    // if (response.status == 402) {
    //     alert('가입이 된 이메일입니다.')
    // }
}
// 알림이 동시에 뜨는 경우가 있음 / db저장상태는 굿 / 콘솔창에 뜨는 서버메세지 굿 / 서버에 상태코드가 안적혀 있다면? / alert 메세지 직접말고 서버msg 불러오는법은?
////////////로그인///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function handleLogin(){
    // console.log("handle login")
    const loginData = {
        email : document.getElementById("floatingInput").value,
        password : document.getElementById("floatingPassword").value
    }
    console.log(loginData)

    const response = await fetch(`${backend_base_url}/login` ,{
        method:'POST',
        body:JSON.stringify(loginData)
    }
    )
    
    console.log(response)  

    response_json = await response.json()
    console.log(response_json)          // 콘솔창에 메세지 석세스랑 토큰찍힘
    localStorage.setItem("token", response_json.token) // 콘솔어플리케이션로컬스토리지-> 토큰확인


    if (response.status == 200) {
        alert('로그인 완료')
        window.location.replace(`${frontend_base_url}/index.html`);
    } else {
        alert('아이디나 비밀번호가 옳지 않습니다.')
    }
}


//////////메인페이지///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getName(){  // mainpage.js 에서 실행.
    // console.log("get name") //mainpage.js도 api.js도 실행.
    // console.log(localStorage.getItem("token")) //브라우저에 저장된 토큰 값의 가져옴 용도
    
    const response = await fetch(`${backend_base_url}/getuserinfo`,{
        headers:{
            'Authorization':localStorage.getItem("token")
        }
    }
    )
    // response_json = await response.json()

    if(response.status==200){
        response_json = await response.json()
        console.log(response_json)
        return response_json.email
    }else{
        return null
    }
}
    // console.log(response_json) // 로그아웃버튼 활성화후에 index.js로 작성하여 삭제함
    // const username = document.getElementById("username")  // 로그아웃버튼 활성화후에 index.js로 작성하여 삭제함
    // username.innerText = response_json.email // mainpage.html <h2 id="username">를 email로 바꿔줌.

    // return response_json.email
    
//////////게시글 POST///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 포스트 아티클 함수를 만들고 핸들아티클눌럿을때 콘텐트,타이틀 포스트 아티;클js넘겨주기 위해,
// 포스트 받기 위해 타이틀과 콘텐트 괄호안에 넣어줌


async function postArticle(title, content){
    const articleData = {
        title : title,
        content : content,
    }
    console.log(articleData)
    

    const response = await fetch(`${backend_base_url}/article`,{
        method:'POST',
        headers:{
            'Authorization':localStorage.getItem("token")},
        body:JSON.stringify(articleData)
    }
    )

  
    response_json = await response.json()     // 받아오는 리스폰스를 json화 해주고 콘솔값으로 나타내줌
    console.log(response_json)

    if (response.status ==200){
        window.location.replace(`${frontend_base_url}/`);
    }else{
        alert(response.status)
    }
}

 

//////////게시글 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async function getArticles(){
    const response = await fetch(`${backend_base_url}/article`,{
        method:'GET',
    }
    )

    response_json = await response.json()
    return response_json.articles
}


function logout(){
    localStorage.removeItem("token")
    window.location.replace(`${frontend_base_url}/`);
}


function articleDetail(article_id){
    console.log(article_id)
    const url = `${frontend_base_url}/article_detail.html?id=${article_id}`
    location.href = url
 // ?id=${article_id} 의 article_id는 위의 콘솔로그로 확인이 됐었으니, 그의 상세페이지로 이동시킴.
}


async function getArticleDetail(article_id){
    const response = await fetch(`${backend_base_url}/article/${article_id}`,{
        method:'GET',
    }
    )
    response_json = await response.json()
    console.log(response_json)
    // 받아온 값을 json화 시키고 콘솔로그 확인
    // getArticleDetail() 안에 article_id 써주고, article_detail.js에도 getArticleDetail(article_id);실행

    return response_json.article
// ui 만들기 위해 article_detail.js에서 만들기로함> 받은 값을 넘겨줘야함!
}
   
/////////게시글 수정 PATCH///////////////////////////////////////////////////////////////////////////////////////////////
async function patchArticle(article_id, title, content){

    const articleData = {
        "title": title,
        "content":content
    }

    const response = await fetch(`${backend_base_url}/article/${article_id}`,{
        headers:{
            'Authorization':localStorage.getItem("token")},
        method:'PATCH',
        body: JSON.stringify(articleData)
    }
    )


    if (response.status ==200){
        response_json = await response.json()
        return response_json
    }else{
        alert(response.status)
    }

}


/////////게시글 삭제 DELETE///////////////////////////////////////////////////////////////////////////////////////////////

async function deleteArticle(){
    const response = await fetch(`${backend_base_url}/article/${article_id}`,{
        headers:{
            'Authorization':localStorage.getItem("token")},
        method:'DELETE',
    }
    )


    if (response.status ==200){
        window.location.replace(`${frontend_base_url}/`); // 삭제가 되고나면 인덱스로 다시 이동하게함 
    }else{
        alert(response.status)
    }
}


// 토큰으로 아이디값을 받아오면 됨. 작성해둔   이용해 작성해보자. 
// 서버 @app.route("/getuserinfo", methods=["GET"]) 리턴값에 아이디값 하기 > 이걸로 게시글 작성 아이디와 비교가 가능해짐
// index.js checkLogin()에서 username.innerText = name > 값에 name.email < 추가
// article_detail.js 에서 loadArticle 함수. 끝에서 겟네임을 통해서 유저도 가져옴


async function postComment(article_id, comment_content){

    const commentData = {
        "content":comment_content
    }
    const response = await fetch(`${backend_base_url}/article/${article_id}/comment`,{
        headers:{
            'Authorization':localStorage.getItem("token")},
        method:'POST',
        body: JSON.stringify(commentData)
    }
    )


    if (response.status ==200){
        return response
    }else{
        alert(response.status)
    }
}


