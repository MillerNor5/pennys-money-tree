import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

export function GrandpaBubble() {
  const { currentScene, phase, reactionText, profile, health } = useGame();
  
  const textToShow = phase === 'reaction' && reactionText 
    ? reactionText 
    : currentScene.text(profile, health);

  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="shrink-0 relative">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-card shadow-lg border-4 border-white flex items-center justify-center overflow-hidden">
          <img 
            src={`${import.meta.env.BASE_URL}images/grandpa-sam.png`} 
            alt="Grandpa Sam"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to emoji if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<span class="text-4xl">👴</span>';
            }}
          />
        </div>
        {phase === 'reaction' && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-sm border-2 border-white"
          >
            ✨
          </motion.div>
        )}
      </div>
      
      <div className="flex-1 bg-card rounded-2xl rounded-tl-none p-5 sm:p-6 shadow-md border border-border/50 relative mt-2">
        {/* Speech bubble tail */}
        <div className="absolute top-0 -left-3 w-4 h-4 bg-card border-l border-t border-border/50 rounded-tl shadow-[-2px_-2px_4px_rgba(0,0,0,0.02)]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
        
        <AnimatePresence mode="wait">
          <motion.p 
            key={textToShow}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-lg md:text-xl font-medium text-foreground leading-relaxed"
          >
            {textToShow}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
