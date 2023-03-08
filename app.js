// List class
class List {
    constructor(number, name) {
        this.number = number
        this.name = name
    }
}

// UI class

class UI {
    static displayList() {
        const lists = LStore.getElement()
        lists.forEach((list) => UI.addElementToList(list))
    }

    static addElementToList(list) {
        const elementList = document.querySelector('#element-list')

        const row = document.createElement('tr')

        row.innerHTML = `
            <td>${list.number}</td>
            <td>${list.name}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`

        elementList.appendChild(row)
    }

    static deleteRow(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove()
            UI.showAlert('Delete Element List', 'warning')
        }
    }

    static showAlert(massage, className) {
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(massage))

        const container = document.querySelector('.container')
        const form = document.querySelector('#list-form')
        container.insertBefore(div, form)

        setTimeout(() => document.querySelector('.alert').remove(), 4000)
    }

    static clearFilds() {
        document.querySelector('#number').value = ''
        document.querySelector('#name').value = ''
    }
}

class LStore {
    static getElement() {
        let lists
        if (localStorage.getItem('lists') === null) {
            lists = []
        } else {
            lists = JSON.parse(localStorage.getItem('lists'))
        }
        return lists
    }

    static addElement(element) {
        const lists = LStore.getElement()
        lists.push(element)
        localStorage.setItem('lists', JSON.stringify(lists))
    }

    static removeElement(id) {
        const lists = LStore.getElement()
        lists.forEach((element, i) => {
            if (element.id === id) {
                lists.splice(i, 1)
            }
        })
        localStorage.setItem('lists', JSON.stringify(lists))
    }
}

document.querySelector('#list-form').addEventListener('submit', (e) => {

    e.preventDefault()

    const number = document.querySelector('#number').value
    const name = document.querySelector('#name').value

    if (number === '' || name === '') {
        UI.showAlert('Немає усієї інформації', 'danger')
    } else {
        const elementList = new List(number, name)
        UI.addElementToList(elementList)
        UI.showAlert('Element Add Ok!', 'success')
        LStore.addElement(elementList)
        UI.clearFilds()
    }
})


document.querySelector('#element-list').addEventListener('click', (e) => {

    UI.deleteRow(e.target)
    LStore.removeElement(e.target.parentElement.previousElementSibling.textContent)
})


document.addEventListener('DOMContentLoaded', UI.displayList)