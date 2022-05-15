async function handleSignin(){
    
    const signupData = {
        email : document.getElementById("floatingInput").value,
        password : document.getElementById("floatingPassword").value
    }

    const response = await fetch('http://172.30.1.55:5005/signup',{
        method:'POST',
        body:JSON.stringify(signupData)
    }
    )

    console.log(response)
}