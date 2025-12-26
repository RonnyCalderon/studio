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
        title: "The First Spark",
        icon: Sprout,
        description: "You've taken the first, most important step. You've proven you're both open-minded people. A couple who tries one new thing is always curious enough to try another. What's next on your path?"
    },
    {
        level: 2,
        threshold: 3,
        title: "Playful Explorers",
        icon: Flame,
        description: "You've done more than just try; you're actively exploring. You enjoy this, don't you? A couple this invested in pleasure knows that the most exciting discoveries are just ahead. You're building a habit of saying 'yes' together."
    },
    {
        level: 3,
        threshold: 5,
        title: "Trailblazers",
        icon: Footprints,
        description: "Look how far you've come. You're not just following a path; you're creating your own. A truly adventurous couple like you wouldn't stop now. The journey is the destination, and your map is getting bigger."
    },
    {
        level: 4,
        threshold: 8,
        title: "Masters of Desire",
        icon: HeartPulse,
        description: "This is becoming second nature. You've moved beyond simple curiosity and are now crafting your shared desires. You've learned to communicate in a language of pure pleasure. The 'rules' are starting to bend for you."
    },
    {
        level: 5,
        threshold: 12,
        title: "Keepers of Secrets",
        icon: KeyRound,
        description: "You now share intimate secrets that belong only to you two. A couple that trusts each other this deeply knows that some secrets are kept not with words, but with the body. You are unlocking new doors of what is possible."
    },
    {
        level: 6,
        threshold: 17,
        title: "Connoisseurs of Ecstasy",
        icon: Mountain,
        description: "For you, the forbidden has become the familiar. An act that seems 'too much' for others is just another shade of pleasure for you. You've learned that total surrender and trust lead to the highest peaks, even exploring the final frontiers of intimacy."
    },
    {
        level: 7,
        threshold: 25,
        title: "Legends of Lust",
        icon: Gem,
        description: "You have rewritten your own rules. There are no limits, only new rituals of pleasure. You've reached a level of connection where one partner's body is a sacred playground for the other, without taboos. You are the masters of your own universe of desire."
    }
];
