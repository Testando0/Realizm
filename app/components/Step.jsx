'use client';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Step = forwardRef(({ emoji, title, text, tag, highlight, quote, index }, ref) => {
  const variants = {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1 * index,
        staggerChildren: 0.08,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="glass-card p-8 md:p-10 mb-16 relative overflow-hidden group"
    >
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-[48px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      />

      <motion.span variants={childVariants} className="text-6xl block mb-4">
        {emoji}
      </motion.span>

      <motion.h2 variants={childVariants} className="text-3xl md:text-4xl font-bold mb-3 hero-gradient">
        {title}
      </motion.h2>

      <motion.p
        variants={childVariants}
        className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-[95%]"
        dangerouslySetInnerHTML={{ __html: text }}
      />

      {tag && (
        <motion.span
          variants={childVariants}
          className="inline-block mt-4 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 text-blue-300"
        >
          {tag}
        </motion.span>
      )}

      {highlight && (
        <motion.span
          variants={childVariants}
          className="inline-block mt-2 ml-2 px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/10 border border-purple-500/20 text-purple-300"
        >
          {highlight}
        </motion.span>
      )}

      {quote && (
        <motion.div
          variants={childVariants}
          className="mt-4 pl-5 border-l-2 border-purple-400 italic text-gray-400 text-lg"
        >
          {quote}
        </motion.div>
      )}
    </motion.div>
  );
});

Step.displayName = 'Step';
export default Step;
