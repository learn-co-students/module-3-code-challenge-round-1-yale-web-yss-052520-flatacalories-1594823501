document.addEventListener("DOMContentLoaded", () => {
    
    function qs(element) {
        return document.querySelector(element)
    }

    function ce(element) {
        return document.createElement(element)
    }

    const characterDiv = qs("div#character-bar")
    const characterInfo = qs("div#detailed-info").children 
    const calories = qs("span#calories")
    const form = qs("form#calories-form")
    const reset = qs("button#reset-btn")
    const resetName = qs("button#reset-name")
    const nameForm = qs("form#name-form")


    resetName.addEventListener("click", () => {
        nameForm.style.display = "block"
    })

    function addCharacter(character) {

        const characterSpan = ce("span")
        characterSpan.innerText = character.name 

        //Add an event listener to display a character's info 
        characterSpan.addEventListener("click", () => {

            //Need to update the character with the latest information from the server
            fetch("http://localhost:3000/characters/"+character.id)
            .then(response => response.json())
            .then(updatedCharacter => {
                calories.innerText = updatedCharacter.calories 
                characterSpan.innerText = updatedCharacter.name 
                characterInfo[0].innerText = updatedCharacter.name 
            })

            characterInfo[1].src = character.image 
            

            //We also need to change the value of hidden field in the form 
            form.children[0].value = character.id
            nameForm.children[0].value = character.id  
        })

        //append the new character to the DOM
        characterDiv.append(characterSpan)
    }

    function getCharacters() {
        fetch("http:localhost:3000/characters")
        .then(response => response.json())
        .then(characters => characters.forEach(character => addCharacter(character)))
    }

    

    getCharacters()

    form.addEventListener("submit", () => {
        event.preventDefault() 
        const characterId = event.target[0].value 
        const addedCalories = parseInt(event.target[1].value)

        fetch("http:localhost:3000/characters/"+characterId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }, 
            body: JSON.stringify({
                calories: addedCalories + parseInt(calories.innerText)
            })
        })
        .then(response => response.json())
        .then(updatedCharacter => { 
            //need to update the text on the DOM 
            calories.innerText = updatedCharacter.calories
            form.reset() 
        })
    })

    nameForm.addEventListener("submit", () => {
        event.preventDefault() 
        const characterId = event.target[0].value 
        const name = event.target[1].value 

        fetch("http:localhost:3000/characters/"+characterId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }, 
            body: JSON.stringify({
                name
            })
        })
        .then(response => response.json())
        .then(updatedCharacter => { 
            characterInfo[0].innerText = updatedCharacter.name
            nameForm.reset() 
            nameForm.style.display = "none" //want the form to disappear 
        })
        
    })

    //if you have time, come back and refactor this code (maybe event after code challenge)
    reset.addEventListener("click", () => {
        //grabbing this elements id from the hidden fields in the form
        const id = event.target.parentElement.children[3][0].value 

        fetch("http:localhost:3000/characters/"+id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json"
            }, 
            body: JSON.stringify({
                calories: 0
            })
        })
        .then(response => response.json())
        .then(updatedCharacter => {
            calories.innerText = updatedCharacter.calories 
        })
    })
})
