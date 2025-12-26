'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a random weekly sexy challenge for couples.
 *
 * It exports:
 * - `generateWeeklyChallenge`: An async function that returns a randomly selected challenge.
 * - `WeeklyChallengeOutput`: The output type, containing the challenge text and its spicy level.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { generatePersuasiveScript } from './generate-persuasive-script';

// Define the schema for the output (the weekly challenge).
const WeeklyChallengeOutputSchema = z.object({
  challenge: z.object({
    text: z.string().describe('The text of the sexy challenge.'),
    spicyLevel: z.number().min(1).max(3).describe('A spiciness rating from 1 to 3.'),
    persuasionScript: z.string().describe('An AI-generated script to persuade the partner.'),
  }).describe('A randomly selected sexy challenge for the week.'),
});
export type WeeklyChallengeOutput = z.infer<typeof WeeklyChallengeOutputSchema>;

// Define the list of challenges with spicy levels.
const challenges = [
  { text: 'Touch each other in a public place', spicyLevel: 2 },
  { text: 'Watch a sexy movie like Shame', spicyLevel: 1 },
  { text: 'Use the couple sextoy while we make love', spicyLevel: 3 },
  { text: 'Use any sextoy before penetrating your partner', spicyLevel: 2 },
  { text: 'Massage the entire body of your partner after diner', spicyLevel: 1 },
  { text: 'Both partners pick one favorite porn video for the other to watch', spicyLevel: 2 },
  { text: 'Watch a porn video while starting to kiss and touch each other', spicyLevel: 2 },
  { text: 'Perform a blindfolded massage to your partner or lick her/him', spicyLevel: 2 },
  { text: 'Touch yourself in front of your partner', spicyLevel: 3 },
  { text: 'Use a toy while going to the restaurant', spicyLevel: 3 },
  { text: 'Go to a love hotel', spicyLevel: 3 },
  { text: 'Masturbate yourself in front of each other and try to cum at the same time', spicyLevel: 3 },
  { text: 'Send a sexto to your partner with what you’d like to do to him her', spicyLevel: 1 },
  { text: 'Take 2 hours for the couple to relax, enjoy, without phones but in bed, talk, touch each other…', spicyLevel: 1 },
  { text: 'You need to make love twice today', spicyLevel: 2 },
  { text: 'Take your partner really fast in a quickie while he’s preparing breakfast or lunch', spicyLevel: 2 },
  { text: 'Go out in a car, then stop somewhere quiet and make love or just touch your partner', spicyLevel: 2 },
  { text: 'Go on a hike, then stop somewhere quiet, have a picnic and start touching each other', spicyLevel: 1 },
  { text: 'Make love sitting on a chair', spicyLevel: 2 },
  { text: 'Make Ronny cum without penetration (whatever the method)', spicyLevel: 2 }
];

export async function generateWeeklyChallenge(): Promise<WeeklyChallengeOutput> {
  return generateWeeklyChallengeFlow();
}

const generateWeeklyChallengeFlow = ai.defineFlow(
  {
    name: 'generateWeeklyChallengeFlow',
    outputSchema: WeeklyChallengeOutputSchema,
  },
  async () => {
    // Simulate the Genius Shuffle (simple random selection for now).
    const randomIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomIndex];

    const persuasionResult = await generatePersuasiveScript({ challengeText: challenge.text });

    return {
        challenge: {
            ...challenge,
            persuasionScript: persuasionResult.script,
        }
    };
  }
);
