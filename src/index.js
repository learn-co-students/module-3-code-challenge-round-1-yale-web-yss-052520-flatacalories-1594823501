document.addEventListener('DOMContentLoaded', () => {
    let characterBar = document.querySelector('div#character-bar')
    let detailedInfo = document.querySelector('div#detailed-info')
    let nameForm = document.querySelector('form#name-form')
    let newForm = document.querySelector('form#new-character')
    
    // newForm.style.display = 'none'
    nameForm.style.display = 'none'
    detailedInfo.innerHTML = ""

    function ce(element) {
        return document.createElement(element)
    }

    function fetchCharacters() {
        characterBar.innerHTML = ""
        fetch('http://localhost:3000/characters')
            .then(res => res.json())
            .then(characters => addCharacters(characters))
    }

    function addCharacters(characters) {
        characters.forEach(character => addCharacter(character))
    }

    function addCharacter(character) {
        let span = ce('span')

        span.innerText = character.name
        characterBar.append(span)

        span.addEventListener('click', () => {
            fetchCharacters() //so that it draws characters with updated info
            drawCharacter(character)
        })
    }

    function drawCharacter(character) {
        detailedInfo.innerHTML = ""

        let p = ce('p')
        p.id = 'name'
        p.innerText = character.name

        let nameButton = ce('button')
        nameButton.id = 'reset-btn'
        nameButton.innerText = 'Edit Name'

        let br = ce('br')

        let img = ce('img')
        img.id = 'image'
        img.src = character.image

        let h4 = ce('h4')
        h4.innerText = "Total Calories: "

        let span = ce('span')
        span.id = 'calories'
        span.innerText = character.calories

        h4.append(span)

        let form = ce('form')
        form.id = 'calories-form'

        let input1 = ce('input')
        input1.type = 'hidden'
        input1.value = character.id
        input1.id = 'characterId'

        let input2 = ce('input')
        input2.type = 'text'
        input2.placeholder = 'Enter Calories'

        let input3 = ce('input')
        input3.type = 'submit'
        input3.value = 'Add Calories'

        form.append(input1, input2, input3)

        let resetButton = ce('button')
        resetButton.id = 'reset-btn'
        resetButton.innerText = 'Reset Calories'

        detailedInfo.append(p, nameButton, br, img, h4, form, resetButton)

        form.addEventListener('submit', () => {
            event.preventDefault()

            let newCalories = event.target[1].value

            let configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "calories": parseInt(character.calories, 10) + parseInt(newCalories, 10)
                })
            }

            fetch(`http://localhost:3000/characters/${character.id}`, configObj)
            .then(res => res.json())
            .then(updatedCharacter => drawCharacter(updatedCharacter))
            form.reset()
        })

        resetButton.addEventListener('click', () => {
            let newCalories = 0

            let configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "calories": parseInt(newCalories, 10)
                })
            }

            fetch(`http://localhost:3000/characters/${character.id}`, configObj)
            .then(res => res.json())
            .then(updatedCharacter => drawCharacter(updatedCharacter))
        })

        nameButton.addEventListener('click', () => {
            nameForm.style.display = 'block'

            nameForm.addEventListener('submit', () => {
                event.preventDefault()

                let newName = event.target[0].value

                let configObj = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "name": newName
                    })
                }

                fetch(`http://localhost:3000/characters/${character.id}`, configObj)
                .then(res => res.json())
                .then(updatedCharacter => drawCharacter(updatedCharacter))
                .then(fetchCharacters) //This is so that the bar at the top also updates with the new name
                form.reset()
                nameForm.style.display = 'none'
            })

        })
    }
    fetchCharacters()

    newForm.addEventListener('submit', () => {
        event.preventDefault()

        let newName = event.target[0].value
        let newImage = event.target[1].value
        let newCalories = event.target[2].value

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": newName,
                "image": newImage,
                "calories": newCalories
            })
        }

        fetch('http://localhost:3000/characters', configObj)
        .then(fetchCharacters)
        newForm.reset()
    })

    })

