import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  onClick,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  const variants = {
    primary: "bg-terracotta hover:bg-terracotta-hover text-white rounded-full shadow-md hover:shadow-lg focus:ring-terracotta active:scale-[0.98]",
    secondary: "bg-paper-light hover:bg-paper-warm text-ink border border-border-soft rounded-full hover:border-terracotta/40 focus:ring-terracotta/50 shadow-sm active:scale-[0.98]",
    outline: "bg-transparent hover:bg-paper-warm/60 text-ink-light border border-border-soft hover:border-ink/40 rounded-full focus:ring-ink/30",
    forest: "bg-forest hover:bg-forest-deep text-white rounded-full shadow-md hover:shadow-lg focus:ring-forest active:scale-[0.98]",
    ghost: "bg-transparent hover:bg-paper text-ink-light hover:text-ink rounded-lg",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3 gap-2.5",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      onClick={onClick}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" strokeWidth={2} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" strokeWidth={2} />}
    </button>
  );
};
