document.addEventListener("DOMContentLoaded", function () {
    function ce(element) {
        return document.createElement(element)
    }

    function qs(selector) {
        return document.querySelector(selector)
    }

    const URL = "http://localhost:3000/characters"
    const calorieForm = document.getElementById("calories-form")

    const characterInfo = qs("#characterInfo")
    const detailedInfo = document.getElementById("detailed-info")
    
    function fetchCharacters () {
        fetch(URL)
        .then(res => res.json())
        .then(characters => characters.forEach(character => displayCharacter(character)))
    }

    function displayCharacter(character) {

        let span = ce("span")
        span.innerText = character.name

        qs('#character-bar').append(span)


        span.addEventListener("click", () => {
            detailedInfo.innerHTML = ""

            let h2 = ce("h2")
            h2.innerText = character.name

  
            let img = ce("img")
            img.src = character.image

            let p = ce("p")
            p.innerText = character.calories
            // debugger
            detailedInfo.append(h2, img, p, calorieForm)


                calorieForm.addEventListener("submit", () => {
                    event.preventDefault()
                    cals = event.target[1].value
                    fetch(`http://localhost:3000/characters/${character.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            characterId: character.id
                        })
                    }) 

                    .then(res => res.json())
                    .then(character=> { character.calories = +character.calories + +cals
                    p.innerText = character.calories})

                })
            })
        }
    fetchCharacters()
})
