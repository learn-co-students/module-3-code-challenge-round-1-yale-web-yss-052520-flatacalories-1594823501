function qs(selector) {
    return document.querySelector(selector)
}

function ce(element) {
    return document.createElement(element)
}

function fetchCharacters() {
    fetch(`http://localhost:3000/characters`)
    .then(res => res.json())
    .then(characters => showCharacters(characters))
}

function showCharacters(characters) {
    characters.forEach(character => addCharacter(character))
}

function addCharacter(character) {

    let characterName = ce('span')
    characterName.innerText = character.name

    characterName.addEventListener('click', () => {
    getCharacter(character)
    })


    let characterDiv = qs('div#character-bar')


    characterDiv.append(characterName)
}

fetchCharacters()

function getCharacter(character) {
    fetch(`http://localhost:3000/characters/${character.id}`)
    .then(res => res.json())
    .then(character => showCharacter(character))
}

function showCharacter(character) {
    const infoDiv = qs('div#detailed-info')

    let nameTag = qs('p#name')
    nameTag.innerText = character.name

    let imageTag = qs('img#image')
    imageTag.src = character.image

    let calTag = qs('span#calories')
    calTag.innerText = character.calories

    addCalories(character)
    // resetCalories(character)

}
// let nameTag = qs('p#name')
// let imageTag = qs('img#image')
// let calTag = qs('span#calories')
function addCalories(character) {

const form = qs('form#calories-form')
let formCharId = qs('input#characterId')
formCharId.value = character.id 

form.addEventListener('submit', () => {
    event.preventDefault()
// debugger
    let characterId = event.target[0].value
    let newCalories;
    if (event.target[1].value == "") {
        newCalories = 0
    } else {
        newCalories = event.target[1].value
    }
    let oldCalories = character.calories 
   
    debugger
    configObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            calories: oldCalories + parseInt(newCalories, 10)
        })
    }
    // debugger 
    // if (newCalories != "") {
    fetch(`http://localhost:3000/characters/${characterId}`, configObj)
    .then(res => res.json())
    .then(updatedCharacter => {
        getCharacter(updatedCharacter)
        form.reset()
    })

})
}

// function resetCalories(character) {
//     let resetBtn = qs('button#reset-btn')

//     let characterId = character.id

//     resetBtn.addEventListener('click', () => {
//         configObj = {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 calories: 0
//             })
//         }
//         fetch(`http://localhost:3000/characters/${characterId}`, configObj)
//         .then(res => res.json())
//         .then(updatedCharacter => {
//             getCharacter(updatedCharacter)
            
//     })
// })
// }