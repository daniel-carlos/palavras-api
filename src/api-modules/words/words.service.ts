import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WordsService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  create(data: CreateWordDto) {
    return this.prisma.word.create({ data: { ...data, length: data.text.length } });
  }

  findAll() {
    return this.prisma.word.findMany();
  }

  findOne(id: number) {
    return this.prisma.word.findFirst({ where: { id } });
  }

  update(id: number, data: UpdateWordDto) {
    return this.prisma.word.update({
      where: { id },
      data: data
    });
  }

  remove(id: number) {
    return this.prisma.word.delete({ where: { id } })
  }
}
