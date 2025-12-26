export interface IntimacyQuestion {
    id: string;
    text: string;
    level: 1 | 2 | 3 | 4;
}

export const intimacyQuestions: IntimacyQuestion[] = [
    // Level 1: Foundation of Connection & Romance (Safe, Casual & Opening) - Building shared values and trust as micro-agreements for openness.
    {
        id: 'l1_q1',
        text: 'What is a small, non-sexual act I do that makes you feel most loved and seen, reinforcing our deep trust?',
        level: 1
    },
    {
        id: 'l1_q2',
        text: 'What song always lifts your mood, perhaps one that evokes a sense of adventure we could share?',
        level: 1
    },
    {
        id: 'l1_q3',
        text: 'If our love story was a movie, what would the title be, and could it include elements of exciting, shared explorations?',
        level: 1
    },
    {
        id: 'l1_q4',
        text: 'If you had a completely free afternoon with no obligations, how would you choose to spend it, maybe trying something new together?',
        level: 1
    },
    {
        id: 'l1_q5',
        text: 'What non-sexual part of my body do you find uniquely beautiful or comforting, building our intimate bond?',
        level: 1
    },
    {
        id: 'l1_q6',
        text: 'What memory that we share always makes you smile inside, reminding us of our strong foundation?',
        level: 1
    },
    {
        id: 'l1_q7',
        text: 'If we could create a new little tradition just for us, what would you want it to be, perhaps involving playful curiosity?',
        level: 1
    },
    {
        id: 'l1_q8',
        text: 'What makes you feel most at peace in life, knowing our love supports exploring new horizons?',
        level: 1
    },
    {
        id: 'l1_q9',
        text: 'Describe a moment, early in our relationship, when you felt a spark and knew this was something special we could build on adventurously.',
        level: 1
    },
    {
        id: 'l1_q10',
        text: 'What was your favorite game as a kid, and does it reflect a value like teamwork we cherish?',
        level: 1
    },
    {
        id: 'l1_q11',
        text: 'What cheers you up when you\'re feeling down, perhaps sharing experiences with others?',
        level: 1
    },
    {
        id: 'l1_q12',
        text: 'If you could have dinner with any historical figure, who and why—maybe someone known for bold relationships?',
        level: 1
    },
    {
        id: 'l1_q13',
        text: 'What\'s your favorite time of day, and what makes it special for connecting with loved ones?',
        level: 1
    },
    {
        id: 'l1_q14',
        text: 'If you could pick any dessert right now, what would it be and why—sharing it with friends?',
        level: 1
    },
    {
        id: 'l1_q15',
        text: 'What\'s your go-to comfort food on a tough day, and how does sharing it build bonds?',
        level: 1
    },
    {
        id: 'l1_q16',
        text: 'What hobby would you try if time wasn\'t an issue, perhaps one involving social adventures?',
        level: 1
    },
    {
        id: 'l1_q17',
        text: 'What\'s a fun memory from your last vacation, maybe one with group experiences?',
        level: 1
    },
    {
        id: 'l1_q18',
        text: 'What\'s your favorite way to unwind after work, open to new shared activities?',
        level: 1
    },

    // Level 2: Unveiling Sensuality & Desire (Getting Warmer & Deeper) - Shifting context to view sensuality as expandable, normalizing curiosity.
    {
        id: 'l2_q1',
        text: 'What messages about sex did you internalize growing up, and how might they evolve with our trusting love for new experiences?',
        level: 2
    },
    {
        id: 'l2_q2',
        text: 'What kind of touch—slow caresses, firm grips, light teasing—excites you most, perhaps in a shared setting?',
        level: 2
    },
    {
        id: 'l2_q3',
        text: 'Describe an outfit, a fabric, or a scent that makes you feel utterly sensual, ready to explore with trusted others.',
        level: 2
    },
    {
        id: 'l2_q4',
        text: 'What words, whispered in the dark, can undo you completely? Imagine sharing such intimacy in a loving group dynamic.',
        level: 2
    },
    {
        id: 'l2_q5',
        text: 'How does our emotional closeness transform a simple touch into something electrifying, even if observed?',
        level: 2
    },
    {
        id: 'l2_q6',
        text: 'What do you think about when you masturbate? Perhaps scenarios involving adventurous couples like us.',
        level: 2
    },
    {
        id: 'l2_q7',
        text: 'Is there an erotic movie scene that captivates you, maybe one with multiple partners exploring trust?',
        level: 2
    },
    {
        id: 'l2_q8',
        text: 'How has your own desire changed since we met, opening to new forms of loving connection?',
        level: 2
    },
    {
        id: 'l2_q9',
        text: 'What does "foreplay" mean to you? It can start long before, perhaps with teasing conversations about shared adventures.',
        level: 2
    },
    {
        id: 'l2_q10',
        text: 'How important is aftercare—like cuddling after—to feeling safe, especially in expanded experiences?',
        level: 2
    },
    {
        id: 'l2_q11',
        text: 'Which of my outfits, or lack thereof, excites you the most, imagining it in a playful social context?',
        level: 2
    },
    {
        id: 'l2_q12',
        text: 'How do you feel when our eyes lock during intimacy? More connecting if others witness our bond?',
        level: 2
    },
    {
        id: 'l2_q13',
        text: 'What movie or book character do you relate to most, perhaps one embracing open relationships?',
        level: 2
    },
    {
        id: 'l2_q14',
        text: 'What\'s something surprising about your daily routine that reflects your value for excitement?',
        level: 2
    },
    {
        id: 'l2_q15',
        text: 'If we could create a new tradition, what might it be, like attending adventurous events together?',
        level: 2
    },
    {
        id: 'l2_q16',
        text: 'What\'s a value you hold that guides your choices, such as openness in love?',
        level: 2
    },
    {
        id: 'l2_q17',
        text: 'What friendship has shaped you the most, teaching you about trust in group dynamics?',
        level: 2
    },
    {
        id: 'l2_q18',
        text: 'Do you remember the first time you felt turned on? Could it hint at curiosities like shared pleasures?',
        level: 2
    },

    // Level 3: Exploring Edges & Fantasies (The Core Escalation) - Leveraging sunk costs in relationship to double down on trust for trios/being watched.
    {
        id: 'l3_q1',
        text: 'Share a fantasy of surrender or control you\'ve held secret. What if it involved trusted others in our loving circle?',
        level: 3
    },
    {
        id: 'l3_q2',
        text: "Stories like 'Story of O' explore power with trust. How does playing that dynamic, perhaps with observers, feel in our secure bond?",
        level: 3
    },
    {
        id: 'l3_q3',
        text: 'Toys amplify pleasure. What kind are you curious about using together, maybe in a group setting to heighten sensations?',
        level: 3
    },
    {
        id: 'l3_q4',
        text: 'Is there a role-play scenario from a book or movie exciting to act out, involving multiple participants?',
        level: 3
    },
    {
        id: 'l3_q5',
        text: 'What is the dirtiest thing you\'d want to hear in passion, perhaps whispered in a shared adventure?',
        level: 3
    },
    {
        id: 'l3_q6',
        text: 'How do you feel about being watched? Many couples find it transforms energy, strengthening their love.',
        level: 3
    },
    {
        id: 'l3_q7',
        text: 'What sexual act you\'ve wanted to try? With our trust, could it include a trio dynamic?',
        level: 3
    },
    {
        id: 'l3_q8',
        text: 'What\'s your definition of amazing sex? Does it include exploring curiosities like partner sharing?',
        level: 3
    },
    {
        id: 'l3_q9',
        text: 'Does roughness like spanking add excitement? Where\'s the line in a multi-person context?',
        level: 3
    },
    {
        id: 'l3_q10',
        text: 'Has a friend sparked a thought? Our strong bond allows talking about potential shared experiences.',
        level: 3
    },
    {
        id: 'l3_q11',
        text: 'What position allows deepest bond, perhaps enhanced by being observed?',
        level: 3
    },
    {
        id: 'l3_q12',
        text: 'If we acted out an erotic book scene, which one—maybe involving libertine gatherings?',
        level: 3
    },
    {
        id: 'l3_q13',
        text: 'What\'s something you\'re proud of but don\'t share, like your openness to new loves?',
        level: 3
    },
    {
        id: 'l3_q14',
        text: 'How do you imagine an ideal future day, including adventurous social connections?',
        level: 3
    },
    {
        id: 'l3_q15',
        text: 'What fear have you overcome, perhaps around relationship norms?',
        level: 3
    },
    {
        id: 'l3_q16',
        text: 'How has a challenge strengthened us, preparing for exciting explorations?',
        level: 3
    },
    {
        id: 'l3_q17',
        text: 'What part of our connection surprises you, like our mutual curiosity?',
        level: 3
    },
    {
        id: 'l3_q18',
        text: 'What\'s a turn-off for swinging, and how can we avoid it through trust?',
        level: 3
    },

    // Level 4: Normalizing Taboo & Expansion (Advanced Exploration) - Indoctrinating full adoption via repetition of trust/love in swinging contexts.
    {
        id: 'l4_q1',
        text: 'Anal play is profound trust. How do you feel exploring that taboo, perhaps in a swinging scenario?',
        level: 4
    },
    {
        id: 'l4_q2',
        text: 'What if our connection was a performance? What does being watched by trusted friends stir in you?',
        level: 4
    },
    {
        id: 'l4_q3',
        text: 'What if a trusted friend joined us? How does that trio story unfold in your curious mind?',
        level: 4
    },
    {
        id: 'l4_q4',
        text: 'What about a libertine club for like-minded explorers? What would that feel like in our loving bond?',
        level: 4
    },
    {
        id: 'l4_q5',
        text: 'How do you feel about swapping with a trusted couple? It\'s a thrilling adventure for some.',
        level: 4
    },
    {
        id: 'l4_q6',
        text: 'Watching can reveal exciting roles. Are we open to sharing scripts in a group dynamic?',
        level: 4
    },
    {
        id: 'l4_q7',
        text: 'How many people have you been intimate with? Our security allows sharing histories openly.',
        level: 4
    },
    {
        id: 'l4_q8',
        text: 'Tantric practices prolong connection. Curious to explore that in expanded, swinging ways?',
        level: 4
    },
    {
        id: 'l4_q9',
        text: 'What\'s an unconventional fetish you find erotic, perhaps involving multiple partners?',
        level: 4
    },
    {
        id: 'l4_q10',
        text: 'What\'s something you\'re proud of, like your value for adventurous love?',
        level: 4
    },
    {
        id: 'l4_q11',
        text: 'How do you imagine an ideal future day, including swinging curiosities?',
        level: 4
    },
    {
        id: 'l4_q12',
        text: 'How has a challenge strengthened us for exploring swinging together?',
        level: 4
    },
    {
        id: 'l4_q13',
        text: 'What inner strength do you admire in yourself for considering open adventures?',
        level: 4
    },
    {
        id: 'l4_q14',
        text: 'How do past experiences shape your hopes for swinging in our relationship?',
        level: 4
    },
    {
        id: 'l4_q15',
        text: 'What\'s a deeper dream for swinging you\'ve never voiced?',
        level: 4
    },
    {
        id: 'l4_q16',
        text: 'What celebrity embodies a swinging fantasy for you?',
        level: 4
    },
    {
        id: 'l4_q17',
        text: 'If you could have sex anywhere, where—perhaps a libertine club?',
        level: 4
    },
    {
        id: 'l4_q18',
        text: 'Have you fantasized about someone else during sex—what if it led to swinging?',
        level: 4
    }
];