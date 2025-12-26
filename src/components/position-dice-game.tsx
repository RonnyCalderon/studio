'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { sexPositions, SexPosition } from '@/lib/sex-positions';
import { Dice6 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import './position-dice-game.css';

const Dice = ({ face, isRolling }: { face: number, isRolling: boolean }) => {
  return (
    <div className="scene">
      <div className={cn("cube", isRolling && "is-rolling")} data-face={face}>
        <div className="cube__face cube__face--1">1</div>
        <div className="cube__face cube__face--2">2</div>
        <div className="cube__face cube__face--3">3</div>
        <div className="cube__face cube__face--4">4</div>
        <div className="cube__face cube__face--5">5</div>
        <div className="cube__face cube__face--6">6</div>
      </div>
    </div>
  );
};

export function PositionDiceGame() {
  const [isRolling, setIsRolling] = useState(false);
  const [currentFace, setCurrentFace] = useState(1);
  const [position, setPosition] = useState<SexPosition | null>(null);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    setPosition(null);

    // Simulate rolling
    const randomFace = Math.floor(Math.random() * 6) + 1;
    
    // Pick a random position
    const randomPositionIndex = Math.floor(Math.random() * sexPositions.length);
    const newPosition = sexPositions[randomPositionIndex];

    setTimeout(() => {
      setCurrentFace(randomFace);
      setPosition(newPosition);
      setIsRolling(false);
    }, 1500); // Match CSS animation duration
  };

  return (
    <Card className="w-full max-w-md mx-auto text-center">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Position Dice</CardTitle>
        <CardDescription>Roll the die to let fate pick a position for you.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8">
        <Dice face={currentFace} isRolling={isRolling} />
        {position && (
            <Card className="w-full animate-in fade-in-50 duration-500">
                <CardHeader>
                    <Image 
                        src={position.image.imageUrl}
                        alt={position.name}
                        width={400}
                        height={250}
                        className="rounded-lg object-cover aspect-video w-full"
                        data-ai-hint={position.image.imageHint}
                        unoptimized
                    />
                </CardHeader>
                <CardContent>
                    <h3 className="font-headline text-2xl text-primary">{position.name}</h3>
                    <p className="text-muted-foreground mt-1">{position.description}</p>
                </CardContent>
            </Card>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={rollDice} disabled={isRolling} className="w-full">
          <Dice6 className="mr-2 h-4 w-4" />
          {isRolling ? 'Rolling...' : 'Roll the Die'}
        </Button>
      </CardFooter>
    </Card>
  );
}
