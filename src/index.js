function qs(identifier){
	return document.querySelector(identifier)
}

function ce(element){
	return document.createElement(element)
}

const characterBar = qs("div#character-bar")
const detailedInfo = qs("div#detailed-info")

function showTopBar(){
  characterBar.innerHTML = ''
  fetch('http://localhost:3000/characters')
  .then(res => res.json())
  .then(characters => {
    characters.forEach(character => {
      addCharacter(character)
    })
  })
  .then(() => {
    displayNewCharacterSpan()
  })
}

function displayNewCharacterSpan(){
  let newSpan = ce('span')
  newSpan.innerText = "New Character"
  newSpan.id = "new-character"
  characterBar.append(newSpan)
  newSpan.addEventListener('click', () => {
    displayNewCharacterForm()
  })
}

function displayNewCharacterForm(){
  detailedInfo.innerHTML = ''

  let header = ce('h4')
  header.innerText = "Create a New Character"

  let newCharacterForm = ce('form')
  newCharacterForm.id = "new-character-form"

  let newCharacterName = ce('input')
  newCharacterName.type = "text"
  newCharacterName.placeholder = "Name"

  let newCharacterImg = ce('input')
  newCharacterImg.type = "text"
  newCharacterImg.placeholder = "Image URL"

  let submitBtn = ce('input')
  submitBtn.type = "submit"
  submitBtn.value = "Create"

  newCharacterForm.append(newCharacterName, newCharacterImg, submitBtn)
  detailedInfo.append(header, newCharacterForm)

  newCharacterForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let configObj = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newCharacterForm[0].value,
        image: newCharacterForm[1].value,
        calories: 0
      })
    }

    fetch(`http://localhost:3000/characters`, configObj)
    .then(res => res.json())
    .then((updatedCharacter) => {
      showTopBar()
      showCharacter(updatedCharacter)
    })

  })
}



function addCharacter(character){
  let sp = ce('span')
  sp.innerText = character.name

  sp.addEventListener('click', () => {showCharacter(character)})

  characterBar.append(sp)
}

function showCharacter(character){

  console.log("Showing " + character.name)

  fetch(`http://localhost:3000/characters/${character.id}`)
  .then(res => res.json())
  .then(character => {
    detailedInfo.innerHTML = ''

    let characterName = ce('p')
    characterName.innerText = character.name
    characterName.id = "name"

    let editNameBtn = ce('button')
    editNameBtn.innerText = "Edit"

    //characterName.append(editNameBtn)

    let characterImg = ce('img')
    characterImg.src = character.image
    characterImg.id = "image"

    let calorieCount = ce('h4')
    calorieCount.innerText = "Total Calories: "

    let numberOfCalories = ce('span')
    numberOfCalories.innerText = character.calories
    numberOfCalories.id = "calories"

    calorieCount.append(numberOfCalories)

    let calorieForm = ce('form')
    calorieForm.id = "calories-form"

    let newCalories = ce('input')
    newCalories.type = "number"
    newCalories.placeholder = "Enter Calories"

    let submitBtn = ce('input')
    submitBtn.type = "submit"
    submitBtn.value = "Add Calories"

    calorieForm.append(newCalories, submitBtn)

    resetBtn = ce('button')
    resetBtn.id = "reset-button"
    resetBtn.innerText = "Reset Calories"

    detailedInfo.append(characterName, characterImg, calorieCount, calorieForm, resetBtn)


    calorieForm.addEventListener('submit', (e) => {
      e.preventDefault()
      if (calorieForm[0].value) {
      let newCalories = calorieForm[0].value
      addCalories(character, newCalories)
      }
    })

    resetBtn.addEventListener('click', () => {
      resetCalories(character)
    })

  })

}

function addCalories(character, newCalories){
  console.log("Adding " + newCalories + " calories to " + character.name)

  let configObj = {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      calories: parseInt(character.calories, 10) + parseInt(newCalories, 10)
    })
  }

  fetch(`http://localhost:3000/characters/${character.id}`, configObj)
  .then(res => res.json())
  .then((updatedCharacter) => {
    showCharacter(updatedCharacter)
  })

}

function resetCalories(character){
  console.log("Resetting calories for " + character.name)

  let configObj = {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      calories: 0
    })
  }

  fetch(`http://localhost:3000/characters/${character.id}`, configObj)
  .then(res => res.json())
  .then(updatedCharacter => {
    showCharacter(updatedCharacter)
  })
}

showTopBar()
