'use strict'

const body = document.querySelector('body')

let calc
let modal
let cancel
let confirm

const createCalc = () => {
  calc = document.createElement('div')
  calc.classList.add('calc')
}

const createModal = question => {
  modal = document.createElement('div')
  modal.classList.add('modal')
  modal.innerHTML = `
    <p>${question}</p>
  `
  cancel = document.createElement('button')
  cancel.classList.add('btn', 'btn-secondary')
  cancel.innerText = 'Oups! No...'
  confirm = document.createElement('button')
  confirm.classList.add('btn', 'btn-danger')
  confirm.innerText = 'Delete Article '
  const iTrash = document.createElement('i')
  iTrash.classList.add('fas', 'fa-trash-alt')
  confirm.appendChild(iTrash)
  modal.addEventListener('click', (e) => {
    e.stopPropagation()
  })
  modal.append(cancel, confirm)
}

export function openModal(question) {
  createCalc()
  createModal(question)
  calc.append(modal)
  body.append(calc)
  return new Promise((resolve, reject) => {
    calc.addEventListener('click', () => {
      resolve(false)
      calc.remove()
    })

    cancel.addEventListener('click', () => {
      resolve(false)
      calc.remove()
    })

    confirm.addEventListener('click', () => {
      resolve(true)
      calc.remove()
    })
  })
}