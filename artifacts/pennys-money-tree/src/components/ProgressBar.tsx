import React from 'react';
import { useGame } from '../context/GameContext';
import { scenes } from '../data/story';
import { motion } from 'framer-motion';

export function ProgressBar() {
  const { currentScene } = useGame();
  
  // Total unique steps based on stepNumber
  const totalSteps = Math.max(...scenes.map(s => s.stepNumber));
  const currentStep = currentScene.stepNumber;

  return (
    <div className="w-full px-4 py-6 flex flex-col items-center gap-2">
      <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
        Step {currentStep} of {totalSteps}
      </div>
      <div className="flex gap-1 sm:gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepIndex = i + 1;
          const isPast = stepIndex < currentStep;
          const isCurrent = stepIndex === currentStep;
          
          return (
            <div key={i} className="relative w-6 h-2 sm:w-8 sm:h-3 rounded-full bg-muted overflow-hidden">
              {(isPast || isCurrent) && (
                <motion.div 
                  className="absolute inset-0 bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
