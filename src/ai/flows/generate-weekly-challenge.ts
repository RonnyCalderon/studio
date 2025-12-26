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
  { text: 'Touch each other in a public place', spicyLevel: 2, category: 'adventurous', persuasionScript: "You know how we both have that little rebellious streak, the part of us that loves a good secret? What if we shared a tiny, thrilling one that only we know about next time we're out? It could be our own private adventure in plain sight." },
  { text: 'Watch a sexy movie like Shame', spicyLevel: 1, category: 'sexy', persuasionScript: "You're someone who appreciates art and exploring deeper themes, right? I heard about this film that's not just sexy, but also really intense and thought-provoking about desire. I feel like it's something we could watch and maybe talk about after... It could open up some interesting conversations for us." },
  { text: 'Use the couple sextoy while we make love', spicyLevel: 3, category: 'sexy', persuasionScript: "You're always so present and passionate when we're together. I was thinking, what if we took that connection and just amplified it? We have that toy we've talked about... I think using it together could take what we already have and make it even more intense. Are you open to exploring that new level with me?" },
  { text: 'Use any sextoy before penetrating your partner', spicyLevel: 2, category: 'sexy', persuasionScript: "You're so good at building anticipation. What if we made that the entire focus? You're a person who appreciates the journey, not just the destination. Let's see how creative we can be and how much we can enjoy the build-up, using every tool we have to drive each other wild before the main event." },
  { text: 'Massage the entire body of your partner after dinner', spicyLevel: 1, category: 'love', persuasionScript: "You've been working so hard, and you deserve a moment that's purely about you. You're someone who gives a lot, and it's important to receive too. How about tonight, you just let me take care of you? No strings attached, just a full, relaxing massage to melt away the day. You can just... be." },
  { text: 'Both partners pick one favorite porn video for the other to watch', spicyLevel: 2, category: 'sexy', persuasionScript: "You know I find your mind just as sexy as your body. I'm curious about what really turns you on. You're an open person, right? What if we shared a piece of our fantasy world with each other? You pick a video for me, I pick one for you. It's like a show-and-tell for our desires." },
  { text: 'Watch a porn video while starting to kiss and touch each other', spicyLevel: 2, category: 'sexy', persuasionScript: "We're both visual people, and we know how powerful a little inspiration can be. What if we added another layer to our intimacy tonight? We could put something on... and just let it be background noise that fuels our own actions. It's just another way to explore what we both enjoy." },
  { text: 'Perform a blindfolded massage to your partner or lick her/him', spicyLevel: 2, category: 'adventurous', persuasionScript: "You're someone who trusts me completely, and that's incredibly hot. What if we played with that trust? If you let me blindfold you, you'd be putting yourself entirely in my hands. It would force us to focus only on touch and sound. I think it could be an incredibly intense way to connect." },
  { text: 'Touch yourself in front of your partner', spicyLevel: 3, category: 'sexy', persuasionScript: "Your confidence is one of the most attractive things about you. I love watching you. What if you let me just... appreciate you? It's not about performance, it's about sharing a very private, personal moment and being completely open with each other. I think seeing you like that would be an incredible turn-on." },
  { text: 'Use a toy while going to the restaurant', spicyLevel: 3, category: 'adventurous', persuasionScript: "You've always had a wonderfully mischievous side that I love. Are you feeling bold? I have a wild idea for our next dinner out. It's a secret just for us, something that would make it the most electrifying dinner we've ever had. It requires a bit of courage, but you've never been one to back down from a thrill." },
  { text: 'Go to a love hotel', spicyLevel: 3, category: 'adventurous', persuasionScript: "We're both explorers at heart, always looking for a new experience. Our bedroom is our sanctuary, but don't you think it would be exciting to escape to a place designed purely for fantasy? Just for a few hours. It's a change of scenery that gives us permission to be different versions of ourselves." },
  { text: 'Masturbate yourself in front of each other and try to cum at the same time', spicyLevel: 3, category: 'sexy', persuasionScript: "It takes a lot of connection and non-verbal communication to be in sync, and we've always been great at that. What if we tried the ultimate test? It's about being vulnerable and completely focused on each other's pleasure, trying to match our rhythm. It's a unique way to share an orgasm." },
  { text: 'Send a sexto to your partner with what you’d like to do to him her', spicyLevel: 1, category: 'love', persuasionScript: "You know how a good story can build suspense? You're a creative person. What if you painted me a picture with words? Just a little message earlier in the day, describing what's on your mind for later. It's a way to let the anticipation build for both of us." },
  { text: 'Take 2 hours for the couple to relax, enjoy, without phones but in bed, talk, touch each other…', spicyLevel: 1, category: 'love', persuasionScript: "You're one of the most driven people I know, but even you need to recharge. We both do. We value our connection, right? Let's prove it by carving out two hours of sacred, uninterrupted time. No phones, no distractions. Just us. We deserve that focus." },
  { text: 'You need to make love twice today', spicyLevel: 2, category: 'sexy', persuasionScript: "You have so much passion and energy. A person with that much fire can't be expected to contain it to just one moment. What if we don't? Let's embrace that energy today. The first time can be for now, and the second can be a surprise... a bonus round." },
  { text: 'Take your partner really fast in a quickie while he’s preparing breakfast or lunch', spicyLevel: 2, category: 'adventurous', persuasionScript: "You're someone who can be spontaneous and live in the moment. Routines are great, but the best memories come from breaking them. What if, in the middle of a totally normal moment, we just... didn't follow the rules? It's a reminder that our desire for each other can strike at any time." },
  { text: 'Go out in a car, then stop somewhere quiet and make love or just touch your partner', spicyLevel: 2, category: 'adventurous', persuasionScript: "You have a bit of a wild, adventurous spirit, don't you? What's the point of having that spirit if we don't let it out to play sometimes? Let's go for a drive with no destination, and when we find that perfect, secluded spot, we can have a moment that's just for us, away from everything." },
  { text: 'Go on a hike, then stop somewhere quiet, have a picnic and start touching each other', spicyLevel: 1, category: 'love', persuasionScript: "You appreciate the simple, beautiful things in life—nature, good food, and our connection. Let's combine all three. We can go on that hike we've been talking about, find a beautiful view, and just enjoy being close. It's about mixing public beauty with a private, intimate moment." },
  { text: 'Make love sitting on a chair', spicyLevel: 2, category: 'adventurous', persuasionScript: "You're a creative person, always looking at things from a different angle. Why should our intimacy be any different? Changing our perspective can change the entire experience. It's a simple shift, but it could open up a whole new set of feelings and sensations. Are you curious enough to try?" },
  { text: 'Make Ronny cum without penetration (whatever the method)', spicyLevel: 2, category: 'love', persuasionScript: "You're such a generous lover, and you have amazing technique. This challenge is all about that skill. It's a chance to focus entirely on creative pleasure and control, showing how well you know my body. It puts all the power in your hands. What do you think you'd do?" }
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
