import React from 'react';

export const StatCard = ({
  value,
  label,
  sublabel,
  icon: Icon,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-4 py-3 px-4 sm:px-6 transition-all duration-200 ${className}`}>
      {Icon && (
        <div className="w-11 h-11 rounded-full bg-paper-dark/40 border border-border-soft/80 flex items-center justify-center text-ink-light shrink-0">
          <Icon className="w-5 h-5 text-ink" strokeWidth={1.5} />
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-2xl sm:text-3xl font-serif text-ink font-semibold tracking-tight">
          {value}
        </span>
        <span className="text-xs sm:text-sm text-ink-muted font-medium mt-0.5 leading-snug">
          {label}
        </span>
        {sublabel && (
          <span className="text-[11px] text-ink-subtle mt-0.5">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};
