'use server';
/**
 * @fileOverview An AI agent that generates a full article from a short brief.
 *
 * - generateArticleFromBrief - A function that handles the article generation process.
 * - GenerateArticleFromBriefInput - The input type for the generateArticleFromBrief function.
 * - GenerateArticleFromBriefOutput - The return type for the generateArticleFromBrief function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArticleFromBriefInputSchema = z.object({
  brief: z.string().describe('A short brief describing the desired article.'),
  seoKeywords: z.string().optional().describe('Optional SEO keywords to incorporate into the article.'),
});
export type GenerateArticleFromBriefInput = z.infer<typeof GenerateArticleFromBriefInputSchema>;

const ArticleSectionSchema = z.object({
  subheading: z.string().describe('A descriptive subheading for this section of the article.'),
  content: z.string().describe('The paragraph(s) of content for this section.'),
});

const GenerateArticleFromBriefOutputSchema = z.object({
  title: z.string().describe('A catchy and relevant title for the article.'),
  introduction: z.string().describe('An engaging introduction that hooks the reader.'),
  sections: z.array(ArticleSectionSchema).describe('An array of body sections, each with a subheading and content.'),
  conclusion: z.string().describe('A concluding paragraph that summarizes the key points.'),
});
export type GenerateArticleFromBriefOutput = z.infer<typeof GenerateArticleFromBriefOutputSchema>;

export async function generateArticleFromBrief(input: GenerateArticleFromBriefInput): Promise<GenerateArticleFromBriefOutput> {
  return generateArticleFromBriefFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateArticleFromBriefPrompt',
  input: {schema: GenerateArticleFromBriefInputSchema},
  output: {schema: GenerateArticleFromBriefOutputSchema},
  prompt: `You are an expert blog writer known for creating clear, engaging, and well-structured content. Generate a full article based on the following brief.

The article must be structured as follows:
1. A catchy and relevant title.
2. A short introduction that hooks the reader.
3. At least 3-4 body sections, each with a descriptive subheading and a well-written paragraph of content.
4. A concluding paragraph that summarizes the key points.
5. Natural incorporation of the provided SEO keywords, if any. Do not use hyphens or em dashes in any of the generated text.

Brief: {{{brief}}}

SEO Keywords: {{{seoKeywords}}}`,
});

const generateArticleFromBriefFlow = ai.defineFlow(
  {
    name: 'generateArticleFromBriefFlow',
    inputSchema: GenerateArticleFromBriefInputSchema,
    outputSchema: GenerateArticleFromBriefOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
