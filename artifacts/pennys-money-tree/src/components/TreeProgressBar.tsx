import React from 'react';
import { motion } from 'framer-motion';
import { useGame, MAX_PROGRESS } from '../context/GameContext';

// Simple SVG seedling (tiny, just a stem and two leaves)
function Seedling() {
  return (
    <svg viewBox="0 0 40 48" width="36" height="44" fill="none">
      {/* Stem */}
      <line x1="20" y1="44" x2="20" y2="24" stroke="#8B6340" strokeWidth="3" strokeLinecap="round" />
      {/* Left leaf */}
      <ellipse cx="13" cy="26" rx="8" ry="5" fill="#5CB85C" transform="rotate(-20 13 26)" />
      {/* Right leaf */}
      <ellipse cx="27" cy="24" rx="8" ry="5" fill="#4CAF50" transform="rotate(20 27 24)" />
      {/* Ground bump */}
      <ellipse cx="20" cy="44" rx="10" ry="3" fill="#C8A87A" opacity="0.5" />
    </svg>
  );
}

// Full golden money tree SVG
function GoldenTree() {
  return (
    <svg viewBox="0 0 56 64" width="52" height="60" fill="none">
      {/* Glow */}
      <ellipse cx="28" cy="24" rx="22" ry="20" fill="#FFD700" opacity="0.15" />
      {/* Trunk */}
      <path d="M28 60 C28 44 24 36 20 24 M28 60 C28 44 32 36 36 24 M28 60 L28 18" stroke="#8B6340" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* Left branch leaves */}
      <circle cx="16" cy="20" r="11" fill="#2E7D32" />
      <circle cx="10" cy="26" r="8" fill="#388E3C" />
      {/* Right branch leaves */}
      <circle cx="40" cy="20" r="11" fill="#2E7D32" />
      <circle cx="46" cy="26" r="8" fill="#388E3C" />
      {/* Top canopy */}
      <circle cx="28" cy="14" r="14" fill="#43A047" />
      <circle cx="22" cy="18" r="10" fill="#4CAF50" />
      <circle cx="34" cy="18" r="10" fill="#4CAF50" />
      {/* Gold coins (dots) */}
      <circle cx="28" cy="12" r="3" fill="#FFD700" />
      <circle cx="20" cy="18" r="2.5" fill="#FFC107" />
      <circle cx="36" cy="16" r="2.5" fill="#FFC107" />
      {/* Ground */}
      <ellipse cx="28" cy="60" rx="14" ry="4" fill="#C8A87A" opacity="0.4" />
    </svg>
  );
}

export function TreeProgressBar() {
  const { progress } = useGame();
  const pct = Math.min(100, Math.max(0, (progress / MAX_PROGRESS) * 100));

  return (
    <div className="w-full px-4 pt-5 pb-3">
      <div className="max-w-xl mx-auto">
        {/* Track row */}
        <div className="flex items-center gap-3">
          {/* Seedling */}
          <div className="shrink-0 flex items-end justify-center" style={{ width: 44 }}>
            <Seedling />
          </div>

          {/* Progress track */}
          <div className="flex-1 relative flex items-center" style={{ height: 24 }}>
            {/* Background track */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center">
              <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: pct >= 80
                      ? 'linear-gradient(90deg, #4CAF50, #FFD700)'
                      : 'linear-gradient(90deg, #4CAF50, #66BB6A)',
                  }}
                  initial={false}
                  animate={{ width: `${pct}%` }}
                  transition={{ type: 'spring', stiffness: 80, damping: 18 }}
                />
              </div>
            </div>

            {/* Sliding dot */}
            <motion.div
              className="absolute z-10"
              initial={false}
              animate={{ left: `calc(${pct}% - 12px)` }}
              transition={{ type: 'spring', stiffness: 80, damping: 18 }}
            >
              <div
                className="w-6 h-6 rounded-full border-[3px] border-white shadow-md flex items-center justify-center"
                style={{ background: pct >= 80 ? '#FFD700' : '#4CAF50' }}
              >
                <span className="text-[8px] text-white font-bold">💰</span>
              </div>
            </motion.div>
          </div>

          {/* Full tree */}
          <div className="shrink-0 flex items-end justify-center" style={{ width: 56 }}>
            <GoldenTree />
          </div>
        </div>

        {/* Label */}
        <div className="text-center mt-1">
          <span className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">
            {pct < 20 ? "Just getting started..." : pct < 50 ? "Growing steadily" : pct < 80 ? "Looking great!" : "Almost golden! 🌟"}
          </span>
        </div>
      </div>
    </div>
  );
}
