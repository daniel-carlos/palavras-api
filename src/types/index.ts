import { z } from 'zod';

export const AutoAssignOutputFormat = z.object({
  results: z.array(
    z.object({
      word: z.number().describe('The ID of the word'),
      groups: z.array(z.number().describe('The IDs of the groups.')),
    }),
  ),
});
export type AutoAssignOutputType = z.infer<typeof AutoAssignOutputFormat>;
