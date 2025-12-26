'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScratchCardGame } from "@/components/scratch-card-game";
import { PositionDiceGame } from "@/components/position-dice-game";
import { IntimacyQuizGame } from "@/components/intimacy-quiz-game";
import { Wand, Dice6, HeartHandshake } from "lucide-react";

export default function GamesPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-2">Playground</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Fun and playful ways to spark intimacy. Choose a game and let fate decide your next adventure.
        </p>
      </div>

      <Tabs defaultValue="scratch-card" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scratch-card">
            <Wand className="mr-2 h-5 w-5" />
            Scratch of Fate
          </TabsTrigger>
          <TabsTrigger value="position-dice">
            <Dice6 className="mr-2 h-5 w-5" />
            Love Dice
          </TabsTrigger>
          <TabsTrigger value="intimacy-quiz">
            <HeartHandshake className="mr-2 h-5 w-5" />
            Intimacy Quiz
          </TabsTrigger>
        </TabsList>
        <TabsContent value="scratch-card" className="mt-8">
          <ScratchCardGame />
        </TabsContent>
        <TabsContent value="position-dice" className="mt-8">
          <PositionDiceGame />
        </TabsContent>
        <TabsContent value="intimacy-quiz" className="mt-8">
          <IntimacyQuizGame />
        </TabsContent>
      </Tabs>
    </div>
  );
}
