import { Module } from '@nestjs/common';
import { ProceduresService } from './procedures.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProceduresController } from './procedures.controller';

@Module({
    providers: [ProceduresService],
    imports: [PrismaModule],
    controllers: [ProceduresController]
})
export class PoceduresModule { }
