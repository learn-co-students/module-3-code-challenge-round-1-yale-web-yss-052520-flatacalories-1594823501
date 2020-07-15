// helper functions
function qs(selector){
    return document.querySelector(selector)
}

function ce(element){
    return document.createElement(element)
}

// variables
const cBar = qs("#character-bar")
// const charInfo = qs(".characterInfo")
const calForm = qs("#calories-form")


// GET characters
function fetchChars(){
    fetch("http://localhost:3000/characters")
    .then(res => res.json())
    .then(showChars)
}

// iterate through chars
function showChars(chars){
    chars.forEach(char => displayChar(char))
} 

const h4Span = qs("span#calories")

// display one char
function displayChar(char){
    // debugger
    const span = ce("span")

    // didn't specify tag for names in bar, so I chose h2
    const name = ce("h2")
    name.innerText = char.name

    span.appendChild(name)
    cBar.appendChild(span)

    span.addEventListener("click", () => {
        // displays individual character info 
        const p = qs("p#name")
        p.innerText = char.name

        const img = qs("img#image")
        img.src = char.image

        // const h4Span = qs("span#calories")
        h4Span.innerText = char.calories 

        addCalBtn.addEventListener("click", () => {
            // debugger
            event.preventDefault() //the eventlistener wasn't working with "submit", and still requires this line...which doesn't make sense

            const calInput = qs("input#cal")
            const newCals = parseInt(calInput.value, 10) + parseInt(char.calories, 10)

            // update cal of current char on server
            let configObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept":"application/json"
                },
                body: JSON.stringify({
                    calories: newCals
                })
            }

            fetch (`http://localhost:3000/characters/${char.id}`, configObj)
            .then(res => res.json())
            .then(updatedChar => displayCharacter(updatedChar))
            // calForm.reset()
        })

        

    })

}

const addCalBtn = qs("input#sub")

// addCalBtn.addEventListener("click", () => {
//     // debugger
//     const calInput = qs("input#cal")

//     const newCals = parseInt(calInput.value + char.calorie)

//     // update cal of current char on server
//     let configObj = {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept":"application/json"
//         },
//         body: JSON.stringify({
//             id: char.id,
//             calories: newCals
//         })
//     }

//     fetch (`http://localhost:3000/characters/${char.id}`, configObj)
//     .then(res => res.json())
//     .then(updatedCals => {
//         h4Span.innerText = updatedCals
//     })
// })

// const subInput = qs("input#sub")
// const idInput = qs("input#characterId")

fetchChars()