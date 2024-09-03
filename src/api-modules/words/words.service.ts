import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BatchCreateWordsDTO } from './dto/batch-create-words.dto';

@Injectable()
export class WordsService {
  
  constructor(
    private readonly prisma: PrismaService
  ) { }

  create(data: CreateWordDto) {
    return this.prisma.word.create({ data: { ...data, length: data.text.length } });
  }

  async batchCreate(data: BatchCreateWordsDTO) {
    let newWords = data.words.filter(async w => {
      const foundWord = await this.prisma.word.findFirst({
        where: {
          text: w
        }
      })
    })

    return this.prisma.word.createMany({
      data: newWords.map(w => {
        return {
          text: w,
          length: w.length,
          explicit: false
        }
      }),

    });
  }

  findAll() {
    return this.prisma.word.findMany();
  }

  findOne(id: number) {
    return this.prisma.word.findFirst({ where: { id } });
  }

  random() {
    throw new Error('Method not implemented.');
  }

  update(id: number, data: UpdateWordDto) {
    return this.prisma.word.update({
      where: { id },
      data: { ...data, length: data.text.length }
    });
  }

  remove(id: number) {
    return this.prisma.word.delete({ where: { id } })
  }
}
