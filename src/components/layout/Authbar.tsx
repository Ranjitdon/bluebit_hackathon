
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BookOpen, User, LogIn } from 'lucide-react';

const Authbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="story-container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.div
            whileHover={{ rotate: 5 }}
            className="bg-primary rounded-lg p-2 mr-2"
          >
            <BookOpen className="w-6 h-6 text-white" />
          </motion.div>
          <motion.h1 
            className="text-xl md:text-2xl font-bold font-display"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            StoryForge
          </motion.h1>
        </Link>

        {/* Auth Links */}
        <div className="flex items-center space-x-4">
          {/* Profile Link */}
          {location.pathname !== '/profile' && (
            <Link to="/profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <User className="w-4 h-4 mr-1" />
                <span>Profile</span>
              </motion.button>
            </Link>
          )}
          
          {location.pathname !== '/signin' && (
            <Link to="/signin">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <LogIn className="w-4 h-4 mr-1" />
                <span>Sign In</span>
              </motion.button>
            </Link>
          )}
          
          {location.pathname !== '/signup' && (
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm"
              >
                <User className="w-4 h-4 mr-1" />
                <span>Sign Up</span>
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Authbar;

