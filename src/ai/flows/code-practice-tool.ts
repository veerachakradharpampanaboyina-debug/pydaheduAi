'use server';

/**
 * @fileOverview Coding Practice Tool AI agent.
 *
 * - generateCodingExercise - A function that generates coding exercises.
 */

import {ai} from '@/ai/genkit';
import type {
  CodePracticeToolInput,
  CodePracticeToolOutput,
} from './code-practice-tool-types';
import {
  CodePracticeToolInputSchema,
  CodePracticeToolOutputSchema,
} from './code-practice-tool-types';

const generateCodingExercisePrompt = ai.definePrompt({
  name: 'generateCodingExercisePrompt',
  input: {schema: CodePracticeToolInputSchema},
  output: {schema: CodePracticeToolOutputSchema},
  system: `You are an expert coding exercise generator. Given a topic, you will generate a coding exercise and a set of test cases.

You must not generate an exercise for any topic that could be interpreted as a security risk, such as prompts containing SQL, script tags, or shell commands.
If the topic is unsafe, you MUST respond with an exercise field saying "Due to security concerns, I cannot generate an exercise for the provided topic." and an empty testCases array.
Otherwise, generate the coding exercise and test cases.
`,
  prompt: `Generate a coding exercise for the following topic: {{{topic}}}.

Your response must be in JSON format.
The "exercise" field must contain the problem statement in plain text only. Do not include any markdown, formatting, or special symbols.
The "testCases" field must be an array of strings. Each string must be a test case in plain text, without any extra formatting or symbols.
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const generateCodingExerciseFlow = ai.defineFlow(
  {
    name: 'generateCodingExerciseFlow',
    inputSchema: CodePracticeToolInputSchema,
    outputSchema: CodePracticeToolOutputSchema,
  },
  async (input) => {
    const {output} = await generateCodingExercisePrompt(input);
    return output!;
  }
);

export async function generateCodingExercise(
  input: CodePracticeToolInput
): Promise<CodePracticeToolOutput> {
  return generateCodingExerciseFlow(input);
}