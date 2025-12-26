'use client';

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { intimacyQuestions, type IntimacyQuestion } from '@/lib/intimacy-quiz';
import { RefreshCw, Sparkles } from 'lucide-react';
import { smartShuffle } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export function IntimacyQuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState<IntimacyQuestion | null>(null);

  const getNextQuestion = useCallback(() => {
    const nextQuestion = smartShuffle('intimacyQuestions', intimacyQuestions);
    setCurrentQuestion(nextQuestion);
  }, []);

  useEffect(() => {
    // Load the first question on component mount
    getNextQuestion();
  }, [getNextQuestion]);

  return (
    <Card className="w-full max-w-2xl mx-auto text-center overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-3xl flex items-center justify-center gap-2">
          <Sparkles className="text-accent" />
          Invitation to Share
        </CardTitle>
        <CardDescription>Draw a card, take a breath, and answer openly. This is a space for honesty without judgment.</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[200px] flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <p className="text-xl md:text-2xl font-body leading-relaxed text-foreground">
                "{currentQuestion.text}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter>
        <Button onClick={getNextQuestion} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Draw Next Question
        </Button>
      </CardFooter>
    </Card>
  );
}
