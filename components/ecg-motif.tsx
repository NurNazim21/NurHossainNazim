'use client';

import React from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';

const HERO_ECG_PATH =
  'M 0 64 L 90 64 L 106 64 Q 114 54 122 64 L 138 64 L 145 73 L 156 14 L 168 106 L 178 52 L 190 64 L 204 64 Q 218 46 232 64 L 340 64 L 356 64 Q 364 54 372 64 L 388 64 L 395 73 L 406 14 L 418 106 L 428 52 L 440 64 L 454 64 Q 468 46 482 64 L 620 64 L 636 64 Q 644 54 652 64 L 668 64 L 675 73 L 686 14 L 698 106 L 708 52 L 720 64 L 734 64 Q 748 46 762 64 L 900 64';

export function HeroEcgTrace({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={cn('relative w-full overflow-hidden select-none', className)} aria-hidden="true">
      <svg
        viewBox="0 0 900 120"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-20"
      >
        <defs>
          <linearGradient id="ecg-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset="18%" stopColor="var(--accent)" stopOpacity="0.95" />
            <stop offset="82%" stopColor="var(--accent)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Subtle reference baseline */}
        <line
          x1="0"
          y1="64"
          x2="900"
          y2="64"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {/* Animated ECG trace */}
        {shouldReduceMotion ? (
          <path
            d={HERO_ECG_PATH}
            stroke="url(#ecg-fade)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <>
            <motion.path
              d={HERO_ECG_PATH}
              stroke="url(#ecg-fade)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.3 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="animate-ecg-breathe"
            />
            <motion.circle
              cx="0"
              cy="64"
              r="3"
              fill="var(--accent)"
              initial={{ opacity: 0, x: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: [0, 900],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 1.2,
              }}
            />
          </>
        )}
      </svg>
    </div>
  );
}

export function EcgDivider({ className }: { className?: string }) {
  return (
    <div className={cn('relative flex items-center w-full py-2', className)} aria-hidden="true">
      <div className="h-px flex-1 bg-border" />
      <svg width="72" height="24" viewBox="0 0 72 24" fill="none" className="mx-3 shrink-0">
        <path
          d="M 0 12 L 18 12 L 23 12 Q 25 8 27 12 L 31 12 L 33 15 L 36 2 L 39 22 L 42 9 L 45 12 L 49 12 Q 52 7 55 12 L 72 12"
          stroke="var(--accent)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

export function EcgScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none no-print"
      aria-hidden="true"
    >
      <motion.div
        style={{ scaleX, transformOrigin: '0% 50%' }}
        className="h-full w-full bg-accent"
      />
    </div>
  );
}
