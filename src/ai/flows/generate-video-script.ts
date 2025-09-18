'use server';
/**
 * @fileOverview Creates a video script for various platforms.
 *
 * - generateVideoScript - A function that handles the video script generation.
 * - GenerateVideoScriptInput - The input type for the generateVideoScript function.
 * - GenerateVideoScriptOutput - The return type for the generateVideoScript function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVideoScriptInputSchema = z.object({
  topic: z.string().describe('The topic or main idea of the video.'),
  platform: z.string().describe('The platform the video is for (e.g., YouTube, TikTok, Instagram Reels).'),
  duration: z.string().describe('The desired duration of the video (e.g., 30 seconds, 5 minutes).'),
});
export type GenerateVideoScriptInput = z.infer<typeof GenerateVideoScriptInputSchema>;

const SceneSchema = z.object({
  scene: z.number().describe('The scene number.'),
  visuals: z.string().describe('Description of the visuals, camera shots, and on-screen text for this scene.'),
  dialogue: z.string().describe('The dialogue or voiceover for this scene, timed appropriately.'),
});

const GenerateVideoScriptOutputSchema = z.object({
  title: z.string().describe('A catchy, SEO-friendly title for the video.'),
  hook: z.string().describe('An engaging hook to grab the viewer\'s attention in the first 3-5 seconds.'),
  script: z.array(SceneSchema).describe('The script, broken down into scenes with detailed visuals and dialogue.'),
  cta: z.string().describe('A clear and compelling call-to-action for the end of the video.'),
});
export type GenerateVideoScriptOutput = z.infer<typeof GenerateVideoScriptOutputSchema>;

export async function generateVideoScript(input: GenerateVideoScriptInput): Promise<GenerateVideoScriptOutput> {
  return generateVideoScriptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVideoScriptPrompt',
  input: {schema: GenerateVideoScriptInputSchema},
  output: {schema: GenerateVideoScriptOutputSchema},
  prompt: `You are an expert scriptwriter for digital content. Create a compelling video script based on the following details. The tone should be appropriate for the target platform. Do not use hyphens in any of the generated text.

Video Topic: {{{topic}}}
Target Platform: {{{platform}}}
Desired Duration: {{{duration}}}

The script must have:
- A catchy, SEO-friendly title.
- An engaging hook for the first 3-5 seconds.
- A clear structure with scenes, describing detailed visuals (camera shots, on-screen text) and dialogue/voiceover.
- A strong call-to-action (CTA) at the end.`,
});

const generateVideoScriptFlow = ai.defineFlow(
  {
    name: 'generateVideoScriptFlow',
    inputSchema: GenerateVideoScriptInputSchema,
    outputSchema: GenerateVideoScriptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
