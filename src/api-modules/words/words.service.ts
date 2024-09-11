import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BatchCreateWordsDTO } from './dto/batch-create-words.dto';
import { AssignGroupsDto } from './dto/assign-groups-dto';
import { getRandomUniqueElements } from '../../utils/utils';
import { group } from 'console';

@Injectable()
export class WordsService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async assignGroups(data: AssignGroupsDto) {
    return await this.prisma.word.update({
      where: { id: data.id },
      data: {
        groups: {
          set: data.groups.map(groupId => ({ id: groupId }))
        }
      }
    })
  }

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

  findAll(skip: number, take: number) {
    return this.prisma.word.findMany({
      skip,
      take
    });
  }

  findOne(id: number) {
    return this.prisma.word.findFirst({
      where: { id }, include: { groups: true }
    });
  }

  async random(size = 0, n = 0, explicit = false) {
    const allWords = await this.prisma.word.findMany({
      where: {
        ...(size > 0 && { length: size }),
        explicit
      }
    });
    return getRandomUniqueElements(allWords, n > 0 ? n : 1);
  }

  update(id: number, data: UpdateWordDto) {
    return this.prisma.word.update({
      where: { id },
      data: {
        ...data,
      }
    });
  }

  remove(id: number) {
    return this.prisma.word.delete({ where: { id } })
  }
}
