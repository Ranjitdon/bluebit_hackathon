
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface CustomButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean; // Added isLoading property
}

const CustomButton = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className,
  disabled = false,
  icon,
  iconPosition = 'left',
  isLoading = false, // Added default value
}: CustomButtonProps) => {
  const baseStyles = 'story-button flex items-center justify-center font-display';
  
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    accent: 'bg-accent text-white hover:bg-accent/90',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10',
    ghost: 'bg-transparent hover:bg-muted text-foreground',
  };
  
  const sizeStyles = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-3 px-6',
    lg: 'text-lg py-4 px-8',
  };

  const whileTap = { scale: 0.97 };
  const whileHover = { scale: 1.02 };

  return (
    <motion.button
      whileTap={(disabled || isLoading) ? {} : whileTap}
      whileHover={(disabled || isLoading) ? {} : whileHover}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        (disabled || isLoading) && 'opacity-60 cursor-not-allowed',
        className
      )}
      onClick={(disabled || isLoading) ? undefined : onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          {children}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </>
      )}
    </motion.button>
  );
};

export default CustomButton;
