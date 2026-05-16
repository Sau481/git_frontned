import React from 'react';
import { cn } from '../../utils/cn';

const GlassCard = ({ children, className, hoverEffect = false, ...props }) => {
  return (
    <div 
      className={cn(
        "glass-panel p-4",
        hoverEffect && "glass-panel-hover cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
