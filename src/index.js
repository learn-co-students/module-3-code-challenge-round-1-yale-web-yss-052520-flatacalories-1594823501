document.addEventListener("DOMContentLoaded", () => {

    const qs = (selector) => document.querySelector(selector)
    const ce = (element) => document.createElement(element)
    const url = "http://localhost:3000/characters"
    const characterBar = qs("#character-bar")

    function getCharacters(){
        fetch(url)
        .then(response => response.json())
        .then(characters => characters.forEach(character => addCharacter(character)))
    }

    getCharacters()

    function addCharacter(character){
        const span = ce("span")
        span.innerText = character.name
        span.addEventListener("click", () => {
            fetch(url + `/${character.id}`)
            .then(response => response.json())
            .then(character => addInfo(character))
        })
        characterBar.append(span)
    }

    function addInfo(character){

            const name = qs("p")
            name.innerText = character.name

            const image = qs("#image")
            image.src = character.image

            const calories = qs("#calories")
            calories.innerText = character.calories;

            const caloriesForm = qs("#calories-form")
            caloriesForm.addEventListener("submit", () => {
                event.preventDefault()
                const newCalories = addCalories(event.target[1].value, calories.innerText);
                const configObj = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        calories: newCalories
                    })
                }
                fetch (url + `/${character.id}`, configObj)
                .then(response => response.json())
                .then(updatedCharacter => {
                    calories.innerText = updatedCharacter.calories
                    character = updatedCharacter
                })
                caloriesForm.reset()

            })

            const resetBtn = qs("#reset-btn")
            resetBtn.addEventListener("click", () => {
                const configObject = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        calories: 0
                    })
                }
                fetch (url + `/${character.id}`, configObject)
                .then(response => response.json)
                .then(updatedCharacter => {
                    calories.innerText = updatedCharacter.calories
                    character = updatedCharacter
                })
            })
        }

        function addCalories(oldCalories, newCalories){
            return parseInt(oldCalories, 10) + parseInt(newCalories, 10)
        }
})