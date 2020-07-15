document.addEventListener("DOMContentLoaded", () => {
	showAllChars()
	addCalories()
	resetCalories()
})

function ce(element) {
	return document.createElement(element)
}

function query(arg) {
	return document.querySelector(arg)
}

function addOneChar(char) {
	let charList = query('div#character-bar')
	let name = ce('span')
	name.innerText = char.name
	charList.append(name)

	name.addEventListener("click", () => {
		let charName = query('p#name')
		charName.innerText = char.name

		let img = query('img#image')
		img.src = char.image

		let cal = query('span#calories')
		cal.innerText = char.calories

		let charID = query('input#characterId')
		charID.value = char.id
	})
}

function showAllChars() {
	let charList = query('div#character-bar')
	charList.innerHTML = ""

	fetch('http://localhost:3000/characters')
	.then(response => response.json())
	.then(characters => characters.forEach(char => {
		addOneChar(char)
	}))
}

function changeCalories(calNum) {
	let form = query('form#calories-form')
	let idNum = form[0].value

	let postObj = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body:JSON.stringify({
			calories: calNum
		})
	}

	fetch('http://localhost:3000/characters/' + idNum, postObj).then(() => showAllChars())
	let cal = query('span#calories')
	cal.innerText = calNum
	form.reset()
}

function addCalories() {
	let form = query('form#calories-form')
	
	form.addEventListener("submit", () => {
		event.preventDefault()

		let listedCals = query('span#calories').innerText 
		let currentCals = (listedCals == "Character's Calories") ? 0 : parseInt(listedCals)
		let addedCals = parseInt(form[1].value)
		let totalCals = currentCals + addedCals
		changeCalories(totalCals)
	})

}

function resetCalories() {
	let form = query('form#calories-form')
	let resetBtn = query('button#reset-btn')
	resetBtn.addEventListener("click", () => {
		changeCalories(0)
	})
}


