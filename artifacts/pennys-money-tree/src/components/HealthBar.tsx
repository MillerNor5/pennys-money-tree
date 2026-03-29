import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Heart } from 'lucide-react';

export function HealthBar() {
  const { healthPercentage } = useGame();
  
  let barColor = "bg-destructive";
  if (healthPercentage > 20) barColor = "bg-orange-400";
  if (healthPercentage > 40) barColor = "bg-yellow-400";
  if (healthPercentage > 60) barColor = "bg-primary";
  if (healthPercentage > 80) barColor = "bg-accent";

  return (
    <div className="w-full max-w-sm mx-auto mt-6 bg-card p-4 rounded-2xl shadow-sm border border-border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider">
          <Heart size={16} className={healthPercentage > 20 ? 'text-primary' : 'text-destructive'} fill="currentColor" />
          Tree Health
        </div>
        <div className="font-display font-bold text-foreground">
          {Math.round(healthPercentage)}%
        </div>
      </div>
      
      <div className="h-4 w-full bg-muted rounded-full overflow-hidden shadow-inner">
        <motion.div 
          className={`h-full ${barColor} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${healthPercentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
