'use client';
import { motion, useScroll } from 'framer-motion';

export default function ProgressRing() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed bottom-6 right-6 w-14 h-14 z-50"
      style={{ rotate: scrollYProgress }}
    >
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#1a1a2e"
          strokeWidth="6"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#grad)"
          strokeWidth="6"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
    }
