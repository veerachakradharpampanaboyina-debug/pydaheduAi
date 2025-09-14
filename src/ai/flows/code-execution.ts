'use server';

/**
 * @fileOverview An AI-powered code execution environment.
 *
 * - executeCode - A function that runs user-submitted code against test cases.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { CodeExecutionInput, CodeExecutionOutput } from './code-execution-types';
import { CodeExecutionInputSchema, CodeExecutionOutputSchema } from './code-execution-types';


const executeCodeFlow = ai.defineFlow(
  {
    name: 'executeCodeFlow',
    inputSchema: CodeExecutionInputSchema,
    outputSchema: CodeExecutionOutputSchema,
  },
  async (input) => {
    const executeCodePrompt = ai.definePrompt({
      name: 'executeCodePrompt',
      input: {schema: CodeExecutionInputSchema},
      output: {schema: CodeExecutionOutputSchema},
      prompt: `You are an expert code interpreter. You will be given a piece of code, a list of test cases, and the programming language.
    Your task is to execute the code for each test case and determine if the output matches the expected result.
    
    Language: {{{language}}}
    
    Code:
    \'\'\'
    {{{code}}}
    \'\'\'
    
    Test Cases:
    {{#each testCases}}
    - {{{this}}}
    {{/each}}
    
    
    For each test case, provide the actual output and whether it passed.
    A test case is considered "passed" if the code runs without errors and the output is logically correct for the problem, even if the exact output format isn't specified.
    If the code fails to run for a test case (e.g., due to a syntax error or a runtime error), you should set 'passed' to false and provide the error message in the 'output' field.
    If there's a general error with the code that prevents any test cases from running (like a syntax error), return a top-level 'error' message.
    
    Return the results in a JSON format. The response must only contain valid JSON. Do not add any extra symbols, markdown, or formatting.`,
    });

    const {output} = await executeCodePrompt(input);
    return output!;
  }
);
export async function executeCode(input: CodeExecutionInput): Promise<CodeExecutionOutput> {
  return executeCodeFlow(input);
}
