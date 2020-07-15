document.addEventListener("DOMContentLoaded", () => {
	showAllChars()
	addCalories()
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
	fetch('http://localhost:3000/characters')
	.then(response => response.json())
	.then(characters => characters.forEach(char => {
		addOneChar(char)
	}))
}

function addCalories() {
	let form = query('form#calories-form')

	form.addEventListener("submit", () => {
		event.preventDefault()
		let charID = form[0].value

		let listedCals = query('span#calories').innerText 
		let currentCals = (listedCals == "Character's Calories") ? 0 : parseInt(listedCals)
		let addedCals = parseInt(form[1].value)
		let totalCals = currentCals + addedCals

		let cal = query('span#calories')
		cal.innerText = totalCals

		let postObj = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body:JSON.stringify({
				calories: totalCals
			})
		}

		fetch('http://localhost:3000/characters/' + charID, postObj)
		// debugger
		form.reset()
	})
}