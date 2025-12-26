'use client';

import { useState, useEffect, useCallback } from 'react';
import { generateWeeklyChallenge } from '@/ai/flows/generate-weekly-challenge';

const CHALLENGE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
const REWARD_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms

export type ChallengeCategory = 'love' | 'adventurous' | 'sexy';

export interface Challenge {
  text: string;
  spicyLevel: number;
  persuasionScript: string;
  category: ChallengeCategory;
}

export interface WeeklyChallengeState {
  challenge: Challenge | null;
  expiry: number | null;
  isCompleted: boolean;
  rewardExpiry: number | null;
  isStarted: boolean;
}

export function useWeeklyChallenge() {
  const [state, setState] = useState<WeeklyChallengeState & { isLoading: boolean }>({
    challenge: null,
    expiry: null,
    isCompleted: false,
    rewardExpiry: null,
    isStarted: false,
    isLoading: true,
  });

  const resetChallengeState = useCallback(() => {
    const resetState: WeeklyChallengeState = { 
        challenge: null, 
        expiry: null, 
        isCompleted: false, 
        rewardExpiry: null, 
        isStarted: false 
    };
    localStorage.setItem('weeklyChallengeState', JSON.stringify(resetState));
    setState({ ...resetState, isLoading: false });
  }, []);

  const loadState = useCallback(() => {
    const storedStateJSON = localStorage.getItem('weeklyChallengeState');
    const now = Date.now();

    if (storedStateJSON) {
      const storedState: WeeklyChallengeState = JSON.parse(storedStateJSON);
      
      const isChallengeActive = storedState.expiry && now < storedState.expiry;
      const isRewardActive = storedState.isCompleted && storedState.rewardExpiry && now < storedState.rewardExpiry;

      if (isChallengeActive || isRewardActive) {
        setState({ ...storedState, isLoading: false });
      } else {
        // Challenge or reward has expired, reset to selection screen
        resetChallengeState();
      }
    } else {
      // No state, go to selection screen
      setState(s => ({ ...s, isLoading: false, isStarted: false }));
    }
  }, [resetChallengeState]);

  useEffect(() => {
    loadState();
  }, [loadState]);

  const startNewChallenge = useCallback(async (category: ChallengeCategory) => {
    setState(s => ({ ...s, isLoading: true }));
    try {
      const result = await generateWeeklyChallenge({ category });
      const newExpiry = Date.now() + CHALLENGE_DURATION;
      const newState: WeeklyChallengeState = {
        challenge: result.challenge,
        expiry: newExpiry,
        isCompleted: false,
        rewardExpiry: null,
        isStarted: true,
      };
      localStorage.setItem('weeklyChallengeState', JSON.stringify(newState));
      setState({ ...newState, isLoading: false });
    } catch (error) {
      console.error("Failed to generate challenge:", error);
      resetChallengeState();
    }
  }, [resetChallengeState]);


  const completeChallenge = useCallback(() => {
    if (!state.challenge || !state.expiry) return;

    const now = Date.now();
    const newRewardExpiry = now + REWARD_DURATION;
    const completedState: WeeklyChallengeState = {
      ...state,
      isCompleted: true,
      rewardExpiry: newRewardExpiry,
    };
    localStorage.setItem('weeklyChallengeState', JSON.stringify(completedState));
    
    const historyJSON = localStorage.getItem('challengeHistory');
    const history: { challenge: Challenge, completedAt: number }[] = historyJSON ? JSON.parse(historyJSON) : [];
    const newHistory = [{ challenge: state.challenge, completedAt: now }, ...history];
    localStorage.setItem('challengeHistory', JSON.stringify(newHistory));
    
    setState({ ...completedState, isLoading: false });
  }, [state]);

  const resetChallenge = useCallback(() => {
    if (window.confirm("Are you sure you want to start a new challenge? This will reset your current progress.")) {
      resetChallengeState();
    }
  }, [resetChallengeState]);

  return { ...state, completeChallenge, startNewChallenge, resetChallenge };
}
