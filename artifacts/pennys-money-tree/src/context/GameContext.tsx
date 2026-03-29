import React, { createContext, useContext, useState, ReactNode } from 'react';
import { scenes, Scene, Choice } from '../data/story';

type GamePhase = 'playing' | 'reaction' | 'end';

interface DecisionRecord {
  scene: Scene;
  choice: Choice;
}

interface GameContextType {
  sceneIndex: number;
  currentScene: Scene;
  phase: GamePhase;
  reactionText: string | null;
  history: DecisionRecord[];
  progress: number;
  makeChoice: (choice: Choice) => void;
  resetGame: () => void;
}

// Progress range: 0 to MAX_PROGRESS
// Starts at INITIAL_PROGRESS (seed has just sprouted)
export const MAX_PROGRESS = 20;
export const INITIAL_PROGRESS = 4;

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [phase, setPhase] = useState<GamePhase>('playing');
  const [reactionText, setReactionText] = useState<string | null>(null);
  const [history, setHistory] = useState<DecisionRecord[]>([]);
  const [progress, setProgress] = useState(INITIAL_PROGRESS);

  const currentScene = scenes[sceneIndex];

  const resetGame = () => {
    setSceneIndex(0);
    setPhase('playing');
    setReactionText(null);
    setHistory([]);
    setProgress(INITIAL_PROGRESS);
  };

  const makeChoice = (choice: Choice) => {
    if (phase !== 'playing') return;

    setHistory(prev => [...prev, { scene: currentScene, choice }]);
    setReactionText(choice.reaction);
    setPhase('reaction');

    // Update progress, clamped to [0, MAX_PROGRESS]
    setProgress(prev => Math.min(MAX_PROGRESS, Math.max(0, prev + choice.delta)));

    setTimeout(() => {
      const next = sceneIndex + 1;
      if (next >= scenes.length) {
        setPhase('end');
      } else {
        setSceneIndex(next);
        setReactionText(null);
        setPhase('playing');
      }
    }, 2000);
  };

  return (
    <GameContext.Provider
      value={{
        sceneIndex,
        currentScene,
        phase,
        reactionText,
        history,
        progress,
        makeChoice,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
};
