import {
  Body,
  Controller,
  DefaultValuePipe,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BotService } from './bot.service';
import { AutoAssignDTO } from './dto/auto-assign.dto';

@Controller('bot')
export class BotController {
  constructor(private readonly service: BotService) {}

  @Post('auto-assign')
  @UsePipes(ValidationPipe)
  async autoAssign(@Body() autoAssignDto: AutoAssignDTO) {
    const { words, groups } = autoAssignDto;
    return this.service.autoAssign(words, groups);
  }

  @Post('random-assign')
  async randomAssign(@Query('n', ParseIntPipe) nWords: number) {
    return this.service.randomAssign(nWords);
  }
}
