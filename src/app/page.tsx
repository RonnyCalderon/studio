'use client';

import { useState } from "react";
import { ChallengeCard } from "@/components/challenge-card";
import { RewardCard } from "@/components/reward-card";
import { useWeeklyChallenge, type ChallengeCategory } from "@/lib/hooks/use-weekly-challenge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { ChallengeSelection } from "@/components/challenge-selection";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { useUser } from "@/context/user-provider";

export default function DashboardPage() {
  const { partnerName } = useUser();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { 
    challenge, 
    expiry, 
    isCompleted, 
    rewardExpiry, 
    isLoading,
    isStarted,
    completeChallenge,
    startNewChallenge,
    resetChallenge,
    resetChallengeState,
    beginChallenge,
  } = useWeeklyChallenge();

  const now = Date.now();
  const isRewardActive = isCompleted && rewardExpiry && now < rewardExpiry;
  
  const handleConfirmComplete = () => {
    setShowConfirmation(false);
    completeChallenge();
  };

  const handleSelectCategory = async (category: ChallengeCategory) => {
    await startNewChallenge(category);
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
  
  if (!isStarted) {
    return <ChallengeSelection onSelectCategory={handleSelectCategory} />;
  }

  const mainTitle = isRewardActive
    ? "Your Reward"
    : partnerName 
    ? `An Invitation for ${partnerName}`
    : "This Week's Invitation";

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
              {mainTitle}
          </h1>
          {challenge && !isRewardActive && (
            <Button onClick={resetChallenge} variant="outline" size="icon" aria-label="Get new challenge">
                <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>

        {isRewardActive ? (
          <RewardCard expiry={rewardExpiry!} onRewardEnd={resetChallengeState} onNewChallengeClick={resetChallengeState} />
        ) : (
          challenge && (
            <ChallengeCard 
              challenge={challenge}
              expiry={expiry}
              onComplete={() => setShowConfirmation(true)}
              onStart={beginChallenge}
              isCompleted={isCompleted}
            />
          )
        )}
      </div>
      
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline text-2xl">Challenge Conquered!</AlertDialogTitle>
            <AlertDialogDescription className="text-base pt-2">
              You've proven once again how deeply connected and adventurous you both are. 
              Confirming this step unlocks your reward and continues your journey deeper. Are you ready?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Not Yet</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmComplete} className="bg-accent hover:bg-accent/90">
              Claim Reward
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
