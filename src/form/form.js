'use strict'

import "../assets/styles/styles.scss"
import './form.scss'
import { openModal } from '../assets/js/modal'

const form = document.querySelector('form')
const errorElement = document.querySelector('#errors')
const btnCancel = document.querySelector('.btn-secondary')
let articleId
let errors = []

const fillForm = article => {
  const author = document.querySelector('input[name="author"]')
  const imgAuthor = document.querySelector('input[name="imgAuthor"]')
  const category = document.querySelector('input[name="category"]')
  const title = document.querySelector('input[name="title"]')
  const content = document.querySelector('textarea')
  author.value = article.author || ''
  imgAuthor.value = article.imgAuthor || ''
  category.value = article.category || ''
  title.value = article.title || ''
  content.value = article.content || ''
}

const initForm = async () => {
  const params = new URL(location.href)
  articleId = params.searchParams.get('id')
  if (articleId) {
    const response = await fetch(`https://restapi.fr/api/newArticle/${ articleId }`)
    if (response.status < 300) {
      const article = await response.json()
      fillForm(article)
    } 
  }
}
initForm()

btnCancel.addEventListener('click', async () => {
  const result = await openModal('⚠️ 😱 Definitive discard of this article? 🤔 ⚠️')
  if (result) {
    location.assign('https://ipopop.github.io/dyma-fr-javascript-blog/')
  }
})

form.addEventListener('submit', async event => {
  event.preventDefault()
  const formData = new FormData(form)
  const article = Object.fromEntries(formData.entries())
  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article)
      let response
      if (articleId) {
        response = await fetch(`https://restapi.fr/api/newArticle/${ articleId }`, {
          method: "PATCH",
          body: json,
          headers: {
            "Content-Type": "application/json"
          }  
        })
        } else {
        response = await fetch("https://restapi.fr/api/newArticle", {
          method: "POST",
          body: json,
          headers: {
            "Content-Type": "application/json"
          }
        })
        const body = await response.json();
        console.log(body);
      }
      if (response.status <= 299) {
        location.assign('https://ipopop.github.io/dyma-fr-javascript-blog/')
      }
    } catch (e) {
      console.error("e : ", e)
    }
  }

  // other methods
  // const entries = formData.entries()
  // console.log(entries)
  // const obj = Object.fromEntries(entries)

  // for (let entry of entries) {
  //   console.log(entry)
  // }

  // const obj = Array.from(entries).reduce((acc, value) => {
  //   acc[value[0]] = value[1]
  //   return acc
  // }, {})

  // console.log(obj)
})

const formIsValid = article => {
  if (
    !article.author ||
    !article.imgAuthor ||
    !article.category ||
    !article.title ||
    !article.content
  ) {
    errors = []
    errors.push("You must fill out all fields")
  } else {
    errors = []
  }
  if (errors.length) {
    let errorHTML = ""
    errors.forEach(e => {
      errorHTML += `<li>${e}</li>`
    })
    errorElement.innerHTML = errorHTML
    return false
  } else {
    errorElement.innerHTML = ""
    return true
  }
}