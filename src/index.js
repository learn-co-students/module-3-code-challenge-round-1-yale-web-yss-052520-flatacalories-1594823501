
document.addEventListener("DOMContentLoaded", () => {
    function ce(element){
        return document.createElement(element)
    }

    function qs(selector){
        return document.querySelector(selector)
    }

    const charBar = qs('div#character-bar')
    const charInfo = qs('div.characterinfo')
    const infoCard = qs("div#detailed-info")
    const form = qs("form#calories-form")

    // Hides the default Character info card
    charInfo.style.display = 'none'

    // On page load, request data from the server to get all of the characters objects. 
    function fetchCharacters() {
        fetch("http://localhost:3000/characters")
        .then(res => res.json())
        .then(characters => characters.forEach (character => displayCharacter(character)))
    }

    // See all characters names in a div with the id of "character-bar". 
    function displayCharacter(character) {
        let span = ce("span")
        span.innerText = character.name
        
        span.addEventListener("click", () => renderInfoPanel(character))

        charBar.append(span)
    }
    // Select a character from the character bar and see character's info inside #detailed-info div.
    function renderInfoPanel(character) {
        // Unhides Character Info
        charInfo.style.display = 'block'

        // Name
        let name = qs("p#name")
        name.innerText = character.name
        // Image
        let img = qs("img#image")
        img.setAttribute('src', character.image)
        // Calories
        let calories = qs("span#calories")
        calories.innerText = character.calories

        // Clicks on "Add Calories" button to add calories to a Character. 
        // Persist calories value to the server and update the DOM. 
        form.addEventListener("submit", () => {
            event.preventDefault()
            let newCalorieCount = parseInt(character.calories) + parseInt(event.target[1].value)
            // debugger
            fetch(`http://localhost:3000/characters/${character.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({calories: newCalorieCount})
            })
            .then(res => res.json())
            .then(newCharacter => {
                renderInfoPanel(newCharacter)
                form.reset()
            })
        })

        // Reset button
        const resetBtn = qs('button#reset-btn')

        // Clicks on a Reset Calories button to set calories to 0. 
        // Persist calories value to the server and update the DOM.
        resetBtn.addEventListener("click", () => {
            fetch(`http://localhost:3000/characters/${character.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({calories: 0})
            })
            .then(res => res.json())
            .then(newCharacter => renderInfoPanel(newCharacter))
        })

        // Unfinished:
        // Add option to change character name
        // let nameForm = ce("form")
        // let nameInput = ce("input")
        // nameInput.type = "text"
        // nameInput.placeholder = "Enter New Name" 
        // let nameSubmit = ce('input')
        // nameSubmit.type = "submit"
        // nameSubmit.value = "Change Name"
        // nameForm.append(nameInput, nameSubmit)
        // infoCard.append(nameForm)

    }

    fetchCharacters()
})