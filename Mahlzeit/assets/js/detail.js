const imgContainer = document.getElementById("imgContainer")
const keywordContainer = document.getElementsByClassName("keywords")
const mealNameH1 = document.getElementById("mealName")
const buttonContainer = document.getElementById("buttonContainer")
const ingredientsTable = document.getElementById("ingredientsTable")
const preparationList = document.getElementById("preparationList")


// Params prüfen!!
const params = new URLSearchParams(window.location.search).get("id")
let mealData = {}


async function requestAPI(param) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${param}`)    
        if (!response.ok)     
            throw new Error("Fehler beim Response")
        const data = await response.json()
        return data
    } catch(error) {
        console.error(error)
    }
}

function getRecipe(param) {
    requestAPI(param).then(data =>{
        if (data != undefined && data.meals != null) {
            mealData = data.meals[0]
            console.log(mealData)
        } else {
            mealData = {}
        }
        buildPage()
    })
}

function loadMealData() {

    if (params == "random.php") {
        const apiParams = "random.php"
        getRecipe(apiParams)
    } else {

        const apiParams = `lookup.php?i=${Number(params)}`
        getRecipe(apiParams)
    }
} 

function buildPage() {
    const mealName = mealData["strMeal"]
    const mealThumb = mealData["strMealThumb"]
    const mealYoutube = mealData["strYoutube"]
    const mealCountry = mealData["strCountry"]
    const mealCategory = mealData["strCategory"]
    const mealInstructions = mealData["strInstructions"].split("\r\n\r\n")
    const mealIngredients = []

    for (let i = 1; i < 21; i++) {
        const strIngredient = `strIngredient${i}`
        const strMeasure = `strMeasure${i}`

        if (mealData[strIngredient] != "" && mealData[strIngredient] != null)
            mealIngredients.push([mealData[strIngredient], mealData[strMeasure]])
    }

    const img = document.createElement("img")
    img.src = mealThumb
    imgContainer.append(img)

    const countryTag = document.createElement("p")
    countryTag.innerText = mealCountry
    keywordContainer[0].append(countryTag)

    const categoryTag = document.createElement("p")
    categoryTag.innerText = mealCategory
    keywordContainer[0].append(categoryTag)

    mealNameH1.innerText = mealName

    if (mealYoutube != ""){
        const playButton = document.createElement("a")
        playButton.classList.add("redButton")
        playButton.innerText = "▶ Video Abspielen"
        playButton.href = mealYoutube
        buttonContainer.append(playButton)
    }

    const otherButton = document.createElement("a")
    otherButton.classList.add("greyButton")
    otherButton.innerText = "Anderes Rezept"
    // otherButton.href = zur Hauptseite in die Kategorie springen!
    buttonContainer.append(otherButton)

    mealIngredients.forEach(element => {
        const tblRow = document.createElement("tr")
        let tblData = document.createElement("td")
        tblData.innerText = element[0]
        tblRow.append(tblData)

        tblData = document.createElement("td")
        tblData.innerText = element[1]
        tblRow.append(tblData)

        ingredientsTable.append(tblRow)
    });

    mealInstructions.forEach(element => {
        element = element.replace(/^step\s+\d+\s*/i, "")
        const listItem = document.createElement("li")
        listItem.innerText = element
        preparationList.append(listItem)
    });
}

loadMealData()
