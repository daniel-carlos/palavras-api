import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordsModule } from './api-modules/words/words.module';
import { GroupsModule } from './api-modules/groups/groups.module';
import { PrismaModule } from './prisma/prisma.module';
import { PoceduresModule } from './api-modules/pocedures/pocedures.module';
import { BotModule } from './api-modules/bot/bot.module';
@Module({
  imports: [PrismaModule, BotModule, WordsModule, GroupsModule, PoceduresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
