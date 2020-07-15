function qs(element) {
    return document.querySelector(element)
}

function ce(element) {
    return document.createElement(element)
}
{/* <p id="name">Character's Name</p>
<img id="image" src="assets/dummy.gif"><!-- display character image here -->
<h4>Total Calories: <span id="calories">Character's Calories</span> </h4>
<form id="calories-form">
<input type="hidden" value="Character's id" id="characterId"/> <!-- Assign character id as a value here -->
<input type="text" placeholder="Enter Calories"/>
<input type="submit" value="Add Calories"/>
</form>
<button id="reset-btn">Reset Calories</button> */}

const characterBar = qs("div#character-bar")
const showcaseDiv = qs("div#detailed-info")
const p = qs("p#name")
const img = qs("img#image")
const calorieSpan = qs("span#calories")
const form = qs("form#calories-form")
const resetBtn = qs("button#reset-btn")
var currentCharacter


fetch("http://localhost:3000/characters")
.then( res => res.json() )
.then( characters => showCharacters(characters))

function showCharacters(characters) {
    characters.forEach(character => {
        displayCharacter(character)
    })
}

function displayCharacter(character) {
    let span = ce("span")
    span.innerText = character.name
    span.addEventListener("click", () => {
        // showcaseCharacter(character)
        p.innerText = character.name

        img.src = character.image

        calorieSpan.innerText = character.calories

        form.addEventListener("submit", () => {
            event.preventDefault()
            // document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            submitCalories = event.target[1].value
            // debugger
            fetch(`http://localhost:3000/characters/${character.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    calories: +character.calories + +submitCalories
                })
            })
            .then(res => res.json())
            .then(updatedCharacter => {
                character = updatedCharacter
                calorieSpan.innerText = character.calories
                form.reset()
            })
        })
    })
    characterBar.appendChild(span)
}



// function showcaseCharacter(character) {
//     // currentCharacter = character

//     p.innerText = character.name

//     img.src = character.image

//     calorieSpan.innerText = character.calories

//     form.addEventListener("submit", () => {
//         event.preventDefault()
//         // document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
//         submitCalories = event.target[1].value
//         // debugger
//         fetch(`http://localhost:3000/characters/${character.id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify({
//                 calories: +character.calories + +submitCalories
//             })
//         })
//         .then(res => res.json())
//         .then(updatedCharacter => {
//             character = updatedCharacter
//             calorieSpan.innerText = character.calories
//             form.reset()
//         })
//     })
// }

