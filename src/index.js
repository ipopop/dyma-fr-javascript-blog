'use strict'

import "./assets/styles/styles.scss"
import "./index.scss"
import { openModal } from './assets/js/modal'

const newArticle = document.querySelector(".articles")
const catMenuElem = document.querySelector(".categories")
const selectMenuElem = document.querySelector("select")
let filter
let articles
let sortBy = 'desc'

selectMenuElem.addEventListener('change', () => {
  sortBy = selectMenuElem.value
  fetchArticle()
})

const createArticle = () => {
  const articlesDOM = articles.filter(article => {
      if (filter) {
        return article.category === filter
      } else {
        return true
      }
    }).map(article => {
      const articleDOM = document.createElement("div")
      articleDOM.classList.add("article")
      articleDOM.innerHTML = `
        <div class="article-box card">
        <img src="${article.imgAuthor}" alt="profile" />
        <h2>${article.title}</h2>
        <p class="article-author">${article.author} - ${article.category}</p>
        <p class="article-content">${article.content}</p>
        <p class="article-date">last update : ${dateArticle(article)}</p>
        <div class="btn-container">
        <button class="btn btn-danger" data-id=${article._id} ><i class="fas fa-trash-alt"></i> Delete</button>
        <button class="btn btn-primary" data-id=${article._id} ><i class="fas fa-check"></i> Modify</button>
        </div>
        </div>
      `
    return articleDOM
  })
  newArticle.innerHTML = ""
  newArticle.append(...articlesDOM)
  deleteArticle()
  updateArticle()
}

const updateArticle = () => {
  const updateBtn = newArticle.querySelectorAll('.btn-primary')
  updateBtn.forEach(button => {
    button.addEventListener('click', async event => {
      try {
        const target = event.target
        const articleId = target.dataset.id
        await location.assign(`/form.html?id=${ articleId }`)
      } catch (e) {
        console.log('e : ', e)
      }
    })
  })
}

const deleteArticle = async () => {
  const deleteBtn = newArticle.querySelectorAll('.btn-danger')
  deleteBtn.forEach(button => {
    button.addEventListener("click", async event => {
      const result = await openModal('⚠️ 😱 Final deletion of this article? 🤔 ⚠️')
      console.log(result)
      if (result === true) {
        try {
          const target = event.target
          const articleId = target.dataset.id
          const response = await fetch(
            `https://restapi.fr/api/newArticle/${ articleId }`,
            {
              method: "DELETE"
            }
          )
          const body = await response.json()
          console.log('deleteArticle body : ', body)
          setTimeout(() => {
            location.reload()
          }, 300)
        } catch (e) {
          console.log("e : ", e)
        }
      }
    })
  })
}

const displayMenuCategories = catArr => {
  const liElem = catArr.map(catElem => {
    const newLi = document.createElement('li')
    newLi.innerHTML = `${catElem[0]} <strong>${catElem[1]}</strong>`
    if (catElem[0] === filter) {
      newLi.classList.add('activ')
    }
    newLi.addEventListener('click', () => {
      if (filter === catElem[0]) {
        filter = null
        newLi.classList.remove('activ')
        createArticle()
      } else {
        filter = catElem[0]
        liElem.forEach( newLi => {
          newLi.classList.remove('activ')
        })
      }
      newLi.classList.add('activ')
      createArticle()
    })
    return newLi
    })
  catMenuElem.innerHTML = ""
  catMenuElem.append(...liElem)
}

const createMenuCategories = () => {
  const categories = articles.reduce((acc, article) => {
    if (acc[article.category]) {
      acc[article.category]++
    } else {
      acc[article.category] = 1
    }
    return acc
  }, {})

  const categoriesArr = Object.keys(categories).map(category => {
    return [category, categories[category]]
  })

  displayMenuCategories(categoriesArr)
}

const dateArticle = (articles) => {
  const newDate = new Date(articles.createdAt)
  .toLocaleString(
    'fr-FR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }
  )
  return newDate
}

const fetchArticle = async () => {
  try {
    const response = await fetch(`https://restapi.fr/api/newArticle?sort=createdAt:${sortBy}`)
    articles = await response.json()
    createArticle()
    createMenuCategories()
  } catch (e) {
    console.log("e : ", e)
  }
}

fetchArticle()
