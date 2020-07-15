document.addEventListener("DOMContentLoaded", () => {
    function qs(selector){
        return document.querySelector(selector)
    }

    function ce(element){
        return document.createElement(element)
    }

    const characterList = qs("div#character-bar")
    const characterInfo = qs("div#detailed-info")
    const form = qs("form#calories-form")
    // const resetbutton = qs("button#reset-btn")

    function getCharacters(){
        characterList.innerHTML = ""
        fetch("http://localhost:3000/characters")
        .then(res => res.json())
        .then(characters => {
            displayCharacters(characters)
        })
    }

    function displayCharacters(characters){
        characters.forEach(character => {
            makeCharacterList(character)
        })
    }

    function makeCharacterList(character){
        let span = ce("span")
        span.innerText = character.name
        span.addEventListener("click", () => renderCharacterInfo(character))
        characterList.append(span)
    }

    function renderCharacterInfo(character){
        //characterInfo.innerHTML = ""
        let name = qs("p#name")
        name.innerText = character.name

        let image = qs("img#image")
        image.src = character.image

        let calories = qs("span#calories")
        calories.innerText = character.calories

        form.addEventListener("submit", function() {
            event.preventDefault()
            let newcalories = event.target[1].value
            // let updatedcalories = character.calories +
            let totalcalories = parseInt(character.calories) + parseInt(newcalories)
            let configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    calories: totalcalories
                })    
            }
            
            fetch("http://localhost:3000/characters/" + character.id, configObj)
            .then(res => res.json())
            .then(updatedCharacter => {
                renderCharacterInfo(updatedCharacter)
                form.reset()
                character = updatedCharacter
            })
        })

        // resetbutton.addEventListener("click", () => {
        //     event.preventDefault()
        //     let newcalories0 = 0
        //     let image = character.image
        //     let name = character.name
        //     // let updatedcalories = character.calories +
            
        //     let configObj = {
        //         method: "PATCH",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             calories: newcalories0
        //         })    
        //     }
            
        //     fetch("http://localhost:3000/characters/" + character.id, configObj)
        //     .then(res => res.json())
        //     .then(newCharacter => {
        //         renderCharacterInfo(newCharacter)
        //         character = newCharacter
        //     })
        // })

        
    }


    getCharacters()

    
    

})    