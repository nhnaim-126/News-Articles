const getNewsHeading = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayNewsHeading(data.data.news_category))
}

// display news heading
const  displayNewsHeading = heading =>{
    const headingNewsContainer = document.getElementById('news-heading')
    heading.forEach(head => {
        console.log(head)
        const headingElement = document.createElement('div')
        headingElement.innerHTML = `
        <a onclick= "newsDetails('${head.category_id}')" class="nav-link fs-4" href="#">${head.category_name}</a>
        `
        headingNewsContainer.appendChild(headingElement)

    })
}

// details news heading
const newsDetails = async(category_id) =>{
    console.log(category_id)
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res = await fetch(url)
    const data = await res.json()
    displayNews(data.data)

}

// display newses
const  displayNews = newsCategory =>{
    console.log(newsCategory)
    const newsContainer = document.getElementById('news-container')
    newsContainer.textContent = ``
    for(const news of newsCategory){
        console.log(news)
        const newsElement = document.createElement('div')
            newsElement.innerHTML = `
        <div onclick= "displayModal()" class="card mb-3" style="max-width: 940px;">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${news.thumbnail_url
                }" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details}</p>
                  <div class="d-flex align-items-center justify-content-around">
                        <div class="d-flex  justify-content-around ">
                        <img src="${news.author? news.author.img : 'no data'}" class="rounded " alt="..." width="30" height="24">
                            <p class="fs-5">${news.author ? news.author.name : 'no data'}</p>
                        </div>
                        <div>
                            <h4><i class="fa-regular fa-eye"></i>  ${news.total_view}</h4>
                         </div>
                  </div>
                </div>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(newsElement)
    }
}
getNewsHeading()