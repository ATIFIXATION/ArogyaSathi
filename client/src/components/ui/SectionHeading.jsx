import React from 'react';

export const SectionHeading = ({
  eyebrow,
  title,
  titleEmphasis,
  titleSuffix,
  subtitle,
  align = 'center',
  className = '',
  eyebrowColor = 'text-terracotta',
}) => {
  const alignmentClasses = {
    center: 'text-center mx-auto items-center',
    left: 'text-left items-start',
    right: 'text-right items-end',
  };

  return (
    <div className={`flex flex-col ${alignmentClasses[align]} max-w-3xl ${className}`}>
      {eyebrow && (
        <span className={`text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-3 ${eyebrowColor}`}>
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-ink font-normal leading-[1.15] tracking-tight">
        {title}{' '}
        {titleEmphasis && (
          <span className="italic text-terracotta font-serif font-normal">
            {titleEmphasis}{' '}
          </span>
        )}
        {titleSuffix}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed font-sans font-normal max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
