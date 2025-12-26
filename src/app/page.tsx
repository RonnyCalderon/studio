'use client';

import { ChallengeCard } from "@/components/challenge-card";
import { RewardCard } from "@/components/reward-card";
import { useWeeklyChallenge } from "@/lib/hooks/use-weekly-challenge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const { 
    challenge, 
    expiry, 
    isCompleted, 
    rewardExpiry, 
    isLoading,
    completeChallenge,
    getNewChallenge
  } = useWeeklyChallenge();

  const now = Date.now();
  const isRewardActive = isCompleted && rewardExpiry && now < rewardExpiry;
  
  const handleComplete = () => {
    if (window.confirm("Have you and your partner truly completed this challenge?")) {
      completeChallenge();
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">This Week's Invitation</h1>
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-48 mt-6" />
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            {isRewardActive ? "Your Reward" : "This Week's Invitation"}
        </h1>
        <Button onClick={() => getNewChallenge()} variant="outline" size="icon" aria-label="Get new challenge">
            <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {isRewardActive ? (
        <RewardCard expiry={rewardExpiry!} />
      ) : (
        challenge && expiry && (
          <ChallengeCard 
            challenge={challenge}
            expiry={expiry}
            onComplete={handleComplete}
            isCompleted={isCompleted}
          />
        )
      )}
    </div>
  );
}
