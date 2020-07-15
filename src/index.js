// 1. See all characters names in a `div` with the id of `"character-bar"`. On page load, **request** data from the server to get all of the characters objects. When you have this information, you'll need to add a `span` tag with the character's name to the character bar.

document.addEventListener('DOMContentLoaded', () => {
    function ce(element) {
        return document.createElement(element)
    }

    function qs(element) {
        return document.querySelector(element)
    }

    const charBar = qs('div#character-bar')
    const URL = 'http://localhost:3000/characters'
    const detail = qs('div#detailed-info')
    const img = qs('img#image')
    const cals = qs('span#calories')
    const charName = qs('p#name')
    const calForm = qs('form#calories-form')

    function charSpan(char) {
        const span = ce('span')
        span.innerText = char.name
        charBar.append(span)
        return span
    }
    
    async function addCalories(char, cals) {
        // debugger
        const newCalCount = parseInt(cals) + char.calories
        const response  = await fetch(`${URL}/${char.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({ 
                calories: newCalCount
            })
        })
        .then(res => res.json())
        .then(updatedChar => {
            char = updatedChar
        })
        .catch(err => {
            alert(err.message)
            return
        })
        const move = await fetchChars()
        detailedChar(char)
    }
    
    function detailedChar(char) {
        // debugger
        img.src = char.image
        cals.innerText = char.calories
        charName.innerText = char.name
        calForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            // debugger
            const newCals = evt.target[1].value
            if (newCals <= 0) {
                alert('Input must be greater than 0')
            } else {
                addCalories(char, newCals)
            }
        })
        // return char
    }

    function displayChar(char) {
        const span = charSpan(char)
        span.addEventListener('click', () => detailedChar(char))
    }
    
    function clearBar() {
        charBar.innerHTML = ""
    }
    async function fetchChars() {
        const clear = await clearBar()
        // debugger
        fetch(URL)
            .then(res => res.json())
            .then(chars => {
                chars.forEach(char => displayChar(char))
            })
            .catch(err => alert(err.message))
    }

    fetchChars()
    // debugger
})