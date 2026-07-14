'use client';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import TypingText from './TypingText';

const Step = forwardRef(({ emoji, title, text, tag, highlight, quote, index, bgColor }, ref) => {
  const variants = {
    hidden: { opacity: 0, y: 150, scale: 0.8, rotateX: 15 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.2 * index,
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="glass p-10 md:p-14 mb-20 relative overflow-hidden group transition-colors duration-1000"
      style={{ backgroundColor: bgColor || 'rgba(255,255,255,0.03)' }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <motion.span
        variants={childVariants}
        className="text-7xl block mb-6 relative z-10 animate-float"
        style={{ filter: 'drop-shadow(0 0 30px rgba(139,92,246,0.3))' }}
      >
        {emoji}
      </motion.span>

      <motion.h2 variants={childVariants} className="text-4xl md:text-5xl font-extrabold mb-4 hero-glow relative z-10">
        {title}
      </motion.h2>

      <motion.div variants={childVariants} className="relative z-10">
        <TypingText text={text} className="text-xl md:text-2xl text-gray-300 leading-relaxed" />
      </motion.div>

      {tag && (
        <motion.span
          variants={childVariants}
          className="inline-block mt-6 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-500/20 border border-blue-500/30 text-blue-300 relative z-10"
        >
          {tag}
        </motion.span>
      )}

      {highlight && (
        <motion.span
          variants={childVariants}
          className="inline-block mt-6 ml-3 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-purple-500/20 border border-purple-500/30 text-purple-300 relative z-10"
        >
          {highlight}
        </motion.span>
      )}

      {quote && (
        <motion.div
          variants={childVariants}
          className="mt-6 pl-6 border-l-4 border-purple-400 italic text-gray-400 text-xl relative z-10"
        >
          {quote}
        </motion.div>
      )}
    </motion.div>
  );
});

Step.displayName = 'Step';
export default Step;
