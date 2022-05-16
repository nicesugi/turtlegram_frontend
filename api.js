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


//     const response = await fetch('http://172.30.1.17:5005/login' ,{
//         method:'POST',
//         body:JSON.stringify(signupData)
//     }
//     )
//     console.log(response)
// }



    // redirect 이용해서 새로운페이지
    // handleSignin 클릭시, 입력한 이메일란에 @이 포함되면 db 저장, 아니라면 메세지.
    // handleSignin 클릭시, 입력한 이메일이 userDB에 저장되어있다면, 메세지 보내기. 

    if (result == success) {
        alert("이메일성공");
        return "redirect:/login";
    } else {
        alert(['msg']);
        return "redirect:/signup";
    }