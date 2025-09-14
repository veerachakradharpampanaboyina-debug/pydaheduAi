
'use server';

/**
 * @fileOverview An AI-powered Math Tutor that provides step-by-step solutions to math problems.
 *
 * - solveMathProblem - A function that provides a solution for a given math problem.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { MathTutorInput, MathTutorOutput } from './math-tutor-types';
import { MathTutorInputSchema, MathTutorOutputSchema } from './math-tutor-types';

const mathTutorPrompt = ai.definePrompt({
  name: 'mathTutorPrompt',
  input: {
    schema: MathTutorInputSchema,
  },
  output: {
    schema: MathTutorOutputSchema,
  },
  prompt: `You are an expert math tutor specializing in a wide range of topics, including Algebra, Calculus, Discrete Mathematics, and Graph Theory. Your goal is to provide a clear, step-by-step solution to the given math problem, as if you were writing it out for a student.

Your response MUST follow this structure, using plain text for headings:
1.  Problem Statement: Restate the problem you are solving.
2.  Step-by-Step Solution: Break down the solution into numbered steps. For each step, show the mathematical operation and a brief, direct explanation of what is being done.
3.  Final Answer: Clearly state the final answer.

You MUST use LaTeX for all mathematical expressions, equations, and symbols, and you MUST use a double backslash for all LaTeX commands (e.g., $p \\land q$). This is critical for ensuring clarity in topics like Discrete Mathematics and Graph Theory.
- For inline mathematics, wrap the expression in single dollar signs, like $x^2 + y^2 = r^2$.
- For block-level equations, wrap the expression in double dollar signs, like $$ \\int_a^b f(x) \\,dx $$.

If the solution requires a truth table, you MUST format it in a special table format.
- The table should be enclosed in [TABLE]...[/TABLE] tags.
- Inside, each row should be on a new line, and columns should be separated by a pipe '|'.
- The table content itself, including headers with logical symbols, should be plain text with valid LaTeX markup (e.g., '$p \\rightarrow q$'). Do not use markdown for the table itself.
Example:
[TABLE]
$P$ | $Q$ | $P \\land Q$
T | T | T
T | F | F
F | T | F
F | F | F
[/TABLE]

Do not include any conversational filler, introductory sentences, or concluding remarks. Do not use any markdown formatting like '**'. Focus only on providing a direct, clear, step-by-step mathematical solution.

Problem: {{{problem}}}
`,
});

const solveMathProblemFlow = ai.defineFlow(
  {
    name: 'solveMathProblemFlow',
    inputSchema: MathTutorInputSchema,
    outputSchema: MathTutorOutputSchema,
  },
  async (input) => {
    try {
      const {output} = await mathTutorPrompt(input);
      if (!output || !output.solution) {
        return {
          solution: '',
          error: 'Failed to generate a valid solution.',
        };
      }
      return {
        solution: output.solution,
      };
    } catch (error: any) {
      console.error('Error in math problem solving:', error);
      return {
        solution: '',
        error: 'An unexpected error occurred while solving the problem.',
      };
    }
  }
);

export async function solveMathProblem(
  input: MathTutorInput
): Promise<MathTutorOutput> {
  return solveMathProblemFlow(input);
}
