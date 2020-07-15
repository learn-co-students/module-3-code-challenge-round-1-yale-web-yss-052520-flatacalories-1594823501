const baseURL = "http://localhost:3000"

const charBar = document.querySelector("#character-bar")
const detailBox = document.querySelector("#detailed-info")

fetch(baseURL + "/characters")
    .then(r => r.json())
    .then(charArr => renderChars(charArr))

function renderChars(charArr) {
  charArr.forEach(char => renderChar(char))
}

function renderChar(char) {
  charSpan = document.createElement("span")
  charSpan.innerText = char.name
  charBar.append(charSpan)

  charSpan.addEventListener("click", () => renderDetails(char))
}

function renderDetails(char) {
  name = detailBox.querySelector("#name")
  name.innerText = char.name
  image = detailBox.querySelector("#image")
  image.src = char.image
  calories = detailBox.querySelector("#calories")
  calories.innerText = char.calories

  calsForm = detailBox.querySelector("#calories-form")
  calsForm.querySelector("#new-calories").value = null

  calsForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const addCals = calsForm.querySelector("#new-calories").value
    const newCals = ( parseInt(char.calories, 10) + parseInt(addCals, 10) ).toString()

    const configObj = {
      headers: {
        'Content-Type': "application/json",
        'Accept': "application/json"
      },
      method: "PATCH",
      body: JSON.stringify({
        'calories': newCals
      })
    }

    fetch(baseURL + "/characters/" + char.id, configObj)
      .then(res => res.json())
      .then(json => {
        renderDetails(json)
      })

  })

  // delBtn = detailBox.querySelector("")

}
