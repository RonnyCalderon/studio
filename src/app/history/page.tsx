'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Trophy } from "lucide-react";

interface CompletedChallenge {
    challenge: string;
    completedAt: number;
}

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
                                <CardDescription>
                                    {format(new Date(item.completedAt), "MMMM d, yyyy")}
                                </CardDescription>
                                <CardTitle className="font-body text-lg leading-snug">
                                    "{item.challenge}"
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
