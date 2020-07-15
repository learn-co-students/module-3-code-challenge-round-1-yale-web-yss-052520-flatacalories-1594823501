const bar = document.querySelector('div#character-bar')
const info = document.querySelector('div#detailed-info')
const form = document.querySelector('form#calories-form')
const hiddenInput = form.querySelector('input#characterId')
const caloriesAdded = form.children[1]
const url = 'http://localhost:3000/characters'

fetch(url)
.then(res => res.json())
.then(characters => characters.forEach(character => addBar(character)))

function addBar(character){
    const span = document.createElement('span')
    span.innerText = character.name
    bar.append(span)
    span.addEventListener('click', () => {
        getInfo(character)
    })
}

function getInfo(character){
    info.querySelector('p').innerText = character.name
    info.querySelector('img').src = character.image
    info.querySelector('span').innerText = character.calories
    hiddenInput.value = character.id  
    caloriesAdded.value = ''

    form.addEventListener('submit', () => {
        event.preventDefault()
        const configObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                calories: parseInt(caloriesAdded.value) + character.calories
            })
        }
        fetch(url + `/` + hiddenInput.value, configObj)
        .then (res => res.json())
        .then (updatedCharacter => {
            character = updatedCharacter
            document.querySelector('span#calories').innerText = updatedCharacter.calories 
            getInfo(updatedCharacter)
            form.reset()
        })  
    }) 
}
