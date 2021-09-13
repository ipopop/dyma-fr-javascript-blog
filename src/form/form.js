'use strict'

import "../assets/styles/styles.scss"
import './form.scss'

const form = document.querySelector('form')
const errorElement = document.querySelector('#errors')
let errors = []

// form.addEventListener('submit', asyncevent => {
form.addEventListener('submit', event => {
  event.preventDefault()
  const formData = new FormData(form)
  const article = Object.fromEntries(formData.entries())
  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article)
      // const response = await fetch("https://restapi.fr/api/article", {
      //   method: "POST",
      //   body: json,
      //   headers: {
      //     "Content-Type": "application/json"
      //   }
      // })
      // const body = await response.json()
      // console.log(body)
      console.log(json)
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
    !article.category ||
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