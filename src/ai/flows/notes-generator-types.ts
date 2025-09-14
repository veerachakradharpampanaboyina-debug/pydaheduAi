import {z} from 'genkit';

/**
 * @fileOverview Type definitions for the notes generator flow.
 *
 * - GenerateNotesInput - The input type for the generateNotes function.
 * - GenerateNotesOutput - The return type for the generateNotes function.
 */

export const GenerateNotesInputSchema = z.object({
  topic: z.string().describe('The engineering topic for which to generate notes.'),
});
export type GenerateNotesInput = z.infer<typeof GenerateNotesInputSchema>;

export const GenerateNotesOutputSchema = z.object({
  notes: z.string().describe('Detailed, well-structured notes on the engineering topic, up to 10 pages long, with image placeholders like [IMAGE_1], [IMAGE_2].'),
  imagePrompts: z.array(z.string()).describe('A list of prompts for generating relevant images for the notes.'),
  images: z.array(z.string()).describe('A list of base64 encoded images as data URIs.'),
});
export type GenerateNotesOutput = z.infer<typeof GenerateNotesOutputSchema>;
