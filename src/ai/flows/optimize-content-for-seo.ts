'use server';
/**
 * @fileOverview Optimizes content for SEO by providing an on-page SEO score and suggestions for improvement.
 *
 * - optimizeContentForSEO - A function that handles the SEO optimization process.
 * - OptimizeContentForSEOInput - The input type for the optimizeContentForSEO function.
 * - OptimizeContentForSEOOutput - The return type for the optimizeContentForSEO function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeContentForSEOInputSchema = z.object({
  content: z
    .string()
    .describe('The content to be optimized for SEO.'),
  targetKeyword: z.string().describe('The target keyword for SEO optimization.'),
});
export type OptimizeContentForSEOInput = z.infer<
  typeof OptimizeContentForSEOInputSchema
>;

const OptimizeContentForSEOOutputSchema = z.object({
  seoScore: z.number().describe('The overall SEO score (0-100) of the content, based on keyword usage, readability, and structure.'),
  suggestions: z
    .array(z.string())
    .describe('A bulleted list of specific, actionable suggestions for improving the content\'s SEO.'),
  rewrittenContent: z
    .string()
    .describe('The rewritten content with SEO improvements, including better keyword placement and improved headings.'),
});
export type OptimizeContentForSEOOutput = z.infer<
  typeof OptimizeContentForSEOOutputSchema
>;

export async function optimizeContentForSEO(
  input: OptimizeContentForSEOInput
): Promise<OptimizeContentForSEOOutput> {
  return optimizeContentForSEOFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeContentForSEOPrompt',
  input: {schema: OptimizeContentForSEOInputSchema},
  output: {schema: OptimizeContentForSEOOutputSchema},
  prompt: `You are an SEO expert. Analyze the following content for the target keyword. Do not use hyphens or em dashes in any of the generated text.

Content: {{{content}}}
Target Keyword: {{{targetKeyword}}}

Provide the following:
1.  **SEO Score (0-100):** A numerical score based on the content's on-page SEO effectiveness for the target keyword.
2.  **Suggestions:** A bulleted list of specific, actionable suggestions to improve the content's SEO. Focus on keyword density, placement in headings and meta descriptions, readability, and internal/external linking opportunities.
3.  **Rewritten Content:** Provide the full rewritten content incorporating your SEO improvements and naturally targeting the keyword. Ensure the rewritten content maintains the original meaning and tone but is optimized for search engines.`,
});

const optimizeContentForSEOFlow = ai.defineFlow(
  {
    name: 'optimizeContentForSEOFlow',
    inputSchema: OptimizeContentForSEOInputSchema,
    outputSchema: OptimizeContentForSEOOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
