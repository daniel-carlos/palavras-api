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
            // Atualiza todos os registros de Word, definindo o length como o comprimento do text
            // TODO:
            // await this.prisma.word.updateMany({
            //     data: {
            //         length: {
            //             set: this.getLength, // Calcula o comprimento para cada registro
            //         },
            //     },
            // });

            console.log('Comprimentos dos words atualizados com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar comprimentos:', error);
        } finally {
            await this.prisma.$disconnect();
        }
    }

    async auditWords() {

    }

}