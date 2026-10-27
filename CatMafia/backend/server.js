import express from "express"
import cors from "cors"
import db from './data/member.json' with {type: 'json'}
import { createMember } from "./services/create-member.js"
import { generateAvatar } from "./services/avatar-generator.js"

const PORT = 8080

const app = express()
app.use(cors())
app.use(express.json())

app.get("/api/avatar", (req, res) => {
    const name = req.query.name;

    if (typeof name !== "string" || !name.trim()) {
        return res.status(400).send("Name fehlt");
    }

    try {
        const svg = generateAvatar(name.trim());

        res.type("image/svg+xml");
        res.send(svg);

    } catch (error) {
        console.error(error);
        res.status(500).send("Avatar konnte nicht erstellt werden");
    }
});

app.get("/api/members", (req, res) => {
    res.json(db)
})

app.post("/api/members", (req, res) => {
    if (db.length == 0) {
        const cat = req.body
        const id = 1

        createMember(cat, id, res)

    } else {
        const cat = req.body
        const id = (db.at(-1).id) + 1
        cat.id = id
    
        createMember(cat, id, res)
    }
})

app.listen(PORT, () => console.log(`Die Meowfia schnurrt auf Port: ${PORT}`))