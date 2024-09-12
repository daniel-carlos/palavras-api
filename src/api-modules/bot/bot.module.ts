import { Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { BotController } from "./bot.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { WordsService } from "../words/words.service";
import { WordsModule } from "../words/words.module";

@Module({
    imports: [PrismaModule, WordsModule],
    providers: [BotService],
    controllers: [BotController]
})
export class BotModule { }