import todos from './todos.js'
import { renderCategoriesData } from './main.js'
const form = document.querySelector('form')
const showFormBtn = document.getElementById('create-note')

const showForm = () => {
    form.style.display = 'block'
}

const findDates = (note) => {
    const re = /((\d{1,2}\/\d{1,2}\/\d{4})|(\d{1,2}\.\d{1,2}\.\d{2,4})|(\d{1,2}-\d{1,2}-\d{4}))/g
    try {
        const match = note.match(re)
        return match.join(", ")
    } catch(err) {
        return ""
    }
}

const hideForm = () => {
    form.elements['name-input'].value = ""
    form.elements['content-input'].value = ""
    form.style.display = 'none'
}

const appendNote = (obj) => {
    const tbody = document.getElementById('notes-data')
    const template = document.getElementById('notes-row') 
    const row = template.content.querySelector('tr')
    const node = document.importNode(row, true)
    node.setAttribute('id', todos.length - 1)
    const columns = node.children
    for (let i = 0; i < 5; i++) {
        columns[i].innerText += obj[columns[i].className]
    }
    tbody.appendChild(node)
}

const submitNote = (e) => {
    e.preventDefault()
    const name = e.target.elements['name-input'].value
    const category = e.target.elements['category-select'].value
    const content = e.target.elements['content-input'].value
    const created = new Date().toGMTString().split(' ').slice(1,4).join(' ')
    const dates = findDates(content)
    const noteObj = {
        name,
        created,
        category,
        content,
        dates,
        status: "active"
    }
    todos.push(noteObj)
    appendNote(noteObj)
    hideForm()
    renderCategoriesData()
}

showFormBtn.addEventListener('click', showForm)

form.addEventListener('submit', submitNote)

window.addEventListener('load', (e) => {
    form.style.display = 'none'
})