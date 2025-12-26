'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Trophy, Flame } from "lucide-react";
import { type Challenge } from "@/lib/hooks/use-weekly-challenge";

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


export default function HistoryPage() {
    const [history, setHistory] = useState<CompletedChallenge[]>([]);

    useEffect(() => {
        const storedHistory = localStorage.getItem('challengeHistory');
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
        }
    }, []);

    return (
        <div className="container mx-auto py-8">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-8">Our Journey</h1>
            
            {history.length === 0 ? (
                <Card className="text-center p-12">
                    <Trophy className="h-16 w-16 mx-auto text-muted-foreground mb-4"/>
                    <CardTitle className="font-headline text-2xl mb-2">No Challenges Completed Yet</CardTitle>
                    <CardDescription>Complete your first weekly challenge to start your journey!</CardDescription>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {history.map((item, index) => (
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
    );
}
