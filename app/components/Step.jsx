'use client';

import { forwardRef, useEffect, useRef } from 'react';

const Step = forwardRef(({ emoji, title, text, tag, highlight, quote }, ref) => {
  const textRef = useRef(null);

  // Efeito de revelação de texto (opcional)
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const words = el.innerText.split(' ');
    el.innerHTML = words
      .map((word, i) =>
        `<span style="display:inline-block; opacity:0; animation: fadeInWord 0.5s ease forwards ${i * 0.05}s;">${word}</span>`
      )
      .join(' ');
  }, [text]);

  return (
    <div ref={ref} className="step">
      <span className="emoji">{emoji}</span>
      <h2>{title}</h2>
      <p ref={textRef} dangerouslySetInnerHTML={{ __html: text }} />
      {tag && <span className="tag">{tag}</span>}
      {highlight && <span className="highlight">{highlight}</span>}
      {quote && <div className="quote">{quote}</div>}
    </div>
  );
});

Step.displayName = 'Step';

export default Step;
