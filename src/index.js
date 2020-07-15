document.addEventListener("DOMContentLoaded", () => {
    const url = "http://localhost:3000/characters/"
    const calorieForm = document.querySelector("form#calories-form")
    const resetButton = document.querySelector("button")
    const editName = document.querySelector("form#edit-name")

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
        span.id = character.id.toString()

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
            document.querySelector("input#newname").value ? newName = document.querySelector("input#newname").value : newName = character.name
            const calorieNum = event.target[1].value
            const newCalories = character.calories + parseInt(calorieNum,10)
            updateChar(newCalories,)
        })

        resetButton.addEventListener('click', () => {
            updateChar(0)
        })

        editName.addEventListener("submit",() =>{
            const newName = event.target[0].value
            updateChar(character.calories, newName)
            const span = document.querySelector(`span#${character.id}`)
            console.log(span)
            span.innerText = character.name
            console.log(span)
        })

    }

    function updateChar(newCalories, newName) {
        const charID = document.querySelector("input#characterID").value
        event.preventDefault()
        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                calories: newCalories,
                name: newName
            })
        }
        fetch(url+charID,configObj)
        .then(res => res.json())
        .then(updatedCharacter => {
            addDetails(updatedCharacter)
            calorieForm.reset()
            editName.reset()
        })
    }

    fetchCharacters()

})

