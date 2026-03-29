import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

export function TreeDisplay() {
  const { healthPercentage } = useGame();

  // Define visual states based on health tiers
  let tier = 1;
  let label = "Oh no...";
  let leafColor = "var(--color-health-low)";
  let leafScale = 0;
  let glow = 0;

  if (healthPercentage > 80) {
    tier = 5;
    label = "The tree is golden!";
    leafColor = "var(--color-health-gold)";
    leafScale = 1.1;
    glow = 15;
  } else if (healthPercentage > 60) {
    tier = 4;
    label = "Looking great!";
    leafColor = "var(--color-health-high)";
    leafScale = 1;
  } else if (healthPercentage > 40) {
    tier = 3;
    label = "Getting better!";
    leafColor = "var(--color-health-med)";
    leafScale = 0.8;
  } else if (healthPercentage > 20) {
    tier = 2;
    label = "Hanging in there";
    leafColor = "var(--color-health-med)";
    leafScale = 0.5;
  }

  // Animation variants for leaves
  const leafVariants = {
    animate: {
      scale: leafScale,
      fill: leafColor,
      filter: `drop-shadow(0px 0px ${glow}px ${leafColor})`,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  // Helper to generate leaf clusters
  const LeafCluster = ({ cx, cy, r, delay }: { cx: number, cy: number, r: number, delay: number }) => (
    <motion.circle
      cx={cx} cy={cy} r={r}
      initial={false}
      variants={leafVariants}
      animate="animate"
      style={{ originX: `${cx}px`, originY: `${cy}px` }}
      transition={{ delay, duration: 1.5, ease: "easeOut" }}
      className="origin-center"
    />
  );

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto flex flex-col items-center justify-center">
      
      {/* Golden Aura Background (only at max tier) */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-accent/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: tier === 5 ? 1 : 0 }}
        transition={{ duration: 2 }}
      />

      <svg viewBox="0 0 200 220" className="w-full h-full drop-shadow-xl z-10 overflow-visible">
        {/* Ground */}
        <ellipse cx="100" cy="200" rx="60" ry="10" fill="hsl(var(--secondary))" opacity="0.3" />
        
        {/* Trunk & Branches */}
        <path 
          d="M 100 200 C 100 150 90 120 70 80 M 100 200 C 100 150 110 120 130 80 M 85 110 C 80 90 60 70 40 60 M 115 110 C 120 90 140 70 160 60 M 100 200 L 100 60" 
          stroke="hsl(var(--secondary))" 
          strokeWidth="12" 
          strokeLinecap="round" 
          fill="none" 
        />
        
        {/* Leaves - Grouped by branch */}
        <g className="leaves">
          {/* Top Cluster */}
          <LeafCluster cx={100} cy={45} r={35} delay={0} />
          <LeafCluster cx={85} cy={60} r={25} delay={0.1} />
          <LeafCluster cx={115} cy={60} r={25} delay={0.2} />
          
          {/* Left Branch */}
          <LeafCluster cx={70} cy={75} r={28} delay={0.15} />
          <LeafCluster cx={45} cy={60} r={22} delay={0.25} />
          <LeafCluster cx={35} cy={75} r={18} delay={0.3} />

          {/* Right Branch */}
          <LeafCluster cx={130} cy={75} r={28} delay={0.1} />
          <LeafCluster cx={155} cy={60} r={22} delay={0.2} />
          <LeafCluster cx={165} cy={75} r={18} delay={0.35} />

          {/* Fillers */}
          <LeafCluster cx={60} cy={95} r={15} delay={0.4} />
          <LeafCluster cx={140} cy={95} r={15} delay={0.45} />
          <LeafCluster cx={100} cy={80} r={30} delay={0.5} />
        </g>
      </svg>

      {/* Health Status Label */}
      <motion.div 
        key={label}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 font-display text-xl font-bold text-secondary-foreground bg-secondary/90 px-6 py-2 rounded-full shadow-lg border-2 border-white/20 backdrop-blur-sm z-20"
      >
        {label}
      </motion.div>
    </div>
  );
}
