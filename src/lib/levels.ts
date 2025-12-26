import { Baby, Flame, Footprints, Gem, HeartPulse, KeyRound, LucideIcon, Mountain, Rabbit, Sprout } from "lucide-react";

export interface Level {
    level: number;
    threshold: number;
    title: string;
    description: string;
    icon: LucideIcon;
}

export const levels: Level[] = [
    {
        level: 1,
        threshold: 1,
        title: "Curious Novice",
        icon: Sprout,
        description: "You've taken the first step. You've shown you're open to new things. A person who tries one new thing is often curious enough to try another. What's next?"
    },
    {
        level: 2,
        threshold: 3,
        title: "Spark Igniter",
        icon: Flame,
        description: "You've already completed a few challenges; you're not a novice anymore. You're someone who enjoys this. Since you enjoy adding sparks, will you prefer a playful spark or an intense one next?"
    },
    {
        level: 3,
        threshold: 5,
        title: "Pathfinder",
        icon: Footprints,
        description: "You're clearly invested in this journey together. After coming this far, stopping would be a waste of the momentum you've built. The path is becoming clearer. Let's keep exploring."
    },
    {
        level: 4,
        threshold: 8,
        title: "Desire Dabbler",
        icon: Rabbit,
        description: "You've moved beyond simple curiosity. It's becoming natural to explore these desires, isn't it? This is just a part of who you are as a passionate couple now."
    },
    {
        level: 5,
        threshold: 12,
        title: "Intimacy Artisan",
        icon: HeartPulse,
        description: "You're not just playing; you're crafting new experiences. As a skilled artisan of intimacy, your toolset is expanding. Shall we try a challenge that requires a bit more... finesse?"
    },
    {
        level: 6,
        threshold: 17,
        title: "Secret Keeper",
        icon: KeyRound,
        description: "You've shared experiences others haven't. This collection of secrets is your treasure. A couple who values such treasures knows that the best ones are yet to be found."
    },
    {
        level: 7,
        threshold: 25,
        title: "Ecstasy Expert",
        icon: Mountain,
        description: "You've climbed high and seen the view. This level of shared vulnerability and ecstasy is your new normal. You've always been this adventurous; you just needed the right map."
    }
];
