import { Body, Controller, DefaultValuePipe, Param, ParseEnumPipe, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { BotService } from "./bot.service";
import { AutoAssignDTO } from "./dto/auto-assign.dto";
import { GenProvider } from "src/types/GenAI";



@Controller("bot")
export class BotController {
    constructor(
        private readonly service: BotService
    ) { }

    @Post("auto-assign")
    @UsePipes(ValidationPipe)
    async autoAssign(@Body() { words, groups }: AutoAssignDTO) {
        return this.service.autoAssign(words, groups, GenProvider.groq);
    }


    @Post('random-assign')
    async randomAssign(
        @Query('n', ParseIntPipe) nWords: number,
        // @Query('provider', new DefaultValuePipe(GenProvider.gemini), ParseEnumPipe) provider: GenProvider = GenProvider.gemini
    ) {
        return this.service.randomAssign(nWords, GenProvider.groq);
    }
}