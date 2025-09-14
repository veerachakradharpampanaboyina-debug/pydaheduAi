
'use server';

/**
 * @fileOverview A feature to generate presentation content from a topic.
 *
 * - generatePresentationContent - A function that generates presentation text content on a given topic.
 * - generatePresentationWithImages - A function that takes presentation content and adds generated images.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { GeneratePptInput, GeneratePptOutput, PptContentOutput, GeneratePptWithImagesInput } from './ppt-generator-types';
import { GeneratePptInputSchema, GeneratePptOutputSchema, PptContentOutputSchema, GeneratePptWithImagesInputSchema, SlideSchema } from './ppt-generator-types';

export async function generatePresentationContent(input: GeneratePptInput): Promise<PptContentOutput> {
  return generatePptContentFlow(input);
}

export async function generatePresentationWithImages(input: GeneratePptWithImagesInput): Promise<GeneratePptOutput> {
  return generatePptWithImagesFlow(input);
}


const generatePptContentFlow = ai.defineFlow(
    {
      name: 'generatePptContentFlow',
      inputSchema: GeneratePptInputSchema,
      outputSchema: PptContentOutputSchema,
    },
    async (input) => {
        const generatePptContentPrompt = ai.definePrompt({
            name: 'generatePptContentPrompt',
            input: {schema: GeneratePptInputSchema},
            output: {schema: PptContentOutputSchema},
            prompt: `You are an expert presentation creator. Your task is to generate a well-structured and informative presentation on a given topic.
          
          The presentation should include a main title and a series of slides.
          Each slide must have a title, content (as an array of bullet points), detailed speaker notes, and a concise prompt for generating a relevant image.
          Generate between 10 and 20 content slides, plus a title slide and a concluding slide. For the title and conclusion slides, you can leave the imagePrompt empty.
          
          Your response must be in JSON format.
          
          Topic: {{{topic}}}
          `,
          });
          const { output } = await generatePptContentPrompt(input);
          if (!output) {
            throw new Error('Failed to generate presentation content.');
          }
          return output;
    }
);


const generateImageFlow = ai.defineFlow(
  {
    name: 'generatePptImageFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (prompt) => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `A professional and clean image for a presentation slide about: ${prompt}.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    return media.url;
  }
);

const generatePptWithImagesFlow = ai.defineFlow(
  {
    name: 'generatePptWithImagesFlow',
    inputSchema: GeneratePptWithImagesInputSchema,
    outputSchema: GeneratePptOutputSchema,
  },
  async (input): Promise<GeneratePptOutput> => {
    const { title, slides } = input;
    const images: (string | null)[] = [];
    const MAX_IMAGES_TO_GENERATE = 10;
    
    // Create a list of image generation tasks
    const imageTasks = slides
      .slice(0, MAX_IMAGES_TO_GENERATE)
      .map((slide) => slide.imagePrompt || null);

    // Process tasks sequentially with a delay
    for (const prompt of imageTasks) {
      if (prompt) {
        try {
          const imageUrl = await generateImageFlow(prompt);
          images.push(imageUrl);
          // Wait for 1 second to avoid hitting rate limits
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Image generation failed for prompt "${prompt}":`, error);
          images.push(null); // Push null if an error occurs
        }
      } else {
        images.push(null); // Push null if there's no prompt
      }
    }

    // Pad the images array with null if it's shorter than slides array
    while (images.length < slides.length) {
      images.push(null);
    }
    
    return {
      title,
      slides,
      images,
    };
  }
);
