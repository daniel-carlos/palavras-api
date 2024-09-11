import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { BatchCreateGroupDto } from './dto/batch-create-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Post("batch")
  @UsePipes(ValidationPipe)
  async batchCreate(@Body() batchCreateGroupDto: BatchCreateGroupDto) {
    return this.groupsService.batchCreate(batchCreateGroupDto);
  }

  @Get()
  async findAll() {
    return this.groupsService.findAll();
  }

  
    @Get("random")
    async randomGroups(@Query('n', new ParseIntPipe({ optional: true })) n = 1) {
      return await this.groupsService.random(n);
    }
    
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
