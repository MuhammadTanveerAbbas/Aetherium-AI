'use server';
/**
 * @fileOverview Generates compelling product descriptions.
 *
 * - generateProductDescription - A function that handles the product description generation.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  features: z.string().describe('Key features or specifications of the product, can be a comma-separated list.'),
  tone: z.string().describe('The desired tone of voice (e.g., professional, witty, friendly).'),
});
export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  headline: z.string().describe('A catchy, attention-grabbing headline for the product.'),
  paragraph: z.string().describe('A persuasive paragraph (2-3 sentences) focusing on the benefits of the features, not just the features themselves.'),
  features: z.array(z.string()).describe('A bulleted list of the key features.'),
});
export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(input: GenerateProductDescriptionInput): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in e-commerce. Write a compelling product description for the following product. Do not use hyphens in any of the generated text.

Product Name: {{{productName}}}

Key Features:
{{{features}}}

Tone of Voice: {{{tone}}}

The description should be persuasive and engaging for the target customer. Structure your response into these three distinct parts:
1.  **Headline:** A catchy, attention-grabbing headline for the product.
2.  **Paragraph:** A short paragraph (2-3 sentences) that focuses on the *benefits* of the features, explaining how they solve a problem or improve the customer's life.
3.  **Features:** A bulleted list of the key features.`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
