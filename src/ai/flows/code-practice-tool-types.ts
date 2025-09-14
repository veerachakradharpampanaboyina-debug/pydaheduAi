import {z} from 'genkit';

/**
 * @fileOverview Type definitions for the code practice tool flow.
 *
 * - CodePracticeToolInput - The input type for the generateCodingExercise function.
 * - CodePracticeToolOutput - The return type for the generateCodingExercise function.
 */

export const CodePracticeToolInputSchema = z.object({
  topic: z.string().describe('The coding topic for which to generate an exercise.'),
});
export type CodePracticeToolInput = z.infer<typeof CodePracticeToolInputSchema>;

export const CodePracticeToolOutputSchema = z.object({
  exercise: z.string().describe('The generated coding exercise.'),
  testCases: z.array(z.string()).describe('Example test cases for the exercise.'),
});
export type CodePracticeToolOutput = z.infer<typeof CodePracticeToolOutputSchema>;
