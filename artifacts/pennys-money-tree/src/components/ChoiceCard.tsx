import React from 'react';
import { motion } from 'framer-motion';
import { Choice } from '../data/story';
import { useGame } from '../context/GameContext';
import { Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface ChoiceCardProps {
  choice: Choice;
  index: number;
}

export function ChoiceCard({ choice, index }: ChoiceCardProps) {
  const { makeChoice, phase } = useGame();
  const disabled = phase !== 'playing';
  const isTempting = choice.style === 'tempting';

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => makeChoice(choice)}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={cn(
        "w-full text-left p-5 rounded-2xl shadow-sm border-2 transition-all duration-200 relative overflow-hidden group",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        isTempting 
          ? "bg-gradient-to-r from-pink-50 to-orange-50 hover:from-pink-100 hover:to-orange-100 border-pink-200 hover:border-pink-300 hover:shadow-md" 
          : "bg-card hover:bg-muted/50 border-transparent hover:border-primary/20 hover:shadow-md"
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-display font-bold text-lg",
          isTempting ? "bg-pink-100 text-pink-600" : "bg-primary/10 text-primary"
        )}>
          {String.fromCharCode(65 + index)}
        </div>
        
        <span className={cn(
          "font-semibold text-lg pr-8 leading-snug",
          isTempting ? "text-pink-900" : "text-foreground"
        )}>
          {choice.text}
        </span>
      </div>

      {isTempting && (
        <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-400 opacity-50 group-hover:opacity-100 transition-opacity" />
      )}
      
      {!disabled && !isTempting && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
          <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity font-bold">→</span>
        </div>
      )}
    </motion.button>
  );
}
