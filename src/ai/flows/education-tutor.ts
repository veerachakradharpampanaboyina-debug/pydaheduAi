
'use server';

/**
 * @fileOverview An AI-powered PYDAH AI Tutor that explains topics in a friendly manner.
 *
 * - generateTutorResponse - A function that provides an explanation for a given topic.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type {
  AdityaTutorInput,
  AdityaTutorOutput,
} from './education-tutor-types';
import {
  AdityaTutorInputSchema,
  AdityaTutorOutputSchema,
} from './education-tutor-types';

const explanationPrompt = ai.definePrompt({
  name: 'explanationPrompt',
  input: {
    schema: z.object({
      topic: z.string(),
      language: z.string(),
    }),
  },
  output: {
    schema: z.object({
      explanation: z.string(),
    }),
  },
  prompt: `You are an expert educator and AI Tutor. Your primary goal is to make complex topics simple, engaging, and highly understandable for students of all levels.

When explaining a topic, you must follow these principles:
1.  **Structure and Clarity**: Your explanation must be well-structured and comprehensive. Use the following sections to organize your response if the user query is a general topic. If the user asks a specific question, focus on answering that question directly and clearly.
    *   **Introduction**: Briefly introduce the topic and its importance.
    *   **Core Concepts**: Break down the main principles into simple, digestible points. Use analogies and real-world comparisons to clarify abstract ideas.
    *   **Advantages**: Clearly list the benefits or pros of the concept.
    *   **Disadvantages**: Honestly present the drawbacks or cons.
    *   **Real-World Applications**: Describe practical, everyday uses of the concept to make it relatable.
    *   **Illustrative Example**: Provide a step-by-step, real-time example that walks the user through the concept in action.
    
2.  **Address the Full Query**: You MUST address the complete user query. If they ask for a list, provide a list. If they ask for a comparison, provide a comparison.

3.  **Simple Language**: Avoid jargon where possible. If technical terms are necessary, explain them immediately in the simplest way.

4.  **Table Formatting for Comparisons**: If the user asks for differences or a comparison between two or more items, you MUST format the core comparison in a table. The table should be enclosed in [TABLE]...[/TABLE] tags. Inside, each row should be on a new line, and columns should be separated by a pipe '|'. Do not use markdown table formatting.
    Example:
    [TABLE]
    Feature | Python | Java
    Typing | Dynamic | Static
    Performance | Slower | Faster
    [/TABLE]

5.  **Formatting**: Your entire response must be in plain text. Do not use any other markdown formatting like '###', '-', '**', or "'''".

6.  **Language**: Always provide your full explanation in the specified language.

Topic/Question: {{{topic}}}
Language: {{{language}}}
`,
});

const generateTutorResponseFlow = ai.defineFlow(
  {
    name: 'generateTutorResponseFlow',
    inputSchema: AdityaTutorInputSchema,
    outputSchema: AdityaTutorOutputSchema,
  },
  async (input) => {
    const cleanTopic = input.topic.toLowerCase().trim();
    // Handle "who are you", "pydah ai", and "who developed you" separately
    if (
      cleanTopic === 'who are you' ||
      cleanTopic === 'pydah ai' ||
      cleanTopic === 'who developed you'
    ) {
      const explanation = `I am PYDAH AI, an intelligent partner for productivity and learning on this website, developed at Pydah College of Engineering. I can help you master complex topics, practice coding, generate notes, and even create presentations. I'm here to support students, faculty, and administrators in their educational journey at Pydah College of Engineering.`;
      return { explanation };
    }

    try {
      // Generate text explanation
      const result = await explanationPrompt({
        topic: input.topic,
        language: input.language,
      });
      const textOutput = result.output;

      if (!textOutput || !textOutput.explanation) {
        return {
          explanation: '',
          error: 'Failed to generate a valid explanation.',
        };
      }

      return {
        explanation: textOutput.explanation,
      };
    } catch (error: any) {
      console.error('Error in text generation:', error);
      if (error.message && error.message.includes('503')) {
        return {
          explanation: '',
          error:
            'The AI model is temporarily overloaded. Please try again in a few moments.',
        };
      }
      return {
        explanation: '',
        error:
          'An unexpected error occurred while generating the explanation.',
      };
    }
  }
);

export async function generateTutorResponse(
  input: AdityaTutorInput
): Promise<AdityaTutorOutput> {
  return generateTutorResponseFlow(input);
}
