let newsAcc = document.getElementById('newsAcc');
let apiKey = '79544f59e2af413f87da03b9aacc7132';

const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`, true);
xhr.onload = ()=>{
    if(xhr.status == 200){
      let json = JSON.parse(xhr.responseText);
      let articles = json.articles;
      console.log(articles);
      let newsHtml = "";
      articles.forEach((item, i)=> {
          let news = `<div class="my-3">
                        <b style="color:red;">Breaking News ${i+1}: &nbsp;</b>
                        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEx${i}" aria-expanded="false" aria-controls="collapseEx${i}">
                          ${item["title"]}
                        </button>
                      </div>
                      <div class="collapse" id="collapseEx${i}">
                        <div class="card card-body">${item["description"]} <a class="text-decoration-none" href="${item['url']}" target="_blank">Continue reading...</a></div>
                      </div>`;
          newsHtml += news;
      });
      newsAcc.innerHTML = newsHtml;
    }else {
      console.log('Some error occured!');
    }
}
xhr.send();
