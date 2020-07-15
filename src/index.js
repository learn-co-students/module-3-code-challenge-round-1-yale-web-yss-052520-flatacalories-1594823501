function qs(sel) {
    return document.querySelector(sel)
}

function ce(el) {
    return document.createElement(el)
}

const url = 'http://localhost:3000/characters'
const charBar = qs('div#character-bar')
const charInfo = qs('div#detailed-info')
const calForm = qs('form#calories-form')
const charImg = qs('img#image')
const charName = qs('p#name')
const charCals = qs('span#calories')
const resetBtn = qs('button#reset-btn')

function displayInfo(ch) {
    // debugger
    charName.innerText = ch.name
    charImg.src = ch.image
    charCals.innerText = ch.calories
    calForm[0].value = ch.id
}

function fetchInfo(e) {
    fetch(`${url}/${e.target.id}`).then(res => res.json()).then(ch => displayInfo(ch))
}

function displayChar(ch) {
    const charSpan = ce('span')
    charSpan.innerText = ch.name
    charSpan.id = ch.id
    charBar.addEventListener("click", e => fetchInfo(e))
    charBar.append(charSpan)
}

function fetchChars() {
    fetch(url).then(res => res.json()).then(chars => chars.forEach(displayChar))
}

function addCalories(e) {
    let calories = parseInt(charCals.innerText)+parseInt(e.target[1].value)
    const charObj = {calories}
    const id = e.target[0].value
    const configObj = {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(charObj)
    }
    e.target.reset()
    fetch(`${url}/${id}`, configObj).then(res => res.json())
    .then(ch => charCals.innerText=ch.calories)
}

calForm.addEventListener("submit", (e) => {
    e.preventDefault()
    if (e.target[0].value === "Character's id"){
        alert("You have to select a character first!")
        return
    }
    addCalories(e)
})

fetchChars()

