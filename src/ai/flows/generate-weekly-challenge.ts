'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a random weekly sexy challenge for couples.
 *
 * It exports:
 * - `generateWeeklyChallenge`: An async function that returns a randomly selected challenge.
 * - `WeeklyChallengeOutput`: The output type, a string containing the challenge text.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the schema for the output (the weekly challenge).
const WeeklyChallengeOutputSchema = z.object({
  challenge: z.string().describe('A randomly selected sexy challenge for the week.'),
});
export type WeeklyChallengeOutput = z.infer<typeof WeeklyChallengeOutputSchema>;

// Define the list of challenges.
const challenges = [
  'Touch each other in a public place',
  'Watch a sexy movie like Shame',
  'Use the couple sextoy while we make love',
  'Use any sextoy before penetrating your partner',
  'Massage the entire body of your partner after diner',
  'Both partners pick one favorite porn video for the other to watch',
  'Watch a porn video while starting to kiss and touch each other',
  'Perform a blindfolded massage to your partner or lick her/him',
  'Touch yourself in front of your partner',
  'Use a toy while going to the restaurant',
  'Go to a love hotel',
  'Masturbate yourself in front of each other and try to cum at the same time',
  'Send a sexto to your partner with what you’d like to do to him her',
  'Take 2 hours for the couple to relax, enjoy, without phones but in bed, talk, touch each other…',
  'You need to make love twice today',
  'Take your partner really fast in a quickie while he’s preparing breakfast or lunch',
  'Go out in a car, then stop somewhere quiet and make love or just touch your partner',
  'Go on a hike, then stop somewhere quiet, have a picnic and start touching each other',
  'Make love sitting on a chair',
  'Make Ronny cum without penetration (whatever the method)'
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

    return {challenge};
  }
);
