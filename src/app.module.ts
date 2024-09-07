import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordsModule } from './api-modules/words/words.module';
import { GroupsModule } from './api-modules/groups/groups.module';
import { PrismaModule } from './prisma/prisma.module';
import { PoceduresModule } from './api-modules/pocedures/pocedures.module';
@Module({
  imports: [PrismaModule, WordsModule, GroupsModule, PoceduresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
