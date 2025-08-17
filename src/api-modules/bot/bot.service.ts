import { Injectable } from '@nestjs/common';
import { Group, Word } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { getRandomUniqueElements } from 'src/utils/utils';
import { GroupDto, WordDto } from './dto/auto-assign.dto';
import { WordsService } from '../words/words.service';
import Groq from 'groq-sdk';
import { llm } from './llm/model';
import { promptTemplate } from './llm/prompts';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { AutoAssignOutputFormat, AutoAssignOutputType } from 'src/types';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

class AssignDTO {
  word: WordDto;
  categories: GroupDto[];
}

@Injectable()
export class BotService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wordsService: WordsService,
  ) {}

  async randomAssign(nWords: number) {
    const words = await this.prisma.word.findMany({
      where: { groups: { none: {} } },
    });
    const selected = getRandomUniqueElements(words, nWords);
    const groups = await this.prisma.group.findMany();
    const a = await this.autoAssign(selected, groups);

    return a;
  }

  async autoAssign(
    words: Word[],
    groups: Group[],
  ): Promise<AutoAssignOutputType> {
    const prompt = ChatPromptTemplate.fromTemplate(promptTemplate);
    const model = llm.withStructuredOutput(
      zodToJsonSchema(AutoAssignOutputFormat),
      {
        includeRaw: true,
      },
    );

    const chain = prompt.pipe(model);

    const result = await chain.invoke({
      input: JSON.stringify({
        words: words.map((w) => ({ id: w.id, text: w.text })),
        groups: groups.map((g) => ({
          id: g.id,
          name: g.name,
          description: g.description,
        })),
      }),
    });

    console.log(
      JSON.stringify(result.raw.response_metadata.tokenUsage, null, 2),
    );

    const x = await this.wordsService.assignGroupsMany({
      assigns: result.parsed,
    });

    return result.parsed;
  }
}
