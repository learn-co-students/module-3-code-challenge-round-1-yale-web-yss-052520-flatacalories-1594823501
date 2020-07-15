document.addEventListener("DOMContentLoaded", () => {
    const url = "http://localhost:3000/characters/"
    const calorieForm = document.querySelector("form")
    const resetButton = document.querySelector("button")

    function fetchCharacters(){
        fetch(url)
        .then(res => res.json())
        .then(getCharacters => showCharacters(getCharacters))
    }

    function showCharacters(characters){
        characters.forEach(character => addCharacter(character))
    }

    function addCharacter(character){
        const charBar = document.querySelector("div#character-bar")
        
        const span = document.createElement("span")
        span.innerText = character.name

        span.addEventListener("click", function() {
            addDetails(character)
        })

        charBar.append(span)
    }

    function addDetails(character){
        const p = document.querySelector("p#name")
        p.innerText = character.name

        const img = document.querySelector("img#image")
        img.src = character.image

        const caloriesSpan = document.querySelector("span#calories")
        caloriesSpan.innerText = character.calories

        const charID = document.querySelector("input#characterID")
        charID.value = character.id

        calorieForm.addEventListener("submit", () => {
            const calorieNum = event.target[1].value
            const newCalories = character.calories + parseInt(calorieNum,10)
            addCalories(newCalories)
        })
        resetButton.addEventListener('click', () => {
            addCalories(0)
        })

    }

    function addCalories(newCalories) {
        const charID = document.querySelector("input#characterID").value
        event.preventDefault()
        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                calories: newCalories
            })
        }
        fetch(url+charID,configObj)
        .then(res => res.json())
        .then(updatedCharacter => {
            addDetails(updatedCharacter)
            calorieForm.reset()
        })
    }

    fetchCharacters()



})

