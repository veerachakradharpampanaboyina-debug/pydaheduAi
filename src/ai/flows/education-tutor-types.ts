
import {z} from 'genkit';

/**
 * @fileOverview Type definitions for the PYDAH AI Tutor flow.
 *
 * - AdityaTutorInput - The input type for the unified tutor flow.
 * - AdityaTutorOutput - The return type for the unified tutor flow.
 */

export const AdityaTutorInputSchema = z.object({
  topic: z.string().describe('The educational topic or question to explain.'),
  language: z
    .string()
    .describe('The regional Indian language for the explanation.'),
});
export type AdityaTutorInput = z.infer<typeof AdityaTutorInputSchema>;

export const AdityaTutorOutputSchema = z.object({
  explanation: z
    .string()
    .describe('The explanation of the educational topic.'),
  error: z
    .string()
    .optional()
    .describe('An error message if the generation failed.'),
});
export type AdityaTutorOutput = z.infer<typeof AdityaTutorOutputSchema>;
