function qs(identifier){
	return document.querySelector(identifier)
}

function ce(element){
	return document.createElement(element)
}

const characterBar = qs("div#character-bar")
const detailedInfo = qs("div#detailed-info")

function showCharacters(){
  fetch('http://localhost:3000/characters')
  .then(res => res.json())
  .then(characters => {
    characters.forEach(character => {
      addCharacter(character)
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


    detailedInfo.append(characterName, characterImg, calorieCount, calorieForm)


    calorieForm.addEventListener('submit', (e) => {
      e.preventDefault()
      if (calorieForm[0].value) {
      let newCalories = calorieForm[0].value
      addCalories(character, newCalories)
      }
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
  .then(updatedCharacter => {
    showCharacter(updatedCharacter)
  })

}

showCharacters()