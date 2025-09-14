import {z} from 'genkit';

/**
 * @fileOverview Type definitions for the code execution flow.
 *
 * - CodeExecutionInput - The input type for the executeCode function.
 * - CodeExecutionOutput - The return type for the executeCode function.
 */

const TestCaseResultSchema = z.object({
  testCase: z.string().describe('The test case that was run.'),
  output: z.string().describe('The output of the code for the given test case.'),
  passed: z.boolean().describe('Whether the code passed the test case.'),
  expected: z.string().optional().describe('The expected output for the test case.'),
});

export const CodeExecutionInputSchema = z.object({
  code: z.string().describe('The user-submitted code to execute.'),
  testCases: z.array(z.string()).describe('The test cases to run the code against.'),
  language: z.string().describe('The programming language of the code.'),
});
export type CodeExecutionInput = z.infer<typeof CodeExecutionInputSchema>;

export const CodeExecutionOutputSchema = z.object({
  results: z.array(TestCaseResultSchema).describe('The results of running the code against the test cases.'),
  error: z.string().optional().describe('Any error that occurred during execution.')
});
export type CodeExecutionOutput = z.infer<typeof CodeExecutionOutputSchema>;
