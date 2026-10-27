const memberForm = document.getElementById("memberForm")

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