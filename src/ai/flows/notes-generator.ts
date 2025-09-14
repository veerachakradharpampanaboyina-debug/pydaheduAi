'use server';

/**
 * @fileOverview A feature to generate detailed engineering notes with images.
 *
 * - generateNotes - A function that generates notes on a given topic.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { GenerateNotesInput, GenerateNotesOutput } from './notes-generator-types';
import { GenerateNotesInputSchema, GenerateNotesOutputSchema } from './notes-generator-types';

const generateNotesAndImagePrompts = ai.definePrompt({
  name: 'generateNotesAndImagePrompts',
  input: {schema: GenerateNotesInputSchema},
  output: {schema: z.object({
    notes: z.string().describe('Detailed, well-structured notes on the engineering topic, up to 10 pages long, with image placeholders like [IMAGE_1], [IMAGE_2].'),
    imagePrompts: z.array(z.string()).describe('A list of 3-4 prompts for generating relevant images for the notes.'),
  })},
  prompt: `You are an expert engineering educator. Your task is to generate comprehensive and clear notes on a given engineering topic, along with prompts for generating relevant images.
The notes should be well-structured, easy to understand, and cover the key concepts, principles, and applications of the topic.
The content should be detailed enough to fill approximately 10 A4 pages.
Use headings, subheadings, bullet points, and clear paragraphs to organize the information.

Also provide 3-4 prompts for images that would visually illustrate the key concepts in the notes.
For each image prompt you create, you MUST insert a corresponding placeholder in the notes text where the image should appear. For example: [IMAGE_1], [IMAGE_2], etc. The index in the placeholder should correspond to the index of the prompt in the imagePrompts array.

Your response must be in plain text, without any markdown formatting like '###', '-', '**', or "'''".

Topic: {{{topic}}}
`,
});

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `An engineering diagram illustrating the concept of: ${prompt}. Clean, clear, and professional.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    return media.url;
  }
);


const generateNotesFlow = ai.defineFlow(
  {
    name: 'generateNotesFlow',
    inputSchema: GenerateNotesInputSchema,
    outputSchema: GenerateNotesOutputSchema,
  },
  async (input) => {
    const { output } = await generateNotesAndImagePrompts(input);
    if (!output) {
      throw new Error('Failed to generate notes and image prompts.');
    }

    const { notes, imagePrompts } = output;

    const imageGenerationPromises = imagePrompts.map(prompt => generateImageFlow(prompt));
    const images = await Promise.all(imageGenerationPromises);

    return {
      notes,
      imagePrompts,
      images,
    };
  }
);

export async function generateNotes(input: GenerateNotesInput): Promise<GenerateNotesOutput> {
  return generateNotesFlow(input);
}
