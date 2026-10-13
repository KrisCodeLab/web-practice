// ########## VARIABLEN / KONSTANTEN ##########

let systems = [
    {
    name: "Sauerstoffversorgung",
    status: "kritisch",
    energieverbrauch: 80,
    reparaturkosten: 1200
    },

    {
    name: "Wasseraufbereitung",
    status: "kritisch",
    energieverbrauch: 60,
    reparaturkosten: 950
    },

    {
    name: "Kantine",
    status: "normal",
    energieverbrauch: 30,
    reparaturkosten: 100
    },

    {
    name: "Antrieb",
    status: "kritisch",
    energieverbrauch: 95,
    reparaturkosten: 5000
    },

    {
    name: "Kommunikation",
    status: "gestört",
    energieverbrauch: 40,
    reparaturkosten: 800
    },

    {
    name: "Kryokapseln",
    status: "gestört",
    energieverbrauch: 75,
    reparaturkosten: 350
    }
];

const systemTable = document.getElementById("systemsBody")
const energyTable = document.getElementById("energy")
const statisticsList = document.getElementById("statistic")
const yourCredits = document.getElementById("credits")

const filterButton = document.getElementById("filterButton")
const energyButton = document.getElementById("energyButton")

let credits = 6000
let repairCosts = document.getElementById("repairCosts")
let repairsum
let criticalSystems
let criticalToggle = false
let energyToggle = false

// ######### FUNKTIONEN ##########

function systemCheck () {
    criticalSystems = systems.filter((sys) => sys.status == "kritisch")
}

function statusCheck (system, tdSystem, tdStatus) {
    if (system.status == "kritisch") {
        tdSystem.style.color = "red"
        tdStatus.style.color = "red"
    } else if (system.status == "gestört") {
        tdSystem.style.color = "orange"
        tdStatus.style.color = "orange"
    }
}

function summarizeCritical () {
    repairsum = systems
        .filter((sys) => sys.status == "kritisch")
        .reduce((sum, sys) => sum + sys.reparaturkosten, 0)
    repairCosts.textContent = `Die Kosten der Reparatur aller kritischen Systeme betragen: ${repairsum} credits`
}

function repair (system) {
    if (credits >= system.reparaturkosten) {
        system.status = "normal"
        credits -= system.reparaturkosten

        yourCredits.textContent = `Du besitzt: ${credits} credits`
        refreshSystems(systems, "name", "status")
        summarizeCritical()
    } else {
        alert("Credits nicht ausreichend für die Reparatur!")
    }
}

function createRepairButton(tableRow, system){
    const entry = document.createElement("td")

    if (system.status === "kritisch" || system.status === "gestört") {
        tableRow.append(entry)

        const btn = document.createElement("button")
        btn.textContent = `Reparatur für ${system.reparaturkosten} credits`
        entry.append(btn)

        btn.addEventListener("click", () => {
            repair(system)
        });
        
    } else {
        entry.textContent = "keine Reparatur notwendig"
        tableRow.append(entry)
    }
}

function buildTable (table, system, firstHead, secondHead) {
    const tableRow = document.createElement("tr")
    table.append(tableRow)

    const tdFirst = document.createElement("td")
    tdFirst.textContent = system[firstHead]

    const tdSecond = document.createElement("td")
    tdSecond.textContent = system[secondHead]

    tableRow.append(tdFirst)
    tableRow.append(tdSecond)

    if (secondHead === "status") {
        statusCheck(system, tdFirst, tdSecond)
        createRepairButton(tableRow, system)
    }
}

function refreshSystems (table, firstHead, secondHead) {
    systemTable.replaceChildren();

    if (table == systems) {
        criticalToggle = false
        filterButton.textContent = "Kritische Systeme filtern: aus"
    }

    table.forEach(element => {buildTable(systemTable, element, firstHead, secondHead)});

    statistics()
}

function statistics() {
    statisticsList.replaceChildren();

    const statusCounter = {} 

    for (const system of systems) {
        statusCounter[system.status] = (statusCounter[system.status] || 0) + 1
    }

    Object.entries(statusCounter).forEach(([key, value]) => {
        const entry = document.createElement("li")
        if (value > 1 || value < 1) {
            entry.textContent = `${value} Systeme befinden sich im Zustand: "${key}"`
        } else {
            entry.textContent = `${value} System befindet sich im Zustand: "${key}"`
        }
        
        statisticsList.append(entry)
    });
}


// ########## LISTENER ##########

filterButton.addEventListener("click", (event) => {
    if (criticalToggle == false) {
        systemCheck()
        criticalToggle = true
        refreshSystems(criticalSystems, "name", "status")    
        filterButton.textContent = "Kritische Systeme filtern: an"

    } else if (criticalToggle == true) {
        criticalToggle = false
        refreshSystems(systems, "name", "status")
        filterButton.textContent = "Kritische Systeme filtern: aus"
    }   
})

energyButton.addEventListener("click", (event) => {
    if (energyToggle == false) {
        energyToggle = true
        energyTable.replaceChildren();

        const energyArray = systems.map((sys) => ({
            name: sys.name, 
            energieverbrauch: sys.energieverbrauch
        }))
        
        energyArray.forEach(element => {buildTable(energyTable, element, "name", "energieverbrauch")})

    } else if (energyToggle == true) {
        energyToggle = false
        energyTable.replaceChildren();
    }

    
})

// ########## START ##########

refreshSystems(systems, "name", "status")
yourCredits.textContent = `Du besitzt: ${credits} credits`
summarizeCritical()

