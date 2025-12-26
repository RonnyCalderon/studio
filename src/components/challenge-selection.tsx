'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Compass, Flame } from "lucide-react";
import { type ChallengeCategory } from "@/lib/hooks/use-weekly-challenge";

interface ChallengeSelectionProps {
    onSelectCategory: (category: ChallengeCategory) => void;
}

const categoryDetails = {
    love: {
        icon: Heart,
        title: "Love",
        description: "Connect on a deeper, more romantic level.",
        className: "border-pink-500/50 hover:border-pink-500 hover:bg-pink-500/10"
    },
    adventurous: {
        icon: Compass,
        title: "Adventurous",
        description: "Step out of your comfort zone and try something new.",
        className: "border-blue-500/50 hover:border-blue-500 hover:bg-blue-500/10"
    },
    sexy: {
        icon: Flame,
        title: "Sexy",
        description: "Turn up the heat and explore your desires.",
        className: "border-red-500/50 hover:border-red-500 hover:bg-red-500/10"
    }
}

export function ChallengeSelection({ onSelectCategory }: ChallengeSelectionProps) {
    return (
        <div className="container mx-auto py-8 text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">Choose Your Desire</h1>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">A new week, a new invitation to connect. Pick a card to reveal the category of your next challenge.</p>

            <div className="grid md:grid-cols-3 gap-8">
                {(Object.keys(categoryDetails) as ChallengeCategory[]).map(key => {
                    const category = categoryDetails[key];
                    const Icon = category.icon;
                    return (
                        <Card 
                            key={key} 
                            className={`text-center cursor-pointer transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl ${category.className}`}
                            onClick={() => onSelectCategory(key)}
                        >
                            <CardHeader className="items-center">
                                <div className="p-4 bg-muted rounded-full mb-4">
                                   <Icon className="h-10 w-10 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-3xl">{category.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">{category.description}</CardDescription>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}
