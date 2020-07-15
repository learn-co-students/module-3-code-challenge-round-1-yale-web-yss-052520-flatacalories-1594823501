document.addEventListener("DOMContentLoaded", () => {
    function ce(element){
        return document.createElement(element)
    }

    function qs(selector){
        return document.querySelector(selector)
    }

    const bar = qs("#character-bar")
    const details = qs("#detailed-info")
    const display = qs("div.characterInfo")
    
    function fetchCharacters(){
        bar.innerHTML = ""

        fetch("http://localhost:3000/characters")
        .then(res => res.json())
        .then(characters => characters.forEach(character => showcharacter(character)))
    }

    function showcharacter(character){
        //console.log(character)
        let nametag = ce("span")
        nametag.innerText = character.name 

        bar.append(nametag)

        nametag.addEventListener("click", () => rendercharacter(character))

        function rendercharacter(character){
            let nombre = qs("#name")
            nombre.innerText = character.name

            let picUrl = qs("img#image")
            picUrl.src = character.image 

            let header = qs("span#calories")
            header.innerText = character.calories

            let form = qs("#calories-form")

            form.addEventListener("click", (e) => {
                e.preventDefault()
                console.log(e.path) // didnt know how to read the value inputted to form :(

                let newcalories = parseInt(character.calories) + parseInt(e.target[1].value)

                fetch("http://localhost:3000/characters/:id",{
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "calories": newcalories
                    })
                    .then(res => res.json())
                    .then(character => rendercharacter(character))
                })
            })

            
            
            //header.append(cals)
            details.append(nombre, picUrl, header)
            //display.append(details)


        }
    
        
    }

    fetchCharacters()
    
})




