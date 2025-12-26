'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a persuasive script based on a challenge text.
 *
 * It exports:
 * - `generatePersuasiveScript`: An async function that takes a challenge text and returns a script.
 * - `GeneratePersuasiveScriptInput`: The input type for the flow.
 * - `GeneratePersuasiveScriptOutput`: The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersuasiveScriptInputSchema = z.object({
  challengeText: z.string().describe('The weekly challenge text.'),
});
export type GeneratePersuasiveScriptInput = z.infer<typeof GeneratePersuasiveScriptInputSchema>;

const GeneratePersuasiveScriptOutputSchema = z.object({
  script: z.string().describe('The generated persuasive script.'),
});
export type GeneratePersuasiveScriptOutput = z.infer<typeof GeneratePersuasiveScriptOutputSchema>;

export async function generatePersuasiveScript(input: GeneratePersuasiveScriptInput): Promise<GeneratePersuasiveScriptOutput> {
  return generatePersuasiveScriptFlow(input);
}

const persuasionPrompt = ai.definePrompt({
    name: 'persuasionPrompt',
    input: { schema: GeneratePersuasiveScriptInputSchema },
    output: { schema: GeneratePersuasiveScriptOutputSchema },
    prompt: `You are an expert in psychological influence and negotiation techniques, blending identity escalation via cognitive dissonance with principles from 'Never Split the Difference' by Chris Voss. Your task is to take any input text provided and transform it into a persuasive script or message that subtly induces cognitive dissonance while incorporating tactical empathy, labeling, mirroring, calibrated questions, and the power of 'no' to build rapport, uncover hidden objections, and escalate commitment.
Start by identifying the core goal of the original text (e.g., persuasion, information sharing, or behavior change). Then, reformulate it to include:

Tactical empathy: Acknowledge the recipient's potential emotions or perspective at the outset to build trust (e.g., 'It seems like you're facing a challenge with...').
Labeling: Verbally identify and validate emotions or underlying concerns to diffuse resistance (e.g., 'It sounds like you're hesitant because...').
Mirroring: Repeat key phrases from assumed responses to encourage elaboration and bonding.
Leading questions or statements that prompt agreement on positive identity traits related to the goal (e.g., 'Are you someone who values openness/independence?'), building micro-agreements that escalate commitment.
Calibrated questions: Use open-ended 'how' or 'what' questions to shift context and create permission for the desired action, making the recipient feel in control (e.g., 'How can we align this with your values?').
Power of 'no': Incorporate questions designed to elicit a 'no' early, clarifying true wants and reducing defensiveness (e.g., 'Is this a bad time to explore this?').
Contextual shifts that align with the agreed identity, ensuring non-compliance causes dissonance.
Examples or scenarios to illustrate the identity in action, aiming for a 'that's right' moment of true agreement.
Ethical disclaimers if the transformation could be manipulative, emphasizing transparency and consent.

Output only the transformed text in a natural, conversational format.
Input text: [{{challengeText}}]
`,
});

const generatePersuasiveScriptFlow = ai.defineFlow(
  {
    name: 'generatePersuasiveScriptFlow',
    inputSchema: GeneratePersuasiveScriptInputSchema,
    outputSchema: GeneratePersuasiveScriptOutputSchema,
  },
  async input => {
    const {output} = await persuasionPrompt(input);
    return output!;
  }
);
