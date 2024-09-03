import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UsePipes, ValidationPipe } from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { BatchCreateWordsDTO } from './dto/batch-create-words.dto';

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

  @Get()
  async findAll() {
    return this.wordsService.findAll();
  }

  @Get("/random")
  async randomWord() {
    return this.wordsService.random();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.wordsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWordDto: UpdateWordDto) {
    return this.wordsService.update(+id, updateWordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.wordsService.remove(+id);
  }
}
