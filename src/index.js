'use strict'

import "./assets/styles/styles.scss"
import "./index.scss"

const newArticle = document.querySelector(".articles")

const createArticle = articles => {
  const articlesDOM = articles.map(article => {
    const articleDOM = document.createElement("div")
    articleDOM.classList.add("article")
    articleDOM.innerHTML = `
<div class="article-box card">
  <img src="${article.imgAuthor}" alt="profile" />
  <h2>${article.title}</h2>
  <p class="article-author">${article.author} - ${article.category}</p>
  <p class="article-content">${article.content}</p>
  <div class="btn-container">
    <button class="btn btn-danger" data-id=${article._id} >Delete</button>
    <button class="btn btn-primary">Modify</button>
  </div>
</div>
`
    return articleDOM
  })
  newArticle.innerHTML += ""
  newArticle.append(...articlesDOM)
  deleteArticle()
}

const deleteArticle = async () => {
  const deleteBtn = newArticle.querySelectorAll(".btn-danger")
  deleteBtn.forEach(button => {
    button.addEventListener("click", async event => {
      try {
        const target = event.target
        const articleId = target.dataset.id
        const response = await fetch(
          `https://restapi.fr/api/newArticle/${articleId}`,
          {
            method: "DELETE"
          }
        )
        const body = await response.json()
        console.log(body)
        fetchArticle()
      } catch (e) {
        console.log("e : ", e)
      }
    })
  })
}

const fetchArticle = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/newArticle")
    const article = await response.json()
    createArticle(article)
  } catch (e) {
    console.log("e : ", e)
  }
}

fetchArticle()
