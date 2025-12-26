'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { loveDiceActions, loveDiceBodyParts } from '@/lib/love-dice';
import { Dices } from 'lucide-react';
import { cn } from '@/lib/utils';
import './position-dice-game.css';

const Dice = ({ face, isRolling, className }: { face: number, isRolling: boolean, className?: string }) => {
  return (
    <div className={cn("scene", className)}>
      <div className={cn("cube", isRolling && "is-rolling")} data-face={face}>
        <div className="cube__face cube__face--1">{loveDiceActions[0]}</div>
        <div className="cube__face cube__face--2">{loveDiceActions[1]}</div>
        <div className="cube__face cube__face--3">{loveDiceActions[2]}</div>
        <div className="cube__face cube__face--4">{loveDiceActions[3]}</div>
        <div className="cube__face cube__face--5">{loveDiceActions[4]}</div>
        <div className="cube__face cube__face--6">{loveDiceActions[5]}</div>
      </div>
    </div>
  );
};

const BodyPartDice = ({ face, isRolling, className }: { face: number, isRolling: boolean, className?: string }) => {
  return (
    <div className={cn("scene", className)}>
      <div className={cn("cube", isRolling && "is-rolling")} data-face={face}>
        <div className="cube__face cube__face--1">{loveDiceBodyParts[0]}</div>
        <div className="cube__face cube__face--2">{loveDiceBodyParts[1]}</div>
        <div className="cube__face cube__face--3">{loveDiceBodyParts[2]}</div>
        <div className="cube__face cube__face--4">{loveDiceBodyParts[3]}</div>
        <div className="cube__face cube__face--5">{loveDiceBodyParts[4]}</div>
        <div className="cube__face cube__face--6">{loveDiceBodyParts[5]}</div>
      </div>
    </div>
  );
}


export function PositionDiceGame() {
  const [isRolling, setIsRolling] = useState(false);
  const [actionFace, setActionFace] = useState(1);
  const [bodyPartFace, setBodyPartFace] = useState(1);
  const [result, setResult] = useState<{ action: string; bodyPart: string } | null>(null);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    setResult(null);

    const randomActionFace = Math.floor(Math.random() * 6) + 1;
    const randomBodyPartFace = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {
      setActionFace(randomActionFace);
      setBodyPartFace(randomBodyPartFace);
      setResult({
        action: loveDiceActions[randomActionFace - 1],
        bodyPart: loveDiceBodyParts[randomBodyPartFace - 1],
      });
      setIsRolling(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto text-center">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Love Dice</CardTitle>
        <CardDescription>Roll the dice to discover a new sensual combination.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8">
        <div className="flex justify-center items-center gap-8">
            <Dice face={actionFace} isRolling={isRolling} />
            <BodyPartDice face={bodyPartFace} isRolling={isRolling} />
        </div>
        {result && !isRolling && (
            <div className="text-center animate-in fade-in-50 duration-500">
                <h3 className="font-headline text-2xl md:text-3xl text-primary">
                    {result.action} <span className="text-foreground">&</span> {result.bodyPart}
                </h3>
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={rollDice} disabled={isRolling} className="w-full">
          <Dices className="mr-2 h-4 w-4" />
          {isRolling ? 'Rolling...' : 'Roll the Dice'}
        </Button>
      </CardFooter>
    </Card>
  );
}
