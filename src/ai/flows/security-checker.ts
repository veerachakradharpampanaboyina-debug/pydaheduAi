'use server';
/**
 * @fileOverview A security checker tool to analyze user-submitted prompts for potential code injection vulnerabilities.
 *
 * - checkSecurity - A function that checks the security of a prompt.
 * - SecurityCheckInput - The input type for the checkSecurity function.
 * - SecurityCheckOutput - The return type for the checkSecurity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SecurityCheckInputSchema = z.object({
  prompt: z.string().describe('The user-submitted prompt to check for security vulnerabilities.'),
});
export type SecurityCheckInput = z.infer<typeof SecurityCheckInputSchema>;

const SecurityCheckOutputSchema = z.object({
  isVulnerable: z.boolean().describe('Whether the prompt is potentially vulnerable to code injection.'),
  reason: z.string().describe('The reason why the prompt is considered vulnerable, or safe.'),
});
export type SecurityCheckOutput = z.infer<typeof SecurityCheckOutputSchema>;

export async function checkSecurity(input: SecurityCheckInput): Promise<SecurityCheckOutput> {
  return checkSecurityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'securityCheckPrompt',
  input: {schema: SecurityCheckInputSchema},
  output: {schema: SecurityCheckOutputSchema},
  prompt: `You are a security expert analyzing user-submitted prompts for potential code injection vulnerabilities.

Analyze the following prompt and determine if it is potentially vulnerable to code injection attacks like SQL injection, cross-site scripting (XSS), or command injection.

Prompt: {{{prompt}}}

Respond with whether the prompt is vulnerable, and the reason for your determination. If the prompt is not vulnerable, the reason should explain why it is safe.

For example, if the prompt is '<script>alert("XSS")</script>', you should identify it as vulnerable because it contains a script tag.
If the prompt is 'binary search', you should identify it as safe because it's a standard algorithm topic.

The output should be in JSON format.
`,
});

const checkSecurityFlow = ai.defineFlow(
  {
    name: 'checkSecurityFlow',
    inputSchema: SecurityCheckInputSchema,
    outputSchema: SecurityCheckOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
