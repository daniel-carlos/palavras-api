import { GoogleGenerativeAI } from "@google/generative-ai";
import { Injectable } from "@nestjs/common";
import { Group, Word } from "@prisma/client";

@Injectable()
export class BotService {

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

        const result = await chat.sendMessage(`sua função é categorizar todas as palavras e retornar um JSON no formato {"results": [{"word": {"id": number, "text": string}, "categories": [{"id": number, "name":string}]}]}`);

        return result.response.candidates[0].content.parts[0].text
    }
}