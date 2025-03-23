
// Animation variants for Framer Motion

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

export const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  exit: { scale: 0.95, opacity: 0, transition: { duration: 0.3 } }
};

export const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: { y: 20, opacity: 0, transition: { duration: 0.3 } }
};

export const slideDown = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: { y: -20, opacity: 0, transition: { duration: 0.3 } }
};

export const slideRight = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: { x: -20, opacity: 0, transition: { duration: 0.3 } }
};

export const slideLeft = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  exit: { x: 20, opacity: 0, transition: { duration: 0.3 } }
};

export const staggerChildren = (delay = 0.05) => ({
  animate: {
    transition: {
      staggerChildren: delay
    }
  }
});

export const bounceAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-5, 0, -3, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      times: [0, 0.55, 0.85, 1]
    }
  }
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  }
};

export const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

export const pulseAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
