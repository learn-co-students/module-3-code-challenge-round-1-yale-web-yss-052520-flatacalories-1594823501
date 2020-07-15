const url = "http://localhost:3000/characters"
let charac_bar = qs("#character-bar");

add_new_charac();
load_characters();

function add_new_charac(){

    let new_charac_form = ce("form")
    new_charac_form.id = "new_form";

    let input = ce("input");
    debugger;
}
function load_characters(){
    fetch(url)
    .then(resp => resp.json())
    .then(characters => {
        for (const character of characters){
            add_to_bar(character)
        }
    })
}

function add_to_bar(character){
   
    let span = ce("span");
    span.innerText = character.name;
    span.addEventListener("click", () => {
        fetch(url + `/${character.id}`)
        .then(resp => resp.json())
        .then(charac => add_charac_info(charac))
    })

    charac_bar.append(span);
}

function add_charac_info(character){
    let name = qs("#name");
    name.innerText = character.name; 

    let image = qs("#image");
    image.src = character.image;

    let calories = qs("#calories")
    calories.innerText = character.calories;

    let form = qs("#calories-form")
    form.addEventListener("submit", () => {
        event.preventDefault();
        let new_calories = add_calories(event.target[1].value, calories.innerText);
        fetch(url + `/${character.id}`, fetchObj("PATCH", patchData(new_calories)))
        .then(resp => resp.json())
        .then(new_character => {
            calories.innerText = new_character.calories;
            character = new_character;
        })
        form.reset();
    })
    
    let reset_btn = qs("#reset-btn");
    reset_btn.addEventListener("click", ()=> {
        fetch(url + `/${character.id}`, fetchObj("PATCH", patchData(0)))
        .then(resp => resp.json())
        .then(new_character => {
            calories.innerText = new_character.calories;
            character = new_character;
        })
    })

}



function patchData(new_calories){
    return {
        calories: new_calories
    }
}

function add_calories(old_calories, new_calories){
    return parseInt(old_calories, 10) + parseInt(new_calories, 10);
}


function fetchObj(fetch_method, body){
    let ret_Obj = {
        method: fetch_method,
        headers: {
            "Content-type":"application/json"
        }
    }
    if (body){
        ret_Obj["body"] = JSON.stringify(body)
    }
    return ret_Obj;
}

function ce(item){
    return document.createElement(item);
}

function qs(item){
    return document.querySelector(item);
}
