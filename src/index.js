document.addEventListener('DOMContentLoaded', function(){

    // helper methods 
    function qs(identifier){
        return document.querySelector(identifier)
    }
    function ce(element){
        return document.createElement(element) 
    }

    // grabs useful objects from DOM 
    const characterBar = qs('div#character-bar')
    const nameArea = qs('p#name') 
    const imgArea = qs('img#image')
    const caloriesArea = qs('span#calories') 
    const caloriesForm = qs('form#calories-form')
    const resetCaloriesButton = qs('button#reset-btn')

    const newNameForm = qs('form#new-name-form')
    const newCharacterForm = qs('form#new-character-form') 
    const newCharacterNameInput = qs('input#new-character-name')
    const newCharacterImageInput = qs('input#new-character-image')

    // fetch all characters 
    function fetchCharacters(){
        fetch("http://localhost:3000/characters")
            .then(res => res.json())
            .then(characters => showCharacters(characters)) 
    }  
    function showCharacters(characters){
        characters.forEach(character =>{
            addCharacter(character)
        })
    }

    // adds a character to the top bar  
    // re-use for making new character  
    function addCharacter(character){
        const characterSpan = ce('span') 
        characterSpan.innerText = character.name 
        characterSpan.id = 'character-' + character.id 

        characterSpan.addEventListener('click', function(){
            displayCharacter(character)
        }) 
        characterBar.append(characterSpan) 
    } 

    // shows a character on bottom details bar 
    function displayCharacter(character){ 

        nameArea.innerText = character.name
        imgArea.src = character.image 
        caloriesArea.innerText = parseInt(character.calories)
        const characterIdFieldinForm = qs('input[type="hidden"]') 
        characterIdFieldinForm.id = character.id 
    }

    // updates DB and DOM for updated calories 
    caloriesForm.addEventListener('submit', function(){
        event.preventDefault() 
        // conditional in case a character was not selected   
        if (nameArea.innerText != "Character's Name") { 
            currentCharacterId = qs('input[type="hidden"]').id  

            const currentCalories = parseInt(caloriesArea.innerText)
            let caloriesToAdd = qs('input#added-calories').value 
            // in case user leaves the field blank or types in nonsense  
            const numbers = /^[0-9]+$/ 
            if (!caloriesToAdd.match(numbers)){
                caloriesToAdd = "0" 
            } 
            const updatedCalories = currentCalories + parseInt(caloriesToAdd) 
            const configObj = { 
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 
                    calories: updatedCalories
                }) 
            }  
            fetch('http://localhost:3000/characters/'+ currentCharacterId, configObj)  
                .then(res => res.json())
                .then(updatedCharacter => {
                    caloriesArea.innerText = updatedCharacter.calories 
                }) 
        }
        caloriesForm.reset()  
    })


    // updates DB and DOM for reset calories  
    resetCaloriesButton.addEventListener('click', function(){ 
        // conditional in case a character was not selected   
        if (nameArea.innerText != "Character's Name") { 
            const slimmedCharacterId = qs('input[type="hidden"]').id  
            const configObj = { 
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 
                    calories: 0 
                }) 
            }  
            fetch('http://localhost:3000/characters/'+ slimmedCharacterId, configObj)
                .then(res => res.json())
                .then(slimmedCharacter => { 
                    caloriesArea.innerText = "0" 
                }) 
    }}) 

    // updates DB and DOM for changing name   
    newNameForm.addEventListener('submit', function(){
        event.preventDefault()
        // conditional in case a character was not selected   
        if (nameArea.innerText != "Character's Name") { 
            const renamedCharacterId = qs('input[type="hidden"]').id 
            let newName = qs('input#new-name').value 
            // in case user leaves the field blank 
            if (newName == ""){
                newName = " " 
            } 
            const configObj = { 
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 
                    name: newName 
                }) 
            } 
            fetch("http://localhost:3000/characters/"+renamedCharacterId, configObj)
                .then(res => res.json())
                .then(renamedCharacter => {
                    nameArea.innerText = renamedCharacter.name 
                    qs('span#character-'+renamedCharacter.id).innerText = renamedCharacter.name
                })
        }
        newNameForm.reset()  
    })

    // updates DB and DOM for making new character    
    newCharacterForm.addEventListener('submit', function(){
        event.preventDefault()
        const newCharacterName = newCharacterNameInput.value
        const newCharacterImage = newCharacterImageInput.value
        const configObj = { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                name: newCharacterName, 
                image: newCharacterImage,
                calories: 0
            }) 
        } 
        fetch("http://localhost:3000/characters", configObj)
            .then(res => res.json())
            .then(newCharacter => {
                addCharacter(newCharacter)
                console.log(newCharacter)
            })  
        newCharacterForm.reset() 
    })

    // call function to begin fetching characters, setting up page, on DOM load    
    fetchCharacters()

})