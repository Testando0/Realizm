'use client';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function TypingText({ text, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setDisplayText('');
      setIndex(0);
      return;
    }
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 25 + Math.random() * 40);
      return () => clearTimeout(timeout);
    }
  }, [index, text, isInView]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      <span className="typing-cursor" />
    </span>
  );
        }
