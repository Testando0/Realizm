'use client';
import { forwardRef } from 'react';

const Step = forwardRef(({ emoji, title, text, tag, highlight, quote }, ref) => {
  return (
    <div ref={ref} className="step">
      <span className="emoji">{emoji}</span>
      <h2>{title}</h2>
      <p dangerouslySetInnerHTML={{ __html: text }} />
      {tag && <span className="tag">{tag}</span>}
      {highlight && <span className="highlight">{highlight}</span>}
      {quote && <div className="quote">{quote}</div>}
    </div>
  );
});

Step.displayName = 'Step';
export default Step;
