
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  delay?: number;
  duration?: number;
  animation?: 'fadeIn' | 'typewriter' | 'slideUp' | 'staggered';
  once?: boolean;
}

const AnimatedText = ({
  text,
  as = 'p',
  className,
  delay = 0,
  duration = 0.5,
  animation = 'fadeIn',
  once = true,
}: AnimatedTextProps) => {
  const Component = motion[as] as React.ComponentType<any>;

  // Options for different animation types
  const animationOptions = {
    fadeIn: {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      transition: { delay, duration },
      viewport: { once }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      transition: { delay, duration },
      viewport: { once }
    },
    typewriter: {
      initial: { width: '0%' },
      whileInView: { width: '100%' },
      transition: { delay, duration: duration * 2 },
      viewport: { once },
      className: cn('overflow-hidden whitespace-nowrap', className)
    },
    staggered: {
      className
    }
  };

  // If animation is staggered, we need to split the text into characters
  if (animation === 'staggered') {
    const container = {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.03, delayChildren: delay * i }
      }),
      viewport: { once }
    };

    const child = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: 'spring',
          damping: 12,
          stiffness: 100
        }
      },
      hidden: {
        opacity: 0,
        y: 20,
      }
    };

    return (
      <motion.div
        style={{ display: 'inline-block' }}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        className={className}
      >
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={child}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  // For other animation types
  return (
    <Component {...animationOptions[animation]}>
      {text}
    </Component>
  );
};

export default AnimatedText;
