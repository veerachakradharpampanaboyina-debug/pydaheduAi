import {z} from 'genkit';

/**
 * @fileOverview Type definitions for the PYDAH Math Tutor flow.
 *
 * - MathTutorInput - The input type for the math tutor flow.
 * - MathTutorOutput - The return type for the math tutor flow.
 */

export const MathTutorInputSchema = z.object({
  problem: z.string().describe('The math problem to solve.'),
});
export type MathTutorInput = z.infer<typeof MathTutorInputSchema>;

export const MathTutorOutputSchema = z.object({
  solution: z.string().describe('The step-by-step solution to the math problem.'),
  error: z.string().optional().describe('An error message if the solution could not be generated.'),
});
export type MathTutorOutput = z.infer<typeof MathTutorOutputSchema>;
