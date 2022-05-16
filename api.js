async function handleSignin(){
    
    const signupData = {
        email : document.getElementById("floatingInput").value,
        password : document.getElementById("floatingPassword").value
    }

    const response = await fetch('http://172.30.1.17:5005/signup' ,{
        method:'POST',
        body:JSON.stringify(signupData)
    }
    )
    console.log(response)  
    
    // if (response.status ==200) {
    //     window.location.replace('http://127.0.0.1:5500/turtlegram_frontend/login.html');
    // } else {
    //     alert(response.status);
    // }
    // function handleSignin(){
    // if (response == '가입완료') {
    //     window.location.replace('/turtlegram_frontend/login.html');
    // }
    if (response == 'try_again') {
        console.log('입력해주세요')
        alert('다시 입력해주세요');

    }
}