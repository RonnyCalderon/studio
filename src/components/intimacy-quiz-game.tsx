'use client';

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { intimacyQuestions, type IntimacyQuestion } from '@/lib/intimacy-quiz';
import { RefreshCw, Sparkles, ArrowRight, Trophy } from 'lucide-react';
import { smartShuffle } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const QUESTIONS_PER_LEVEL = 8;
const MAX_LEVEL = 4;

interface QuizState {
  level: number;
  answeredInLevel: number;
}

export function IntimacyQuizGame() {
  const [currentQuestion, setCurrentQuestion] = useState<IntimacyQuestion | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({ level: 1, answeredInLevel: 0 });
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const getNextQuestion = useCallback(() => {
    if (showLevelUp || isCompleted) return;

    let { level, answeredInLevel } = quizState;

    if (answeredInLevel >= QUESTIONS_PER_LEVEL) {
      if (level < MAX_LEVEL) {
        setShowLevelUp(true);
      } else {
        setIsCompleted(true);
        localStorage.removeItem('quizState'); // Clear state after completion
      }
      return;
    }

    const questionsForLevel = intimacyQuestions.filter(q => q.level === level);
    const shuffleKey = `intimacyQuestions_level_${level}`;
    const nextQuestion = smartShuffle(shuffleKey, questionsForLevel);
    
    const newAnsweredCount = answeredInLevel + 1;
    const newState = { ...quizState, answeredInLevel: newAnsweredCount };

    setCurrentQuestion(nextQuestion);
    setQuizState(newState);
    localStorage.setItem('quizState', JSON.stringify(newState));
  }, [quizState, showLevelUp, isCompleted]);

  useEffect(() => {
    const savedStateJSON = localStorage.getItem('quizState');
    if (savedStateJSON) {
        try {
            const savedState = JSON.parse(savedStateJSON);
            if(savedState.level && savedState.answeredInLevel) {
                 // Check if the saved level is already completed
                if (savedState.answeredInLevel >= QUESTIONS_PER_LEVEL) {
                    if (savedState.level < MAX_LEVEL) {
                        setShowLevelUp(true);
                    } else {
                        setIsCompleted(true);
                    }
                }
                setQuizState(savedState);
                return; // State is loaded, exit early
            }
        } catch(e) {
            console.error("Failed to parse quiz state", e);
            localStorage.removeItem('quizState');
        }
    }
    // Get first question if no saved state
    getNextQuestion();
  }, []); // Run only on mount

  const handleLevelUp = () => {
    const newLevel = quizState.level + 1;
    const newState = { level: newLevel, answeredInLevel: 0 };
    setQuizState(newState);
    localStorage.setItem('quizState', JSON.stringify(newState));
    setShowLevelUp(false);
    // Automatically draw the first question of the new level
    const questionsForLevel = intimacyQuestions.filter(q => q.level === newLevel);
    const shuffleKey = `intimacyQuestions_level_${newLevel}`;
    const nextQuestion = smartShuffle(shuffleKey, questionsForLevel);
    setCurrentQuestion(nextQuestion);
  };
  
  const handleReset = () => {
    localStorage.removeItem('quizState');
    for (let i = 1; i <= MAX_LEVEL; i++) {
        localStorage.removeItem(`intimacyQuestions_level_${i}`);
    }
    setQuizState({ level: 1, answeredInLevel: 0 });
    setShowLevelUp(false);
    setIsCompleted(false);
    // This part is tricky; we need to re-trigger the first question logic.
    // A simple way is to reload or call a setup function.
    // For simplicity here, we'll just reload the component state and call getNextQuestion
    // which requires a temporary state change to work with useEffect dependency.
    // A cleaner approach might involve a dedicated reset function.
    window.location.reload();
  };

  const renderContent = () => {
    if (isCompleted) {
      return (
        <div className="text-center p-6 flex flex-col items-center">
            <Trophy className="h-16 w-16 text-yellow-500 mb-4" />
            <h3 className="text-2xl font-headline text-primary mb-2">Journey Complete</h3>
            <p className="text-muted-foreground">You've explored the depths of your connection. The journey of discovery never truly ends. Play again to uncover new layers.</p>
        </div>
      );
    }
    if (showLevelUp) {
      return (
        <div className="text-center p-6">
            <h3 className="text-2xl font-headline text-accent mb-2">Level {quizState.level} Complete!</h3>
            <p className="text-muted-foreground">You've built a stronger foundation. The next stage of your journey awaits. Are you ready to go deeper?</p>
        </div>
      );
    }
    return (
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
    );
  };

  const renderFooter = () => {
      if (isCompleted) {
        return (
            <Button onClick={handleReset} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Play Again
            </Button>
        );
      }
      if (showLevelUp) {
        return (
            <Button onClick={handleLevelUp} className="w-full bg-accent hover:bg-accent/90">
                Proceed to Level {quizState.level + 1}
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        );
      }
      return (
        <div className='w-full flex flex-col sm:flex-row gap-2'>
            <Button onClick={getNextQuestion} className="w-full">
              Draw Next Question
            </Button>
            <Button onClick={handleReset} variant="outline" size="icon" className='shrink-0'>
                <RefreshCw className="h-4 w-4" />
            </Button>
        </div>
      );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto text-center overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-3xl flex items-center justify-center gap-2">
          <Sparkles className="text-accent" />
          Invitation to Share (Level {quizState.level})
        </CardTitle>
        <CardDescription>Draw a card, take a breath, and answer openly. This is a space for honesty without judgment.</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[200px] flex items-center justify-center p-6">
        {renderContent()}
      </CardContent>
      <CardFooter>
        {renderFooter()}
      </CardFooter>
    </Card>
  );
}
