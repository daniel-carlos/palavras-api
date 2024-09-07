import { PrismaClient } from '@prisma/client'
import { min } from 'class-validator';
import * as fs from "fs"
import { skip } from 'rxjs';

const prisma = new PrismaClient()
const filePath = './prisma/seeding/br-utf8.txt';
const data = fs.readFileSync(filePath, 'utf-8');
const linhas = data.split('\n').filter(l => {
    return l.length > 0
});

const batchCreate = async () => {
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

batchCreate()