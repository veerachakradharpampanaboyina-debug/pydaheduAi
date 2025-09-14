import {z} from 'genkit';

/**
 * @fileOverview Type definitions for the presentation generator flow.
 *
 * - GeneratePptInput - The input type for the generatePresentation function.
 * - GeneratePptOutput - The return type for the generatePresentation function.
 */

export const GeneratePptInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate a presentation.'),
});
export type GeneratePptInput = z.infer<typeof GeneratePptInputSchema>;

export const SlideSchema = z.object({
    title: z.string().describe('The title of the slide.'),
    content: z.array(z.string()).describe('An array of bullet points for the slide content.'),
    speakerNotes: z.string().describe('Detailed speaker notes for the slide.'),
    imagePrompt: z.string().optional().describe('A prompt for generating a relevant image for the slide.'),
});
export type Slide = z.infer<typeof SlideSchema>;


export const PptContentOutputSchema = z.object({
  slides: z.array(SlideSchema).describe('A list of slides for the presentation.'),
  title: z.string().describe('The title of the overall presentation.'),
});
export type PptContentOutput = z.infer<typeof PptContentOutputSchema>;

export const GeneratePptWithImagesInputSchema = z.object({
  title: z.string().describe('The title of the overall presentation.'),
  slides: z.array(SlideSchema).describe('A list of slides for the presentation.'),
});
export type GeneratePptWithImagesInput = z.infer<typeof GeneratePptWithImagesInputSchema>;


export const GeneratePptOutputSchema = z.object({
  slides: z.array(SlideSchema).describe('A list of slides for the presentation.'),
  title: z.string().describe('The title of the overall presentation.'),
  images: z.array(z.string().nullable()).describe('A list of base64 encoded images as data URIs, corresponding to each slide.'),
});
export type GeneratePptOutput = z.infer<typeof GeneratePptOutputSchema>;
