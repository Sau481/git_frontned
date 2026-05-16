import React from 'react';
import { cn } from '../../utils/cn';

const NeonButton = ({ children, className, variant = 'primary', icon: Icon, ...props }) => {
  const variants = {
    primary: "bg-primary/20 text-primary border border-primary/50 hover:bg-primary/30 hover:shadow-neon",
    secondary: "bg-panel text-gray-300 border border-border hover:border-primary/50 hover:text-primary",
  };

  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
      {Icon && <Icon className="w-4 h-4" />}
    </button>
  );
};

export default NeonButton;
