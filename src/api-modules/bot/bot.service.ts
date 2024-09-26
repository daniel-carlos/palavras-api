import { GoogleGenerativeAI } from "@google/generative-ai";
import { Injectable } from "@nestjs/common";
import { Group, Word } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { getRandomUniqueElements } from "src/utils/utils";
import { AutoAssignDTO, GroupDto, WordDto } from "./dto/auto-assign.dto";
import { AssignGroupsDto } from "../words/dto/assign-groups-dto";
import { WordsService } from "../words/words.service";
import Groq from "groq-sdk";
import { GenProvider } from "src/types/GenAI";
import ollama from 'ollama'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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

    async randomAssign(nWords: number, provider: GenProvider) {
        const words = await this.prisma.word.findMany({
            where: { groups: { none: {} } }
        });
        const selected = getRandomUniqueElements(words, nWords);
        const groups = await this.prisma.group.findMany();
        return this.autoAssign(selected, groups, provider);
    }

    async getOllamaChatCompletion(words: Word[], groups: Group[]) {
        const messages = [
            { role: "user", content: "Abaixo, temos uma lista de palavras e uma lista de categorias" },
            { role: "user", content: `Palavras: ${JSON.stringify(words)}` },
            { role: "user", content: `Categorias: ${JSON.stringify(groups)}` },
            { role: "user", content: `sua função é categorizar todas as palavras e retornar um JSON no formato {"assigns": [{"word": {"id": number, "text": string}, "categories": [{"id": number, "name":string}]}]}. pode adicionar mais de uma categoria a uma palavra` },
        ]

        const response = await ollama.chat({ model: 'llama3.1', messages, stream: false, format: "json" })
        const assigns: AssignDTO[] = JSON.parse(response.message.content).assigns
        return assigns
    }


    async getGeminiChatCompletion(words: Word[], groups: Group[]) {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const chat = await model.startChat({
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
        return assigns;
    }

    async getGroqChatCompletion(words: Word[], groups: Group[]) {
        const chat = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: [
                        { text: "Abaixo, temos uma lista de palavras e uma lista de categorias", type: "text" },
                        { text: `Palavras: ${JSON.stringify(words)}`, type: "text" },
                        { text: `Categorias: ${JSON.stringify(groups)}`, type: "text" },
                        { text: `sua função é categorizar todas as palavras e retornar um JSON no formato {"assigns": [{"word": {"id": number, "text": string}, "categories": [{"id": number, "name":string}]}]}. pode adicionar mais de uma categoria a uma palavra`, type: "text" },
                    ],
                },
            ],
            model: "llama3-70b-8192",
            response_format: {
                type: "json_object"
            },

        });
        const assigns: AssignDTO[] = JSON.parse(chat.choices[0].message.content)
        return assigns;
    }

    async getProvider(words: Word[], groups: Group[], provider: GenProvider) {
        switch (provider) {
            case GenProvider.gemini:
                return this.getGeminiChatCompletion(words, groups);
            case GenProvider.groq:
                return this.getGroqChatCompletion(words, groups);
            case GenProvider.ollama:
                return this.getOllamaChatCompletion(words, groups);
            default:
                break;
        }
    }

    async autoAssign(words: Word[], groups: Group[], provider: GenProvider, persist = false) {
        // const result = await this.getGeminiChatCompletion(words, groups);
        const result = await this.getProvider(words, groups, provider);
        const assigns: AssignDTO[] = result


        if (persist) {
            const mappedAssigns: AssignGroupsDto[] = assigns.map(a => {
                return {
                    id: a.word.id,
                    groups: a.categories.map(cat => cat.id)
                }
            })
            mappedAssigns.forEach(async ma => {
                await this.wordsService.assignGroups(ma);
            })
        }

        return assigns
    }
}