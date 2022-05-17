const backend_base_url = "http://172.30.1.40:5002"
const frontend_base_url = "http://127.0.0.1:5500"

async function handleSignin(){
    
    const signupData = {
        email : document.getElementById("floatingInput").value,
        password : document.getElementById("floatingPassword").value
    }
    
    console.log(signupData)
    // console.log(error)

    // if (signupData.email=='' || signupData.password=='') {alert('정보를 입력해주세요')}  // 둘다 미입력
    // if (signupData.email === '') {alert("이메일을 입력해주세요");}               // 이메일만 미입력시
    // if (signupData.password === '') {alert("비밀번호를 입력해주세요");}          // 비밀번호만 미입력시    
    
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
    } else {
        alert(response.status)
    }

}


async function handleLogin(){
    
    const loginData = {
        email : document.getElementById("floatingInput").value,
        password : document.getElementById("floatingPassword").value
    }
    console.log(loginData) 

    // if (signupData.email=='' || signupData.password=='') {alert('정보를 입력해주세요')}  // 둘다 미입력
    // if (signupData.email === '') {alert("이메일을 입력해주세요");}               // 이메일만 미입력시
    // if (signupData.password === '') {alert("비밀번호를 입력해주세요");}          // 비밀번호만 미입력시    
    const response = await fetch(`${backend_base_url}/login.html` ,{
        method:'POST',
        body:JSON.stringify(loginData)
    }
    )

    console.log(response)  

    response_json = await response.json() 
    console.log(response_json)          // 콘솔창에 메세지 석세스랑 토큰찍힘
    localStorage.setItem("token", response_json.token) // 콘솔어플리케이션로컬스토리지-> 토큰확인

async function getName(){

    // console.log("get name")
    // console.log(localStorage.getItem("token")) //나오는 값이 뭔지 확인하고 삭제.

    const response = await fetch(`${backend_base_url}/getuserinfo` ,{
        headers:{
        'Authorization':localStorage.getItem("token")
        }
    }
    )
    response_json = await response.json()
    console.log(response_json)

    const username = document.getElementById("username")
    
    username.innerText = response_json.email

    return response_json.email
    //     if (response.status == 200) {
    //     // localStorage.setItem("token", response_json.token) // 에러처리
    //     window.location.replace(`${frontend_base_url}/login.html`);
    // } else {
    //     alert(response.status)
    // } 
}









// elif  (response.status == 412) {alert('이메일형식이 아닙니다')}
// elif (response.status == 401){alert('정보를 입력해주세요')}
// elif (response.status == 400){alert('이미 존재하는 이메일입니다')}




