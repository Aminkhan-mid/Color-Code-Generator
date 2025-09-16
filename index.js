const colorInp = document.getElementById('colorInp')
const dropDownId = document.getElementById('dropDownId')
const getHexBtn = document.getElementById('getHexBtn')
const renderColorModul = document.getElementById('renderColorModul')


getHexBtn.addEventListener('click', function(){
    let colorValue = colorInp.value.replace("#", "")
    let selectValue = dropDownId.value
    if(colorValue === "" || selectValue === ""){
        fetchRandomColorFromAPI()
    } else{
        fetchColorSlectValue(colorValue, selectValue)
    }
})

function fetchRandomColorFromAPI(){
    fetch(`https://www.thecolorapi.com/scheme?hex=${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`, {method: "GET"})
    .then(response => response.json())
    .then(data => {
    const hexColors = data.colors.map((color)=> color.hex.value)
    render(hexColors)
    })
}

function fetchColorSlectValue(color, select){
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${select}&count=6`, {method: "GET"})
        .then(response => response.json())
        .then(data => {
            const valueColor = data.colors.map(color => color.hex.value)
            render(valueColor)
        })
}



function render(colors){
    const colorDiv = colors.map(function(color){
        return `<div class="color" style="background-color: ${color}"></div>`
    }).join('')
    const colorCode = colors.map(function(color){
        return `<p>${color}</p>`
    }).join('')

    renderColorModul.innerHTML = 
      ` <div class="colorBox" id="colorBox">
          ${colorDiv}
        </div>
        
        <div class="colorBoxCodes" id="colorBoxCodes">
            ${colorCode}
        </div>
        `
}

