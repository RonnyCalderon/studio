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

// Define the schema for the output (the weekly challenge).
const WeeklyChallengeOutputSchema = z.object({
  challenge: z.object({
    text: z.string().describe('The text of the sexy challenge.'),
    spicyLevel: z.number().min(1).max(3).describe('A spiciness rating from 1 to 3.'),
    persuasionScript: z.string().describe('A pre-written script to persuade the partner.'),
  }).describe('A randomly selected sexy challenge for the week.'),
});
export type WeeklyChallengeOutput = z.infer<typeof WeeklyChallengeOutputSchema>;

// Define the list of challenges with spicy levels and persuasion scripts.
const challenges = [
  { text: 'Touch each other in a public place', spicyLevel: 2, persuasionScript: "It sounds like we might be a little hesitant about public displays. Are you against a little adventure, or are you just worried about getting caught? What if we made it our little secret?" },
  { text: 'Watch a sexy movie like Shame', spicyLevel: 1, persuasionScript: "It seems like you appreciate art and exploring deeper themes. How about we explore a film that's both critically acclaimed and... stimulating?" },
  { text: 'Use the couple sextoy while we make love', spicyLevel: 3, persuasionScript: "I get the sense you're someone who isn't afraid to explore new heights of pleasure. What's the best way to introduce a new dynamic to our intimacy tonight?" },
  { text: 'Use any sextoy before penetrating your partner', spicyLevel: 2, persuasionScript: "It seems like you value building anticipation. How would it feel to focus entirely on foreplay and see where it takes us?" },
  { text: 'Massage the entire body of your partner after diner', spicyLevel: 1, persuasionScript: "It seems like you've had a long day. Would it be a bad idea to just help you relax completely tonight, with no other expectations?" },
  { text: 'Both partners pick one favorite porn video for the other to watch', spicyLevel: 2, persuasionScript: "You seem like an open-minded person. What if we shared a little bit about our fantasies by showing, not just telling?" },
  { text: 'Watch a porn video while starting to kiss and touch each other', spicyLevel: 2, persuasionScript: "Are you against adding a visual element to our session tonight? It seems like it could be an interesting experiment in what gets us both going." },
  { text: 'Perform a blindfolded massage to your partner or lick her/him', spicyLevel: 2, persuasionScript: "It sounds like you trust me completely. How about we heighten our senses tonight by taking one of them away?" },
  { text: 'Touch yourself in front of your partner', spicyLevel: 3, persuasionScript: "It feels like you're incredibly confident in your own skin. What if we took that confidence and made it the main event? " },
  { text: 'Use a toy while going to the restaurant', spicyLevel: 3, persuasionScript: "Are you completely opposed to having a little secret adventure that only the two of us know about, even when we're out?" },
  { text: 'Go to a love hotel', spicyLevel: 3, persuasionScript: "It seems like a change of scenery could be exciting. How can we make tonight feel like a complete escape from the everyday?" },
  { text: 'Masturbate yourself in front of each other and try to cum at the same time', spicyLevel: 3, persuasionScript: "It seems like you value a deep, almost psychic connection. What if we tried to sync our bodies and our pleasure in the most intimate way possible?" },
  { text: 'Send a sexto to your partner with what you’d like to do to him her', spicyLevel: 1, persuasionScript: "Would it be a bad time to start building a little anticipation for later? I was just thinking about you..." },
  { text: 'Take 2 hours for the couple to relax, enjoy, without phones but in bed, talk, touch each other…', spicyLevel: 1, persuasionScript: "It feels like we've been so busy. Is it a terrible idea to completely disconnect from the world and just focus on us for a little while?" },
  { text: 'You need to make love twice today', spicyLevel: 2, persuasionScript: "You seem to have a lot of energy and passion. How can we make the most of that today, and then maybe... again later?" },
  { text: 'Take your partner really fast in a quickie while he’s preparing breakfast or lunch', spicyLevel: 2, persuasionScript: "Are you against a little spontaneity? It seems like the perfect moment to interrupt our routine with something... more urgent." },
  { text: 'Go out in a car, then stop somewhere quiet and make love or just touch your partner', spicyLevel: 2, persuasionScript: "It seems you have a bit of a rebellious streak. What's the most exciting and secluded spot we can think of for a private adventure?" },
  { text: 'Go on a hike, then stop somewhere quiet, have a picnic and start touching each other', spicyLevel: 1, persuasionScript: "You seem to really appreciate nature. How can we combine the beauty of the outdoors with our own private, intimate moment?" },
  { text: 'Make love sitting on a chair', spicyLevel: 2, persuasionScript: "It seems like you're someone who's open to trying new things. What's a creative way we could change our perspective tonight?" },
  { text: 'Make Ronny cum without penetration (whatever the method)', spicyLevel: 2, persuasionScript: "It seems you're a master of technique and patience. How would you approach a challenge that's all about creative pleasure and control?" }
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

    return {
        challenge: {
            ...challenge,
        }
    };
  }
);
