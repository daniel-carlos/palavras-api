import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BatchCreateGroupDto } from './dto/batch-create-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  create(data: CreateGroupDto) {
    return this.prisma.group.create({ data: data });
  }

  batchCreate(batchCreateGroupDto: BatchCreateGroupDto) {
    return this.prisma.group.createMany({
      data: batchCreateGroupDto.groups,
    });
  }

  findAll() {
    return this.prisma.group.findMany();
  }

  findOne(id: number) {
    return this.prisma.group.findFirst({ where: { id } });
  }

  update(id: number, data: UpdateGroupDto) {
    return this.prisma.group.update({
      where: { id },
      data: data
    });
  }

  remove(id: number) {
    return this.prisma.group.delete({ where: { id } })
  }
}
