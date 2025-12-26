'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Clock, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { rewards } from "@/lib/data";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface RewardCardProps {
  expiry: number;
}

const Countdown = ({ expiry }: { expiry: number }) => {
    // Re-using the Countdown from ChallengeCard - could be extracted to a separate component
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        if(!expiry) return;
        const timer = setInterval(() => {
            const now = Date.now();
            const distance = expiry - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, [expiry]);

    return (
        <div className="flex items-center gap-4 text-center">
            <div>
                <span className="text-2xl font-bold font-headline">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="block text-xs text-muted-foreground">Hours</span>
            </div>
            <div>
                <span className="text-2xl font-bold font-headline">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="block text-xs text-muted-foreground">Minutes</span>
            </div>
            <div>
                <span className="text-2xl font-bold font-headline">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="block text-xs text-muted-foreground">Seconds</span>
            </div>
        </div>
    );
};

const StarRating = ({ reward, onRate }: { reward: string, onRate: (rating: number) => void }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        const storedRatings = JSON.parse(localStorage.getItem('rewardRatings') || '{}');
        setRating(storedRatings[reward] || 0);
    }, [reward]);

    const handleRate = (newRating: number) => {
        setRating(newRating);
        onRate(newRating);
    };

    return (
        <div className="flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        "h-8 w-8 cursor-pointer transition-colors",
                        (hoverRating || rating) > i ? "text-yellow-400 fill-current" : "text-gray-400"
                    )}
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleRate(i + 1)}
                />
            ))}
        </div>
    );
};

export function RewardCard({ expiry }: RewardCardProps) {
    const [reward, setReward] = useState('');
    const rewardImage = placeholderImages.find(p => p.imageHint.includes('gift'));

    useEffect(() => {
        // Pick a random reward. Store it in state so it doesn't change on re-render.
        setReward(rewards[Math.floor(Math.random() * rewards.length)]);
    }, []);

    const handleRateReward = (rating: number) => {
        const storedRatings = JSON.parse(localStorage.getItem('rewardRatings') || '{}');
        storedRatings[reward] = rating;
        localStorage.setItem('rewardRatings', JSON.stringify(storedRatings));
    };

    if (!rewardImage) return null;

    return (
        <Card className="w-full max-w-3xl mx-auto overflow-hidden shadow-2xl border-accent animate-in fade-in-50 zoom-in-90 duration-500">
             <div className="relative h-64 w-full">
                <Image
                    src={rewardImage.imageUrl}
                    alt={rewardImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={rewardImage.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                    <CardTitle className="font-headline text-3xl text-white drop-shadow-lg flex items-center gap-3">
                        <Gift className="h-8 w-8 text-accent"/>
                        Congratulations!
                    </CardTitle>
                </div>
            </div>
            <CardContent className="p-6 text-center space-y-6">
                <CardDescription className="text-lg">You've unlocked a special reward!</CardDescription>
                <p className="text-2xl lg:text-3xl font-headline text-accent leading-relaxed">
                    "{reward}"
                </p>
                <div className="flex flex-col items-center gap-4 pt-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-5 w-5" />
                        <span>Claim it before it expires!</span>
                    </div>
                    <Countdown expiry={expiry} />
                </div>
            </CardContent>
             <CardFooter className="p-6 bg-muted/50 flex flex-col items-center justify-center gap-4">
                <p className="text-sm text-muted-foreground">How much did you enjoy this reward?</p>
                <StarRating reward={reward} onRate={handleRateReward} />
            </CardFooter>
        </Card>
    );
}
