
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import CustomButton from '../ui/CustomButton';
import { BookOpen, PenTool, Menu, X, Home, LogIn, User } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Create Story', path: '/create-story', icon: <PenTool className="w-5 h-5" /> },
    { name: 'Library', path: '/library', icon: <BookOpen className="w-5 h-5" /> },
  ];

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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link to={item.path}>
                <div 
                  className={cn(
                    'px-3 py-2 rounded-full flex items-center mx-1 transition-colors',
                    location.pathname === item.path 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'hover:bg-muted text-foreground'
                  )}
                >
                  {item.icon}
                  <span className="ml-1">{item.name}</span>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Profile Link */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/profile">
              <div 
                className={cn(
                  'px-3 py-2 rounded-full flex items-center mx-1 transition-colors',
                  location.pathname === '/profile' 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'hover:bg-muted text-foreground'
                )}
              >
                <User className="w-5 h-5" />
                <span className="ml-1">Profile</span>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/signin">
              <CustomButton 
                variant="outline" 
                size="sm"
                className="ml-2"
                icon={<LogIn className="w-4 h-4" />}
              >
                Sign In
              </CustomButton>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/signup">
              <CustomButton 
                variant="accent" 
                size="sm"
                className="ml-2"
              >
                Join Now
              </CustomButton>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-muted"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t mt-4"
        >
          <div className="story-container py-4 flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'px-4 py-3 rounded-xl flex items-center',
                  location.pathname === item.path 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'hover:bg-muted text-foreground'
                )}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
            {/* Profile Link in Mobile Menu */}
            <Link
              to="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'px-4 py-3 rounded-xl flex items-center',
                location.pathname === '/profile' 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'hover:bg-muted text-foreground'
              )}
            >
              <User className="w-5 h-5" />
              <span className="ml-2">Profile</span>
            </Link>
            <Link
              to="/signin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl flex items-center hover:bg-muted"
            >
              <LogIn className="w-5 h-5 mr-2" />
              <span>Sign In</span>
            </Link>
            <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
              <CustomButton 
                variant="accent" 
                size="sm"
                className="w-full mt-2"
              >
                Join Now
              </CustomButton>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

