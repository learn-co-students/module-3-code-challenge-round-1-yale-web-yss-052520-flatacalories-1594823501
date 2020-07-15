const characterBar = document.querySelector("div#character-bar")
const characterDetails = document.querySelector("div#detailed-info")

fetch("http://localhost:3000/characters")
.then(res => res.json())
.then(characters => {characters.forEach(character => {
    sp = document.createElement("span")
    sp.innerText = character.name
    characterBar.appendChild(sp)

    sp.addEventListener("click", function() {
        displayCharacter(character)
    })
})})

function displayCharacter(character) {
    p = document.querySelector("p#name")
    p.innerText = character.name

    img = document.querySelector("img#image")
    img.src = character.image

    span = document.querySelector("span#calories")
    span.innerText = character.calories

    form = document.querySelector("form#calories-form")
    form.addEventListener("submit", e => {
        e.preventDefault()

        character.calories = character.calories + parseInt(e.target[1].value)

        fetch("http://localhost:3000/characters/" + character.id, {
            method: "PATCH",
            headers: { "Content-Type": "application/JSON"},
            body: JSON.stringify({
                calories: character.calories
            })
        })
        
        span.innerText = character.calories

        form.reset()

    })
}

