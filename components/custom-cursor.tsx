'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { stiffness: 450, damping: 32 });
  const smoothY = useSpring(cursorY, { stiffness: 450, damping: 32 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [cursorX, cursorY, shouldReduceMotion]);

  if (!enabled || !visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: smoothX, y: smoothY }}
      className="fixed top-0 left-0 z-50 h-3 w-3 rounded-full border border-accent bg-accent/25 pointer-events-none hidden lg:block no-print"
    />
  );
}
