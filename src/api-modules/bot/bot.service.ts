import { GoogleGenerativeAI } from "@google/generative-ai";
import { Injectable } from "@nestjs/common";
import { Group, Word } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { getRandomUniqueElements } from "src/utils/utils";
import { AutoAssignDTO, GroupDto, WordDto } from "./dto/auto-assign.dto";
import { AssignGroupsDto } from "../words/dto/assign-groups-dto";
import { WordsService } from "../words/words.service";

class AssignDTO {
    "word": WordDto
    "categories": GroupDto[]
}

@Injectable()
export class BotService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly wordsService: WordsService
    ) { }

    async randomAssign(nWords: number) {
        const words = await this.prisma.word.findMany({
            where: { groups: { none: {} } }
        });
        const selected = getRandomUniqueElements(words, nWords);
        const groups = await this.prisma.group.findMany();
        return this.autoAssign(selected, groups);
    }

    async autoAssign(words: Word[], groups: Group[]) {

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "Abaixo, temos uma lista de palavras e uma lista de categorias" }],
                },
                {
                    role: "user",
                    parts: [{ text: `Palavras: ${JSON.stringify(words)}` }],
                },
                {
                    role: "user",
                    parts: [{ text: `Categorias: ${JSON.stringify(groups)}` }],
                },
            ],
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        const result = await chat.sendMessage(`sua função é categorizar todas as palavras e retornar um JSON no formato {"assigns": [{"word": {"id": number, "text": string}, "categories": [{"id": number, "name":string}]}]}`);
        const assigns: AssignDTO[] = JSON.parse(result.response.candidates[0].content.parts[0].text).assigns

        const mappedAssigns: AssignGroupsDto[] = assigns.map(a => {
            return {
                id: a.word.id,
                groups: a.categories.map(cat => cat.id)
            }
        })

        mappedAssigns.forEach(async ma => {
            await this.wordsService.assignGroups(ma);
        })

        return assigns
    }
}