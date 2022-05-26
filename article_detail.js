// console.log('detail페이지 입니당.')

// 유알엘 쿼리값 가져오기
// urlParams의 ?id 값을 불러올 수 있음
const urlParams = new URLSearchParams(window.location.search);
const article_id = urlParams.get('id');
console.log(article_id)

// getArticleDetail(article_id); // ??5강-10에서 11넘어가니까 사라짐 어디로갓죠? 이건 이제 loadArticle로 대체


async function loadArticle(article_id){
    const article = await getArticleDetail(article_id);
    console.log(article) // 밑에도 실행을 해줘야함
    // api.js 작성한 함수를 실행해서 리턴값 response_json.article 을 받아옴.
    // 잘 되는지 콘솔로그
    const title = document.getElementById("title")
    const content = document.getElementById("content")
    const user_email = document.getElementById("user_email")
    const time = document.getElementById("time")
    title.innerText = article.title
    content.innerText = article.content
    user_email.innerText = article.user_email
    time.innerText = article.time
    // article_detail.html에 있는 아이디값들 넣어주기
    
    

}

function updateMode(){

    const title = document.getElementById("title")
    const content = document.getElementById("content")
    title.style.visibility = "hidden"
    content.style.visibility = "hidden"

    const input_title = document.createElement("textarea") // 수정할 수 있는 입력창만들기 
    input_title.setAttribute("id", "input_title") 
    input_title.innerText = title.innerHTML // 안하면 공란처리됨

    const input_content = document.createElement("textarea") // 수정할 수 있는 입력창만들기 title,content 둘다 해줘야함. 안그러면 안생김
    input_content.setAttribute("id", "input_content")  
    input_content.innerText = content.innerHTML // 안하면 공란처리됨
    input_content.rows=10

    const body = document.body
    body.insertBefore(input_title, title)
    body.insertBefore(input_content, content)
    
    const update_button = document.getElementById("update_button")
    update_button.setAttribute("onclick","updateArticle()") 
    // 업데이트 버튼을 가져오고 클릭시 updateArticle 함수 실행
}
//  구글링할때 Element hide

async function updateArticle(){ 
    var input_title = document.getElementById("input_title")
    var input_content = document.getElementById("input_content")
    console.log(input_title.value, input_content.value)

    const article = await patchArticle(article_id, input_title.value, input_content.value); //>>api.js에서 마저 작성

    input_title.remove()
    input_content.remove() // 수정하기 눌러서 기존 내용없애주기.

    const title = document.getElementById("title")  // 35.36코드에 title.style.visibility = "hidden" 없애놨으니까
    const content = document.getElementById("content") // 불러서 
    title.style.visibility = "visible" // 다시 보이게 !
    content.style.visibility = "visible"

    update_button.setAttribute("onclick","updateMode()")  // 다시 클릭하면 위의 코드 38 부분이 실행됨

    loadArticle(article_id) // 다시 한 번. 맨 위의 함수 실행

}


// 
loadArticle(article_id) //console.log(article) 할때 같이 실행해야함
