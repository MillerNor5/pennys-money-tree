import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGame } from '../context/GameContext';
import { RefreshCcw, Share2, Star } from 'lucide-react';
import { TreeDisplay } from '../components/TreeDisplay';

export default function EndScreen() {
  const { profile, healthPercentage, history, resetGame } = useGame();
  const [, setLocation] = useLocation();

  const goodCount = history.filter(h => h.delta > 0).length;
  const isGolden = healthPercentage > 70;

  useEffect(() => {
    // Redirect if they somehow got here without playing
    if (history.length === 0) {
      setLocation('/');
      return;
    }

    // Celebration effect
    if (healthPercentage > 40) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#4ADE80', '#FCD34D']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#4ADE80', '#FCD34D']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [healthPercentage, history.length, setLocation]);

  const handlePlayAgain = () => {
    resetGame();
    setLocation('/');
  };

  const handleShare = () => {
    alert("Copied to clipboard! Share your Money Tree with friends!");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="mb-8 w-full max-w-md relative"
        >
          {isGolden && <SparklesOverlay />}
          <TreeDisplay />
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full bg-card rounded-3xl p-8 sm:p-12 shadow-xl border border-border relative overflow-hidden"
        >
          {/* Decorative corner */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-8 border-b border-border/50 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display text-foreground font-bold mb-2">
                {isGolden ? "Incredible Job!" : "You Did It!"}
              </h1>
              <p className="text-muted-foreground text-lg">Final Tree Health: {Math.round(healthPercentage)}%</p>
            </div>
            
            <div className="flex items-center gap-3 bg-primary/10 px-5 py-3 rounded-2xl">
              <Star className="text-primary fill-primary" />
              <span className="font-bold text-primary text-lg">{goodCount} Great Choices</span>
            </div>
          </div>

          <div className="prose prose-lg prose-p:text-foreground/80 max-w-none font-sans">
            <p>Dear {profile.name},</p>
            
            <p>Thank you so much for helping me!</p>
            
            <p>
              {healthPercentage > 70 
                ? "Because of your amazing choices, our Money Tree is golden and my family is SO close to our dream home! " 
                : healthPercentage > 40 
                ? "Thanks to your help, we made real progress toward our dream! " 
                : "Even though the tree struggled, I learned so much about saving and making smart choices! "}
            </p>

            <p>
              You made {goodCount} great decisions that really helped.
              {goodCount >= 3 && " You're a natural money champion!"}
            </p>

            <p className="mt-8 font-display font-bold text-2xl text-primary">
              With love,<br/>
              Penny 🌳
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handlePlayAgain}
              className="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2 text-lg"
            >
              <RefreshCcw size={20} />
              Play Again
            </button>
            <button 
              onClick={handleShare}
              className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2 text-lg"
            >
              <Share2 size={20} />
              Share My Tree
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SparklesOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-accent"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: [0, 1.2, 0], 
            rotate: [0, 180, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        >
          <Star size={16} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}
