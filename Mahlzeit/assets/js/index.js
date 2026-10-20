const alphabet = "abcdefghijklmnopqrstuvwxyz"
let letterIndex
let mealArray = []
let currentFilter = "All"

const filterButtonsContainer = document.getElementById("filterButtons") 
const mealOverview = document.getElementById("mealOverview")
const loadMoreButton = document.getElementById("loadMore")

async function requestAPI(apiParams) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/${apiParams}`)    
        if (!response.ok)     
            throw new Error("Fehler beim Response")
        const data = await response.json()
        return data
    } catch(error) {
        console.error(error)
    }
}

function loadCategoryData(){
    requestAPI(`list.php?c=list`).then(data =>{
        if (data != undefined && data.meals != null) {
            const categories = data.meals
            categories.forEach(element => {
                const filterButton = document.createElement("button")
                filterButton.innerText = element["strCategory"]
                filterButton.classList.add("filterButton")
                filterButton.id = element["strCategory"]
                filterButtonsContainer.append(filterButton)
            });
        } else {
            return
        }
    })
}

function loadMealData(i, id) {

    if (id == "All") {
        console.log("es ist in All")
        if (mealArray.length == 0) {
            if (letterIndex == undefined) {
                letterIndex = 0
            } else {
                letterIndex++
            }

            if (letterIndex > 25) {
                mealArray = []
                return
            } 

            requestAPI(`search.php?f=${alphabet[letterIndex]}`).then(data =>{
                if (data != undefined && data.meals != null) {
                    mealArray = data.meals.reverse()
                    console.log(mealArray)
                    buildMealOverview(i)
                } else {
                    mealArray = []
                    loadMealData(i, id)
                }
            })
        }
    } else {
        letterIndex = undefined
        requestAPI(`filter.php?c=${id}`).then(data =>{
            if (data != undefined && data.meals != null) {
                mealArray = data.meals.reverse()
                console.log(mealArray)
                buildMealOverview(i)
            } else {
                mealArray = []
            }
        })

    }
} 


function buildMealOverview(j) {
    for (let i = j; i <= 5; i++) {
        if (mealArray.length > 0) {
            const meal = mealArray.pop()
            buildMealCard(meal)
        } else {

            if (letterIndex > 25) {
                mealArray = []
                return
            } 
            return loadMealData(i)            
        }
    }
}    


function buildMealCard(mealData) {
    const mealName = mealData["strMeal"]
    const mealId = mealData["idMeal"]
    const mealThumb = mealData["strMealThumb"]
    const mealCountry = mealData["strCountry"]
    const mealCategory = mealData["strCategory"]

    // if (id == "All") {
    //     mealCategory = mealData["strCategory"]
    // } else {
    //     mealCategory = id
    // }

    const newArticle = document.createElement("article")
    newArticle.classList.add("mealCard")

    const newImg = document.createElement("img")
    newImg.src = mealThumb
    newImg.alt = mealName
    newArticle.append(newImg)    

    const newDiv = document.createElement("div")
    newDiv.classList.add("shortDescription")
    newArticle.append(newDiv)   
    
    const newKeywordContainer = document.createElement("div")
    newKeywordContainer.classList.add("keywords")
    newDiv.append(newKeywordContainer)  

    const newCountryTag = document.createElement("p")
    newCountryTag.innerText = mealCountry
    newKeywordContainer.append(newCountryTag)

    const newCategoryTag = document.createElement("p")
    newCategoryTag.innerText = mealCategory
    newKeywordContainer.append(newCategoryTag)

    const newMealName = document.createElement("h3")
    newMealName.innerText = mealName
    newDiv.append(newMealName)

    const newMealLink = document.createElement("a")
    newMealLink.innerText = "Rezept ansehen →"
    newMealLink.href = `detail.html?id=${mealId}`
    newDiv.append(newMealLink)
    
    mealOverview.append(newArticle)
}

/************** LISTENER ***************/
loadMoreButton.addEventListener("click", (event)=>{
    buildMealOverview(0)
})

filterButtonsContainer.addEventListener("click", (event) => {
    if (event.target.id != "filterButtons" && event.target.id != currentFilter) {
        mealOverview.replaceChildren()

        const activeFilter = document.getElementsByClassName("activeButton")
        activeFilter[0].classList.remove("activeButton")
        
        currentFilter = event.target.id     
        event.target.classList.add("activeButton")

        console.log(event.target.id)
        
        loadMealData(0, event.target.id)
        
    }
})


/************** MAIN **************/
loadCategoryData()
loadMealData(0, "All")

