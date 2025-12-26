'use client';

import { useState, useEffect, useCallback } from 'react';
import { generateWeeklyChallenge } from '@/ai/flows/generate-weekly-challenge';

const CHALLENGE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in ms
const REWARD_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms

export interface Challenge {
  text: string;
  spicyLevel: number;
}

export interface WeeklyChallengeState {
  challenge: Challenge | null;
  expiry: number | null;
  isCompleted: boolean;
  rewardExpiry: number | null;
}

export function useWeeklyChallenge() {
  const [state, setState] = useState<WeeklyChallengeState & { isLoading: boolean }>({
    challenge: null,
    expiry: null,
    isCompleted: false,
    rewardExpiry: null,
    isLoading: true,
  });

  const getNewChallenge = useCallback(async () => {
    setState(s => ({ ...s, isLoading: true }));
    try {
      const result = await generateWeeklyChallenge();
      const newExpiry = Date.now() + CHALLENGE_DURATION;
      const newState = {
        challenge: result.challenge,
        expiry: newExpiry,
        isCompleted: false,
        rewardExpiry: null,
      };
      localStorage.setItem('weeklyChallengeState', JSON.stringify(newState));
      setState({ ...newState, isLoading: false });
    } catch (error) {
      console.error("Failed to generate challenge:", error);
      setState(s => ({ ...s, isLoading: false, challenge: { text: "Error loading challenge. Try refreshing.", spicyLevel: 1 } }));
    }
  }, []);

  useEffect(() => {
    const storedStateJSON = localStorage.getItem('weeklyChallengeState');
    const now = Date.now();

    if (storedStateJSON) {
      const storedState: WeeklyChallengeState = JSON.parse(storedStateJSON);
      if (storedState.expiry && now > storedState.expiry) {
        // Handle expiration of a reward period
        if (storedState.isCompleted && storedState.rewardExpiry && now > storedState.rewardExpiry) {
            getNewChallenge();
        } else if (!storedState.isCompleted) {
            getNewChallenge();
        } else {
             setState({ ...storedState, isLoading: false });
        }
      } else {
        setState({ ...storedState, isLoading: false });
      }
    } else {
      getNewChallenge();
    }
  }, [getNewChallenge]);

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

  return { ...state, completeChallenge, getNewChallenge };
}
