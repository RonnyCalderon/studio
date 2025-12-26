'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Trophy, Flame } from "lucide-react";
import { type Challenge } from "@/lib/hooks/use-weekly-challenge";
import { levels, type Level } from "@/lib/levels";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useUser } from "@/context/user-provider";

interface CompletedChallenge {
    challenge: Challenge;
    completedAt: number;
}

const SpicyLevel = ({ level }: { level: number }) => {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
                <Flame key={i} className={`h-4 w-4 ${i < level ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
            ))}
        </div>
    );
};

const getCurrentLevel = (completedCount: number): [Level | null, Level | null] => {
    const sortedLevels = [...levels].sort((a, b) => a.threshold - b.threshold);
    let currentLevel: Level | null = null;
    let nextLevel: Level | null = null;

    for (let i = 0; i < sortedLevels.length; i++) {
        if (completedCount >= sortedLevels[i].threshold) {
            currentLevel = sortedLevels[i];
        } else {
            nextLevel = sortedLevels[i];
            break;
        }
    }
    return [currentLevel, nextLevel];
};

export default function HistoryPage() {
    const { userName, partnerName } = useUser();
    const [history, setHistory] = useState<CompletedChallenge[]>([]);
    const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
    const [nextLevel, setNextLevel] = useState<Level | null>(null);

    useEffect(() => {
        const storedHistory = localStorage.getItem('challengeHistory');
        if (storedHistory) {
            const parsedHistory: CompletedChallenge[] = JSON.parse(storedHistory);
            const sortedHistory = parsedHistory.sort((a, b) => a.completedAt - b.completedAt);
            setHistory(sortedHistory);
            const [current, next] = getCurrentLevel(sortedHistory.length);
            setCurrentLevel(current);
            setNextLevel(next);
        }
    }, []);

    const completedCount = history.length;
    const progress = nextLevel && currentLevel 
        ? Math.round(((completedCount - (currentLevel.threshold - 1)) / (nextLevel.threshold - (currentLevel.threshold - 1))) * 100)
        : completedCount > 0 ? 100 : 0;
    
    const unlockedLevels = levels.filter(l => l.threshold <= completedCount);
    const lockedLevels = levels.filter(l => l.threshold > completedCount);

    const getChallengesForLevel = (level: Level) => {
        const levelIndex = levels.findIndex(l => l.level === level.level);
        const prevLevelThreshold = levelIndex > 0 ? levels[levelIndex - 1].threshold : 0;
        // The history is sorted oldest to newest.
        return history.slice(prevLevelThreshold, level.threshold);
    };

    const pageTitle = userName && partnerName ? `${userName} & ${partnerName}'s Journey` : "Our Journey";

    return (
        <div className="container mx-auto py-8 space-y-8">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-2">{pageTitle}</h1>
            <p className="text-muted-foreground">A record of our shared adventures and growth.</p>

            {currentLevel && (
                <Card className="bg-gradient-to-br from-card to-muted/50 border-accent/50 shadow-lg">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                           <currentLevel.icon className="h-12 w-12 text-accent" />
                           <div>
                                <CardDescription>Current Rank</CardDescription>
                                <CardTitle className="font-headline text-3xl text-accent">{currentLevel.title}</CardTitle>
                           </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="italic text-muted-foreground">"{currentLevel.description}"</p>
                        {nextLevel ? (
                            <div>
                                <div className="flex justify-between items-center mb-2 text-sm">
                                    <span className="font-medium text-foreground/80">Progress to <span className="font-bold text-accent">{nextLevel.title}</span></span>
                                    <span className="font-bold">{completedCount} / {nextLevel.threshold}</span>
                                </div>
                                <Progress value={progress} className="h-3" />
                            </div>
                        ) : (
                             <div className="text-center text-accent font-bold flex items-center justify-center gap-2">
                                <Trophy /> You've reached the highest level of mastery!
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            <div className="space-y-4">
                <h2 className="font-headline text-2xl">Unlocked Ranks</h2>
                {unlockedLevels.length > 0 ? (
                    <Accordion type="multiple" className="space-y-2">
                        {unlockedLevels.map(level => (
                            <AccordionItem key={level.level} value={`level-${level.level}`} className="border-b-0">
                               <Card className="bg-card/80">
                                <AccordionTrigger className="p-4 hover:no-underline">
                                     <div className="flex items-center text-left">
                                        <level.icon className="h-6 w-6 mr-4 text-primary" />
                                        <div className="flex-grow">
                                            <p className="font-bold">{level.title}</p>
                                            <p className="text-xs text-muted-foreground">Unlocked at {level.threshold} challenges</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-4">
                                    <div className="space-y-4">
                                        <p className="italic text-muted-foreground">"{level.description}"</p>
                                        <div>
                                            <h4 className="font-semibold mb-2">Completed Steps on this Path:</h4>
                                            <div className="grid gap-2">
                                                {getChallengesForLevel(level).map((item, index) => (
                                                    <div key={index} className="text-sm p-2 bg-background/50 rounded-md">
                                                        - "{item.challenge.text}"
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                               </Card>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : <p className="text-sm text-muted-foreground">Complete a challenge to unlock your first rank.</p>}
            </div>

            {lockedLevels.length > 0 && (
                <div className="space-y-4">
                    <h2 className="font-headline text-2xl">The Path Ahead</h2>
                     <Accordion type="multiple" className="space-y-2">
                        {lockedLevels.map(level => (
                            <AccordionItem key={level.level} value={`level-${level.level}`} className="border-b-0">
                                <Card className="bg-muted/20 opacity-70 hover:opacity-100 transition-opacity">
                                    <AccordionTrigger className="p-4 hover:no-underline">
                                        <div className="flex items-center text-left">
                                            <level.icon className="h-6 w-6 mr-4 text-muted-foreground" />
                                            <div className="flex-grow">
                                                <p className="font-bold text-muted-foreground">{level.title}</p>
                                                <p className="text-xs text-muted-foreground">Unlocks at {level.threshold} challenges</p>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4">
                                        <p className="italic text-muted-foreground">"{level.description}"</p>
                                    </AccordionContent>
                                </Card>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            )}


            <div>
                 <h2 className="font-headline text-2xl mb-4 mt-12">Completed Challenges Log ({completedCount})</h2>
                {history.length === 0 ? (
                    <Card className="text-center p-12">
                        <Trophy className="h-16 w-16 mx-auto text-muted-foreground mb-4"/>
                        <CardTitle className="font-headline text-2xl mb-2">No Challenges Completed Yet</CardTitle>
                        <CardDescription>Your adventure log is waiting for its first entry.</CardDescription>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {history.slice().reverse().map((item, index) => (
                            <Card key={index} className="flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardDescription>
                                            {format(new Date(item.completedAt), "MMMM d, yyyy")}
                                        </CardDescription>
                                        {item.challenge.spicyLevel && <SpicyLevel level={item.challenge.spicyLevel} />}
                                    </div>
                                    <CardTitle className="font-body text-lg leading-snug pt-2">
                                        "{item.challenge.text}"
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow flex items-end justify-end">
                                    <Trophy className="h-6 w-6 text-yellow-500"/>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
