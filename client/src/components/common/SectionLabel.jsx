import React from 'react';

/**
 * Shared SectionLabel Component
 * Renders the signature EverPeak editorial pattern:
 * [gradient rule-line] — [small-caps label] — [gradient rule-line]
 */
const SectionLabel = ({ label, className = '', centered = true }) => {
  return (
    <div
      className={`flex items-center gap-4 w-full mb-4 ${
        centered ? 'justify-center text-center' : 'justify-start text-left'
      } ${className}`}
    >
      <span className="flex-1 max-w-[80px] sm:max-w-[110px] h-[1px] bg-gradient-to-r from-transparent to-brand-rule" />
      <span className="small-caps text-brand-magenta font-semibold tracking-[0.18em]">
        {label}
      </span>
      <span className="flex-1 max-w-[80px] sm:max-w-[110px] h-[1px] bg-gradient-to-l from-transparent to-brand-rule" />
    </div>
  );
};

export default SectionLabel;
