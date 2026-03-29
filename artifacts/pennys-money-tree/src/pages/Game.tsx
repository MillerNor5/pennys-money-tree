import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { scenes } from '../data/story';
import { cn } from '../lib/utils';
import { Sparkles } from 'lucide-react';
import { TreeProgressBar } from '../components/TreeProgressBar';

export default function Game() {
  const { currentScene, phase, reactionText, history, makeChoice, resetGame, sceneIndex } = useGame();

  if (phase === 'end') {
    const goodCount = history.filter(h => h.choice.value === 'good').length;
    const badCount = history.filter(h => h.choice.value === 'bad').length;

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full"
        >
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🌳</div>
            <h1 className="text-4xl font-display text-foreground font-bold mb-2">
              All done, Maya!
            </h1>
            <p className="text-muted-foreground text-lg">Here's how Penny did:</p>
          </div>

          <div className="flex gap-4 justify-center mb-8">
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl px-8 py-5 text-center">
              <div className="text-3xl font-bold text-green-600">{goodCount}</div>
              <div className="text-green-700 font-medium text-sm mt-1">Great choices</div>
            </div>
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl px-8 py-5 text-center">
              <div className="text-3xl font-bold text-red-500">{badCount}</div>
              <div className="text-red-600 font-medium text-sm mt-1">Tough choices</div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 mb-6 space-y-3">
            {history.map(({ scene, choice }, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className={cn(
                  "mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0 font-bold",
                  choice.value === 'good' ? 'bg-green-100 text-green-600' :
                  choice.value === 'bad' ? 'bg-red-100 text-red-500' :
                  'bg-yellow-100 text-yellow-600'
                )}>
                  {choice.value === 'good' ? '✓' : choice.value === 'bad' ? '✗' : '~'}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{choice.text}</p>
                  <p className="text-xs text-muted-foreground">{choice.reaction}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={resetGame}
            className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl text-lg hover:opacity-90 transition-opacity"
          >
            Play Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-xl w-full">

        {/* Tree progress bar */}
        <TreeProgressBar />

        {/* Scenario card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Question {sceneIndex + 1} of {scenes.length}
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-8 leading-snug">
              {currentScene.scenario}
            </h2>

            {/* Reaction overlay */}
            <AnimatePresence>
              {phase === 'reaction' && reactionText && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-primary/10 border border-primary/20 rounded-2xl px-5 py-4 mb-6 flex items-start gap-3"
                >
                  <span className="text-xl mt-0.5">👴</span>
                  <p className="text-base font-medium text-foreground">{reactionText}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Choice buttons */}
            <div className="flex flex-col gap-3">
              {currentScene.choices.map((choice, i) => {
                const isTempting = choice.style === 'tempting';
                return (
                  <motion.button
                    key={choice.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => makeChoice(choice)}
                    disabled={phase !== 'playing'}
                    className={cn(
                      "w-full text-left px-5 py-5 rounded-2xl border-2 font-semibold text-base transition-all duration-150 relative",
                      "disabled:opacity-40 disabled:cursor-not-allowed",
                      isTempting
                        ? "bg-orange-50 border-orange-200 text-orange-900 hover:bg-orange-100 hover:border-orange-300 hover:shadow-md"
                        : "bg-card border-border text-foreground hover:border-primary/40 hover:bg-primary/5 hover:shadow-md"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center font-bold text-base shrink-0",
                        isTempting ? "bg-orange-100 text-orange-500" : "bg-muted text-muted-foreground"
                      )}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="leading-snug flex-1">{choice.text}</span>
                      {isTempting && (
                        <Sparkles size={16} className="text-orange-400 shrink-0" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
