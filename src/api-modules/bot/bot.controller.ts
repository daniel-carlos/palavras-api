import { Body, Controller, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { BotService } from "./bot.service";
import { AutoAssignDTO } from "./dto/auto-assign.dto";

@Controller("bot")
export class BotController {
    constructor(
        private readonly service: BotService
    ) { }

    @Post("auto-assign")
    @UsePipes(ValidationPipe)
    async autoAssign(@Body() { words, groups }: AutoAssignDTO) {
        return this.service.autoAssign(words, groups);
    }

    @Post("random-assign/:n")
    async randomAssign(@Param("n", ParseIntPipe) nWords: number) {
        return this.service.randomAssign(nWords);
    }
}