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
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { StructuredOutputParser } from '@langchain/core/dist/output_parsers';

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
    return this.autoAssign(selected, groups);
  }

  async autoAssign(words: Word[], groups: Group[]) {
    const outputFormat = z.object({
      results: z.array(
        z.object({
          word: z.number().describe('The ID of the word'),
          groups: z.array(z.number().describe('The IDs of the groups.')),
        }),
      ),
    });
    type outputType = z.infer<typeof outputFormat>;

    const prompt = ChatPromptTemplate.fromTemplate(promptTemplate);
    const model = llm.withStructuredOutput(zodToJsonSchema(outputFormat), {
      includeRaw: true,
    });

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

    console.log(JSON.stringify(result.raw.response_metadata.tokenUsage, null, 2));

    return result.parsed;
  }
}
