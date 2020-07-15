document.addEventListener("DOMContentLoaded", () => {

    function fetchAll() {
        fetch("http://localhost:3000/characters")
        .then(resp => resp.json())
        .then(allChar => {
            allChar.forEach(char => addCharacters(char))
        })
    }

    fetchAll()

    function addCharacters(char) {
        const characterInfo = document.getElementById("detailed-info")
        const characterBar = document.getElementById("character-bar")
        
        const span = document.createElement("span")
        span.innerText = char.name 
        span.id = char.id

        characterBar.append(span)
        
        span.addEventListener("click", () => {
            
            const pTag = document.getElementById("name")
            pTag.innerText = char.name 

            const img = document.getElementById("image")
            img.src = char.image 

            const h4 = document.getElementById("myHeader")
            const spanCalories = document.getElementById("calories")
            spanCalories.innerText = char.calories
            h4.append(spanCalories)
            
            const caloriesForm = document.getElementById("calories-form")
            caloriesForm.addEventListener("submit", () => {
                event.preventDefault()
                let formValue = parseInt(event.target[1].value)
                let charValue = parseInt(char.calories)
                calories = formValue + charValue
                fetch("http://localhost:3000/characters/"+char.id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type" : "application/json",
                        "Accept" : "application/json"
                    },
                    body: JSON.stringify({
                        calories: calories
                    })
                })
                .then(resp => resp.json())
                .then(updatedCharacter => {
                    spanCalories.innerText = updatedCharacter.calories
                    char = updatedCharacter
                    caloriesForm.reset()
                })
            })
            const resetCalories = document.getElementById("reset-btn")
            resetCalories.addEventListener("click", () => {
                event.preventDefault()
                fetch("http://localhost:3000/characters/"+char.id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type" : "application/json",
                        "Accept" : "application/json"
                    },
                    body: JSON.stringify({
                        calories: 0
                    })
                })
                .then(resp => resp.json())
                .then(updatedCharacter => {
                    spanCalories.innerText = updatedCharacter.calories
                    char = updatedCharacter
                })
            })

            characterInfo.append(pTag, img, h4, caloriesForm, resetCalories)

        })

        
    }


})