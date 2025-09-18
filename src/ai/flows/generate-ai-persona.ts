'use server';
/**
 * @fileOverview Creates a detailed AI persona for marketing and product development.
 *
 * - generateAIPersona - A function that handles the persona generation process.
 * - GenerateAIPersonaInput - The input type for the generateAIPersona function.
 * - GenerateAIPersonaOutput - The return type for the generateAIPersona function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAIPersonaInputSchema = z.object({
  productInfo: z.string().describe('A description of the product or business for which the persona is being created.'),
  targetAudience: z.string().describe('A description of the target audience.'),
});
export type GenerateAIPersonaInput = z.infer<typeof GenerateAIPersonaInputSchema>;

const GenerateAIPersonaOutputSchema = z.object({
  persona: z.object({
    name: z.string().describe('The full name of the persona.'),
    age: z.number().describe('The age of the persona.'),
    occupation: z.string().describe('The occupation or job title of the persona.'),
    background: z.string().describe('A compelling background story for the persona, written in 2-3 sentences.'),
    goals: z.array(z.string()).describe('A list of 3-5 of the persona\'s primary goals related to the product.'),
    painPoints: z.array(z.string()).describe('A list of 3-5 of the persona\'s main challenges or pain points that the product can solve.'),
    marketingMessage: z.string().describe('A tailored, concise, and impactful marketing message that would resonate with this persona.'),
  }),
});
export type GenerateAIPersonaOutput = z.infer<typeof GenerateAIPersonaOutputSchema>;

export async function generateAIPersona(input: GenerateAIPersonaInput): Promise<GenerateAIPersonaOutput> {
  return generateAIPersonaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAIPersonaPrompt',
  input: {schema: GenerateAIPersonaInputSchema},
  output: {schema: GenerateAIPersonaOutputSchema},
  prompt: `You are a marketing expert specializing in creating detailed user personas. Based on the provided product information and target audience, generate a comprehensive persona. Make the persona realistic and relatable. Do not use hyphens in any of the generated text.

Product/Business Information:
{{{productInfo}}}

Target Audience:
{{{targetAudience}}}

Create a persona that includes:
- A realistic name, age, and occupation.
- A compelling background story (2-3 sentences).
- A list of 3-5 primary goals and motivations.
- A list of 3-5 key pain points and challenges.
- A concise and effective marketing message tailored to them.`,
});

const generateAIPersonaFlow = ai.defineFlow(
  {
    name: 'generateAIPersonaFlow',
    inputSchema: GenerateAIPersonaInputSchema,
    outputSchema: GenerateAIPersonaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
