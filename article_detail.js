console.log('detail페이지 입니당.')

// 유알엘 쿼리값 가져오기
// urlParams의 ?id 값을 불러올 수 있음
const urlParams = new URLSearchParams(window.location.search);
const article_id = urlParams.get('id');
console.log(article_id)
