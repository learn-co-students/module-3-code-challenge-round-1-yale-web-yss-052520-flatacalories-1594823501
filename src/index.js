// i completed the advanced deliverable of adding the reset functionality and changing names
// i also decided to implement error checking
// non-numeric submissions do not cause errors in the database now
// additionally, the home screen before a character displays will not take any input

// helper functions and url
const qs = (e) => document.querySelector(e)
const ce = (e) => document.createElement(e)
const URL = "http://localhost:3000/characters/"

document.addEventListener("DOMContentLoaded", () => {
    // useful elements
    const characterBar = qs("div#character-bar")
    const detailedInfo = qs("div#detailed-info")
    const detailedInfoName = qs("div p#name")
    const detailedInfoImage = qs("div img#image")
    const detailedInfoCalories = qs("span#calories")
    const caloriesForm = qs("form#calories-form")
    const caloriesFormId = qs("form#calories-form input#characterId")
    const resetCaloriesButton = qs("button#reset-btn")

    // update calories on form submission, reset
    caloriesForm.addEventListener("submit", (event) => {
        event.preventDefault()

        let addedCalories = parseInt(caloriesForm.elements[1].value)

        if (Number.isInteger(addedCalories)){
            let currentCalories = parseInt(detailedInfoCalories.innerText)
            let newCalories = currentCalories + addedCalories

            updateCalories(newCalories)
        }
    })

    resetCaloriesButton.addEventListener("click", () => updateCalories(0))

    function updateCalories(newCalories){
        const characterId = caloriesForm.elements[0].value

        if (Number.isInteger(parseInt(characterId))){
            const fetchConfig = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    calories: newCalories
                })
            }
    
            fetch(URL+characterId, fetchConfig)
                .then(resp => resp.json())
                .then(updatedChar => {
                    character = updatedChar
                    detailedInfoCalories.innerText = updatedChar.calories
                    caloriesForm.reset()
                })
        }
    }

    // load detailed info on span click
    function loadInfo(character){
        detailedInfoName.innerText = character.name
        detailedInfoImage.src = character.image
        detailedInfoCalories.innerText = character.calories

        qs("form#name-form input#character-id").value = character.id
        caloriesFormId.value = character.id

        nameForm.reset()
        caloriesForm.reset()
    }

    // make change name form on page load
    function makeNameForm(){
        // defined as global variable
        nameForm = ce("form")
        nameForm.id = "name-form"

        const inputHidden = ce("input")
        inputHidden.type = "hidden"
        inputHidden.value = "character-id"
        inputHidden.id = "character-id"

        const inputText = ce("input")
        inputText.type = "text"
        inputText.placeholder = "Enter new name"
        
        const inputSubmit = ce("input")
        inputSubmit.type = "submit"
        inputSubmit.value = "Submit name"
        
        nameForm.addEventListener("submit", () => {
            event.preventDefault()

            const characterId = nameForm.elements[0].value
            const newName = nameForm.elements[1].value

            if (Number.isInteger(parseInt(characterId)) && newName != ""){
                const fetchConfig = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({
                        name: newName
                    })
                }
        
                fetch(URL+characterId, fetchConfig)
                    .then(resp => resp.json())
                    .then(updatedChar => {
                        character = updatedChar
                        detailedInfoName.innerText = updatedChar.name
                        qs("span#character-" + updatedChar.id).innerText = updatedChar.name
                        nameForm.reset()
                    })
            }
        })

        nameForm.append(inputHidden, inputText, inputSubmit)
        detailedInfo.insertBefore(nameForm, detailedInfoImage)
    }

    // load character bar on page load
    function makeCharacterSpan(character){
        const characterSpan = ce("span")
        characterSpan.innerText = character.name
        characterSpan.id = "character-" + character.id
        
        characterSpan.addEventListener("click", () => loadInfo(character))

        characterBar.appendChild(characterSpan)
    }

    function renderCharacters(characters){
        for (const character of characters){
            makeCharacterSpan(character)
        }
    }

    function fetchCharacters(){
        fetch(URL)
            .then(resp => resp.json())
            .then(characters => renderCharacters(characters))
            .catch(error => console.log(error))
    }

    function onLoad(){
        makeNameForm()
        fetchCharacters()
    }

    onLoad()
})