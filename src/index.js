const char_bar = document.querySelector("#character-bar")
const char_name = document.querySelector("#name")
const char_img = document.querySelector("#image")
const char_cal = document.querySelector("#calories")
const add_cal_form = document.querySelector("#calories-form")
const char_id = document.querySelector("#characterId")
const reset_cal_button = document.querySelector("#reset-btn")

load_char()

function load_char(){

    fetch("http://localhost:3000/characters")
    .then(res => res.json())
    .then(res => {
        char_bar.innerHTML = ""
        res.forEach(char => add_char(char))
    })
}

function add_char(char){
    const span = document.createElement("span")
    span.innerText = char.name
    char_bar.append(span)
    span.addEventListener("click", function(){
        char_name.innerText = char.name
        char_img.src = char.image
        char_cal.innerText = char.calories
        char_id.value = char.id
    })
}

function update_cal(new_cal){
    const id = char_id.value
    const configObj = {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
            calories: new_cal
        })
    }
    fetch(`http://localhost:3000/characters/${id}`, configObj)
    .then(res => res.json())
    .then(res => {
        char_cal.innerText = res.calories
        load_char()  //this is to update the span event listener
        add_cal_form.reset()
    })
}

add_cal_form.addEventListener("submit", function(){
    event.preventDefault() 
    if (isNaN(add_cal_form[1].value)){  //check if the calories is a number
        alert("calories not a number!")
        add_cal_form.reset()
    }
    else if (char_id.value !== "Character's id" && add_cal_form[1].value != ""){
        //check if character is selected && calories is empty
        const new_cal = parseInt(add_cal_form[1].value, 10) + parseInt(char_cal.innerText)
        update_cal(new_cal)
    }
})

reset_cal_button.addEventListener("click", function(){
    if (char_id.value !== "Character's id"){
        update_cal(0)
    }
})