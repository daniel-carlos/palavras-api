import { PrismaClient } from '@prisma/client'
import * as fs from "fs"


const prisma = new PrismaClient()
const filePath = './prisma/seeding/br-utf8.txt';
const data = fs.readFileSync(filePath, 'utf-8');
const linhas = data.split('\n').filter(l => {
    return l.length > 0
});

const createGroups = async () => {
    const groups = require("./seeding/starterGroups.json")
    console.log(groups);

    await prisma.group.createMany({
        data: groups, skipDuplicates: true
    })
}

const batchCreateWords = async () => {
    try {
        await prisma.word.createMany({
            data: linhas.map(l => {
                const word = l.replace("-", "")
                return {
                    text: word,
                    length: word.length,
                }
            }),
            skipDuplicates: true
        })
    } catch (err) {
        console.error(err);
    }
}

createGroups()
batchCreateWords()