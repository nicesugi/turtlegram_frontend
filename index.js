async function loadArticles(){
    console.log("here")
    articles = await getArticles()
    console.log(articles)
    const article_list = document.getElementById("articles")

    articles.forEach(article => {   // 리스트에 쓸수 있는 함수 forEach
        console.log(article)
        const newArticle = document.createElement("li");
        newArticle.setAttribute("id", article._id)
        newArticle.innerText = article.title
        article_list.appendChild(newArticle)
    });

    
}



loadArticles();
getName();