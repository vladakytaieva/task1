import todos from './todos.js'
const tbody = document.getElementById('notes-data')
const categoriesBody = document.getElementById('categories-data')

const renderNotes = () => {
    const template = document.getElementById('notes-row') 
    const row = template.content.querySelector('tr')
    todos.forEach((todo, idx) => {
        const node = document.importNode(row, true)
        node.setAttribute('id', idx)
        const columns = node.children
        for (let i = 0; i < 5; i++) {
            columns[i].innerText += todo[columns[i].className]
        }
        tbody.appendChild(node)
    })
}

const calculateNotes = () => {
    const nums = {
        task: {
            active: 0,
            archived: 0
        },
        idea: {
            active: 0,
            archived: 0
        },
        thought: {
            active: 0,
            archived: 0
        }
    }

    todos.forEach(el => {
        switch(el.category) {
            case "Task":
                el.status === "active" ? nums.task.active += 1 : nums.task.archived += 1
                break
            case "Idea":
                el.status === "active" ? nums.idea.active += 1 : nums.idea.archived += 1
                break
            case "Random thought":
                el.status === "active" ? nums.thought.active += 1 : nums.thought.archived += 1
                break
        }
    })
    console.log(nums)

    console.log(categoriesBody)
    return nums
}

export const renderCategoriesData = () => {
    const nums = calculateNotes()
    const rows = categoriesBody.children
    console.log(rows)
    for (let category in nums) {
        const columns = rows[category].children
        columns[1].innerText = nums[category].active
        columns[2].innerText = nums[category].archived
    }
}

window.addEventListener('load', (e) => {
    renderNotes()
    renderCategoriesData()
})