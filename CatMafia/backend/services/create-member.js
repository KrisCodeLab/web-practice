import { writeFile } from 'node:fs/promises'
import db from '../data/member.json' with {type: 'json'}

export function createMember(cat, id, res){
    cat.avatarURL = `http://localhost:8080/api/avatar?name=${cat.name}`
    cat.id = id

    db.push(cat)
    writeFile('./data/member.json', JSON.stringify(db, null, 2))

    res.sendStatus(201)
}