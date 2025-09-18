'use server';
/**
 * @fileOverview Generates an image from a text prompt using the Imagen 4 model.
 *
 * - generateImageFromTextPrompt - A function that takes a text prompt and generates an image.
 * - GenerateImageFromTextPromptInput - The input type for the generateImageFromTextPrompt function.
 * - GenerateImageFromTextPromptOutput - The return type for the generateImageFromTextPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageFromTextPromptInputSchema = z.string().describe('The text prompt to generate an image from.');
export type GenerateImageFromTextPromptInput = z.infer<typeof GenerateImageFromTextPromptInputSchema>;

const GenerateImageFromTextPromptOutputSchema = z.object({
  imageUrl: z.string().describe('The generated image as a data URI.'),
});
export type GenerateImageFromTextPromptOutput = z.infer<typeof GenerateImageFromTextPromptOutputSchema>;

export async function generateImageFromTextPrompt(prompt: GenerateImageFromTextPromptInput): Promise<GenerateImageFromTextPromptOutput> {
  return generateImageFromTextPromptFlow(prompt);
}

const generateImageFromTextPromptFlow = ai.defineFlow(
  {
    name: 'generateImageFromTextPromptFlow',
    inputSchema: GenerateImageFromTextPromptInputSchema,
    outputSchema: GenerateImageFromTextPromptOutputSchema,
  },
  async prompt => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: prompt,
    });
    if (!media) {
      throw new Error('No image was generated.');
    }
    return {imageUrl: media.url!};
  }
);
