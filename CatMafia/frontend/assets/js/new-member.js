const memberForm = document.getElementById("memberForm")
const avatar = document.getElementById("avatar")
const nameField = document.getElementById("name")
const nameP = document.getElementById("nameP")
const rankField = document.getElementById("rank")
const rankP = document.getElementById("rankP")
const specialityField = document.getElementById("speciality")
const specialityP = document.getElementById("specialityP")


memberForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const formData = new FormData(memberForm)

    const cat = {
        "id": 0,
        "name": formData.get("name"),
        "rank": formData.get("rank"),
        "speciality": formData.get("speciality"),
        "avatarURL": `http://localhost:8080/api/avatar?name=${formData.get("name")}`,
        "status": "active"
    }
    
    await fetch("http://localhost:8080/api/members", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(cat)
    })
})

nameField.addEventListener("blur", (event) => {
    if (nameField.value != "") {
        avatar.src = `http://localhost:8080/api/avatar?name=${nameField.value}`
        nameP.textContent = nameField.value
    }
    if (nameField.value == "") {
        avatar.src = ""
        nameP.textContent = "Name"
    }
})

rankField.addEventListener("change", (event) => {
    if (rankField.value != "")
        rankP.textContent = rankField.value
    if (rankField.value == "")
        rankP.textContent = "Bitte Rang auswählen"
})

specialityField.addEventListener("change", (event) => {
    if (specialityField.value != "")
        specialityP.textContent = specialityField.value
    if (specialityField.value == "")
        specialityP.textContent = "Bitte Spezialgebiet auswählen"
})
