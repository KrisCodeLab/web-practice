let catArray = []

const memberSection = document.getElementById("memberSection")

async function requestAPI(apiParams) {
    try {
        const response = await fetch(`http://localhost:8080/api/${apiParams}`)    
        if (!response.ok)     
            throw new Error("Fehler beim Response")
        const data = await response.json()
        return data
    } catch(error) {
        console.error(error)
    }
}

async function buildCatCards(apiParams) {
    catArray = await requestAPI(apiParams)
    for (const cat of catArray){
        const catCard = document.createElement("div")
        catCard.classList.add("memberCard")

        const catAvatar = document.createElement("img")
        catAvatar.src = cat.avatarURL

        const catDescription = document.createElement("div")
        catDescription.classList.add("catDescription")

        const catName = document.createElement("h3")
        catName.textContent = cat.name

        const catRank = document.createElement("p")
        catRank.textContent = cat.rank

        const catSpeciality = document.createElement("p")
        catSpeciality.textContent = cat.speciality

        const catStatus = document.createElement("p")
        catStatus.textContent = cat.status

        catDescription.append(catName, catRank, catSpeciality, catStatus)
        catCard.append(catAvatar, catDescription)
        memberSection.append(catCard)
    }  
}


/*APP START*/
buildCatCards("members")