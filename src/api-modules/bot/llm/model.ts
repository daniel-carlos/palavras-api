import { ChatGroq } from '@langchain/groq';

export const llm = new ChatGroq({
  model: 'llama-3.3-70b-versatile',
  temperature: 0.0,
  maxTokens: undefined,
  maxRetries: 2,
  // other params...
});
