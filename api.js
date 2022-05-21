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
        window.location.replace(`${frontend_base_url}/mainpage.html`);
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

    // console.log(response_json) // 로그아웃버튼 활성화후에 index.js로 작성하여 삭제함
    // const username = document.getElementById("username")  // 로그아웃버튼 활성화후에 index.js로 작성하여 삭제함
    // username.innerText = response_json.email // mainpage.html <h2 id="username">를 email로 바꿔줌.

    // return response_json.email
}

    
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

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/`);
    }else{
        alert(response.status)
    }
    }
 

//////////게시글 GET///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

