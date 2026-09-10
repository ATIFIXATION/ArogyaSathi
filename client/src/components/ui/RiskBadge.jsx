import React from 'react';

export const RiskBadge = ({ level = 'high', label, size = 'sm', className = '' }) => {
  const normalizedLevel = String(level).toLowerCase();

  const configs = {
    high: {
      bg: 'bg-terracotta/10 border-terracotta/30 text-terracotta',
      dot: 'bg-terracotta glow-high',
      defaultLabel: 'High',
    },
    medium: {
      bg: 'bg-risk-medium/10 border-risk-medium/30 text-risk-medium',
      dot: 'bg-risk-medium glow-medium',
      defaultLabel: 'Medium',
    },
    low: {
      bg: 'bg-forest/10 border-forest/30 text-forest',
      dot: 'bg-forest glow-low',
      defaultLabel: 'Low',
    },
  };

  const current = configs[normalizedLevel] || configs.high;
  const displayLabel = label || current.defaultLabel;

  const sizeClasses = {
    xs: 'text-[10px] px-2 py-0.5 gap-1.5',
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3 py-1.5 gap-2',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${current.bg} ${sizeClasses[size] || sizeClasses.sm} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      <span>{displayLabel}</span>
    </span>
  );
};
