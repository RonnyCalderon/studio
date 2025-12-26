'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a random weekly sexy challenge for couples.
 *
 * It exports:
 * - `generateWeeklyChallenge`: An async function that returns a randomly selected challenge from a given category.
 * - `WeeklyChallengeInput`: The input type, containing the category.
 * - `WeeklyChallengeOutput`: The output type, containing the challenge text and its spicy level.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WeeklyChallengeInputSchema = z.object({
    category: z.enum(['love', 'adventurous', 'sexy']),
});
export type WeeklyChallengeInput = z.infer<typeof WeeklyChallengeInputSchema>;


// Define the schema for the output (the weekly challenge).
const WeeklyChallengeOutputSchema = z.object({
  challenge: z.object({
    text: z.string().describe('The text of the sexy challenge.'),
    spicyLevel: z.number().min(1).max(3).describe('A spiciness rating from 1 to 3.'),
    persuasionScript: z.string().describe('A pre-written script to persuade the partner.'),
    category: z.string().describe('The category of the challenge.'),
  }).describe('A randomly selected sexy challenge for the week.'),
});
export type WeeklyChallengeOutput = z.infer<typeof WeeklyChallengeOutputSchema>;

// Define the list of challenges with spicy levels and persuasion scripts.
const challenges = [
  { text: 'Touch each other in a public place', spicyLevel: 2, category: 'adventurous', persuasionScript: "A little adventure to spice things up? It'll be our thrilling little secret." },
  { text: 'Watch a sexy movie like Shame', spicyLevel: 1, category: 'sexy', persuasionScript: "How about we explore a film that's both acclaimed and... stimulating?" },
  { text: 'Use the couple sextoy while we make love', spicyLevel: 3, category: 'sexy', persuasionScript: "Ready to explore new heights of pleasure together tonight?" },
  { text: 'Use any sextoy before penetrating your partner', spicyLevel: 2, category: 'sexy', persuasionScript: "Let's focus entirely on foreplay and see where the anticipation takes us." },
  { text: 'Massage the entire body of your partner after dinner', spicyLevel: 1, category: 'love', persuasionScript: "You've had a long day. Let me help you relax completely tonight, no strings attached." },
  { text: 'Both partners pick one favorite porn video for the other to watch', spicyLevel: 2, category: 'sexy', persuasionScript: "How about we share our fantasies by showing, not just telling?" },
  { text: 'Watch a porn video while starting to kiss and touch each other', spicyLevel: 2, category: 'sexy', persuasionScript: "What if we add a visual element to our session tonight? It could be an interesting experiment." },
  { text: 'Perform a blindfolded massage to your partner or lick her/him', spicyLevel: 2, category: 'adventurous', persuasionScript: "Trust me? Let's heighten our other senses by taking one away." },
  { text: 'Touch yourself in front of your partner', spicyLevel: 3, category: 'sexy', persuasionScript: "Your confidence is so attractive. What if we made that the main event?" },
  { text: 'Use a toy while going to the restaurant', spicyLevel: 3, category: 'adventurous', persuasionScript: "How about a secret adventure that only the two of us know about while we're out?" },
  { text: 'Go to a love hotel', spicyLevel: 3, category: 'adventurous', persuasionScript: "A change of scenery could be exciting. Let's make tonight a complete escape." },
  { text: 'Masturbate yourself in front of each other and try to cum at the same time', spicyLevel: 3, category: 'sexy', persuasionScript: "Let's try to sync our bodies and our pleasure in the most intimate way." },
  { text: 'Send a sexto to your partner with what you’d like to do to him her', spicyLevel: 1, category: 'love', persuasionScript: "Just thinking about you... Thought I'd start building some anticipation for later." },
  { text: 'Take 2 hours for the couple to relax, enjoy, without phones but in bed, talk, touch each other…', spicyLevel: 1, category: 'love', persuasionScript: "We've been so busy. Let's just disconnect and focus only on us for a while." },
  { text: 'You need to make love twice today', spicyLevel: 2, category: 'sexy', persuasionScript: "You have so much passion. How can we make the most of that today... and then maybe again later?" },
  { text: 'Take your partner really fast in a quickie while he’s preparing breakfast or lunch', spicyLevel: 2, category: 'adventurous', persuasionScript: "I'm feeling spontaneous... How about we interrupt our routine for a minute?" },
  { text: 'Go out in a car, then stop somewhere quiet and make love or just touch your partner', spicyLevel: 2, category: 'adventurous', persuasionScript: "You have a bit of a rebellious streak. What's the most exciting and secluded spot we can think of?" },
  { text: 'Go on a hike, then stop somewhere quiet, have a picnic and start touching each other', spicyLevel: 1, category: 'love', persuasionScript: "Let's combine the beauty of nature with our own private, intimate moment." },
  { text: 'Make love sitting on a chair', spicyLevel: 2, category: 'adventurous', persuasionScript: "Feeling creative? Let's try changing our perspective tonight." },
  { text: 'Make Ronny cum without penetration (whatever the method)', spicyLevel: 2, category: 'love', persuasionScript: "It's all about creative pleasure and control tonight. What's your technique?" }
];

export async function generateWeeklyChallenge(input: WeeklyChallengeInput): Promise<WeeklyChallengeOutput> {
  return generateWeeklyChallengeFlow(input);
}

const generateWeeklyChallengeFlow = ai.defineFlow(
  {
    name: 'generateWeeklyChallengeFlow',
    inputSchema: WeeklyChallengeInputSchema,
    outputSchema: WeeklyChallengeOutputSchema,
  },
  async ({ category }) => {
    // Filter challenges by the selected category
    const filteredChallenges = challenges.filter(c => c.category === category);
    
    if (filteredChallenges.length === 0) {
        throw new Error(`No challenges found for category: ${category}`);
    }

    // Select a random challenge from the filtered list.
    const randomIndex = Math.floor(Math.random() * filteredChallenges.length);
    const challenge = filteredChallenges[randomIndex];

    return {
        challenge: {
            ...challenge,
        }
    };
  }
);
