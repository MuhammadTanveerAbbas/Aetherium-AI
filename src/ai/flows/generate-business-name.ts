'use server';
/**
 * @fileOverview Generates creative and catchy business names based on a description and keywords.
 *
 * - generateBusinessName - A function that handles the business name generation process.
 * - GenerateBusinessNameInput - The input type for the generateBusinessName function.
 * - GenerateBusinessNameOutput - The return type for the generateBusinessName function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBusinessNameInputSchema = z.object({
  description: z.string().describe('A brief description of the business or product.'),
  keywords: z.string().optional().describe('Optional keywords to inspire the name generation.'),
});
export type GenerateBusinessNameInput = z.infer<typeof GenerateBusinessNameInputSchema>;

const GenerateBusinessNameOutputSchema = z.object({
  names: z.array(z.string()).describe('A list of at least 10 creative business names, covering different styles (e.g., modern, classic, playful).'),
});
export type GenerateBusinessNameOutput = z.infer<typeof GenerateBusinessNameOutputSchema>;

export async function generateBusinessName(input: GenerateBusinessNameInput): Promise<GenerateBusinessNameOutput> {
  return generateBusinessNameFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBusinessNamePrompt',
  input: {schema: GenerateBusinessNameInputSchema},
  output: {schema: GenerateBusinessNameOutputSchema},
  prompt: `You are a branding expert specializing in creating catchy and memorable business names. Generate a list of at least 10 business names based on the following description and keywords. Do not use hyphens in any of the generated text.

Business Description:
{{{description}}}

Keywords:
{{{keywords}}}

The names should be creative, unique, and easy to pronounce. Provide a diverse list with different styles (e.g., modern, classic, playful, descriptive).`,
});

const generateBusinessNameFlow = ai.defineFlow(
  {
    name: 'generateBusinessNameFlow',
    inputSchema: GenerateBusinessNameInputSchema,
    outputSchema: GenerateBusinessNameOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
