import { Injectable } from "@nestjs/common";
import { Word } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProceduresService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    getLength(word: Word): number {
        return word.text.length
    }

    async updateWordLengths() {
        try {
           // TODO: atualizar o length das palavras
        } catch (error) {
            console.error('Erro ao atualizar comprimentos:', error);
        } finally {
            await this.prisma.$disconnect();
        }
    }

    async auditWords() {

    }

}