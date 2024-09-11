import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UsePipes, ValidationPipe, Query, ParseIntPipe, Optional } from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { BatchCreateWordsDTO } from './dto/batch-create-words.dto';
import { AssignGroupsDto } from './dto/assign-groups-dto';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) { }

  @Post()
  async create(@Body() createWordDto: CreateWordDto) {
    return this.wordsService.create(createWordDto);
  }

  @Post("/batch")
  @UsePipes(ValidationPipe)
  async batchCreate(@Body() data: BatchCreateWordsDTO) {
    return this.wordsService.batchCreate(data);
  }

  @Post('assign')
  @UsePipes(ValidationPipe)
  async assignGroups(@Body("groups") groups: AssignGroupsDto) {
    return this.wordsService.assignGroups(groups);
  }

  @Get()
  async findAll(
    @Query('skip', new ParseIntPipe({ optional: true })) skip = 0,
    @Query('take', new ParseIntPipe({ optional: true })) take = 100
  ) {
    return this.wordsService.findAll(skip, Math.min(take, 100));
  }

  @Get("/random")
  async randomWord(@Query('size', new ParseIntPipe({ optional: true })) size = 0, @Query('n', new ParseIntPipe({ optional: true })) n = 1) {
    return this.wordsService.random(size, n);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.wordsService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateWordDto: UpdateWordDto) {
    return this.wordsService.update(+id, updateWordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.wordsService.remove(+id);
  }
}
