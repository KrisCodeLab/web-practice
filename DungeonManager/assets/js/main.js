const inventory = [
    {
        id: 1,
        name: "Eisenschwert",
        typ: "waffe",
        wert: 150,
        gewicht: 4,
        seltenheit: "gewöhnlich"
    },

    {
        id: 2,
        name: "Heiltrank",
        typ: "trank",
        wert: 50,
        gewicht: 1,
        seltenheit: "gewöhnlich"
    },

    {
        id: 3,
        name: "Drachenschild",
        typ: "rüstung",
        wert: 900,
        gewicht: 8,
        seltenheit: "episch"
    },

    {
        id: 4,
        name: "Magischer Ring",
        typ: "schmuck",
        wert: 1200,
        gewicht: 0.2,
        seltenheit: "legendär"
    }
]

const inventorySection = document.getElementById("inventory")
const filterSection = document.getElementById("filter")

let filter = []
let armorActive = false
let weaponActive = false
let potionActive = false
let jewelryActive = false

function refreshInventory() {
    inventorySection.replaceChildren();

    inventory.forEach(item => {
        const card = document.createElement("div")
        inventorySection.append(card)

        Object.entries(item).forEach(([key, value]) => {
            if (key == "id") {
                return
            }

            const itemInfos = document.createElement("p")
            if (key == "name") {
                itemInfos.textContent = `${value}`
                itemInfos.style.fontWeight = "bold"
            } else {
                itemInfos.textContent = `${key[0].toUpperCase() + key.slice(1)}: ${value}`
            }

            card.append(itemInfos)
        })
    })
}


function filteredInventory(selectors) {

    if (selectors.length === 0) {
        refreshInventory()
        return
    }

    inventorySection.replaceChildren();

    inventory.forEach(item => {
        if (selectors.includes(item.typ)) {
               
            const card = document.createElement("div")
            inventorySection.append(card)

            Object.entries(item).forEach(([key, value]) => {
                if (key == "id") {
                    return
                }

                const itemInfos = document.createElement("p")
                if (key == "name") {
                    itemInfos.textContent = `${value}`
                    itemInfos.style.fontWeight = "bold"
                } else {
                    itemInfos.textContent = `${key[0].toUpperCase() + key.slice(1)}: ${value}`
                }

                card.append(itemInfos)
            })
        } 
    })
}

function indexFinder(selectors, item) {
    const index = selectors.indexOf(item);

    if (index !== -1) {
        selectors.splice(index, 1);
    }
}

Array.from(filterSection.children).forEach(div => {
    div.addEventListener("click", () => {
        if (div.id == "armor"){
            if (armorActive == false) {
                armorActive = true
                filter.push("rüstung")
                div.classList.add("active")
             
            } else {
                indexFinder(filter, "rüstung")
                armorActive = false
                div.classList.remove("active")
            }
        }

        if (div.id == "weapon"){
            if (weaponActive == false) {
                weaponActive = true
                filter.push("waffe")
                div.classList.add("active")

            } else {
                indexFinder(filter, "waffe")
                weaponActive = false
                div.classList.remove("active")
            }
        }

        if (div.id == "potion"){
            if (potionActive == false) {
                potionActive = true
                filter.push("trank")
                div.classList.add("active")

            } else {
                indexFinder(filter, "trank")
                potionActive = false
                div.classList.remove("active")
            }
        }

        if (div.id == "jewelry"){
            if (jewelryActive == false) {
                jewelryActive = true
                filter.push("schmuck")
                div.classList.add("active")

            } else {
                indexFinder(filter, "schmuck")
                jewelryActive = false
                div.classList.remove("active")
            }
        }

        console.log(filter)
        filteredInventory(filter)
    });
});


// APP START
refreshInventory()