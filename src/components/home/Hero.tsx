
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Star, Sparkles } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import AnimatedText from '../ui/AnimatedText';

const Hero = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingElements = [
    { id: 1, icon: <Star className="w-full h-full text-accent" />, size: 'w-8 h-8', position: 'top-1/4 left-1/4', delay: 0 },
    { id: 2, icon: <BookOpen className="w-full h-full text-primary" />, size: 'w-10 h-10', position: 'top-1/2 right-1/4', delay: 1 },
    { id: 3, icon: <Sparkles className="w-full h-full text-primary/70" />, size: 'w-6 h-6', position: 'bottom-1/3 left-1/2', delay: 0.5 },
    { id: 4, icon: <Users className="w-full h-full text-accent/70" />, size: 'w-7 h-7', position: 'bottom-1/4 right-1/3', delay: 1.5 },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-50 via-white to-blue-50" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-secondary/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Floating elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          initial={{ y: 0 }}
          animate={{ 
            y: [-10, 10],
            rotate: [0, element.id % 2 === 0 ? 10 : -10],
          }}
          transition={{
            duration: 3,
            delay: element.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className={`absolute ${element.position} ${element.size} opacity-40 md:opacity-70`}
        >
          {element.icon}
        </motion.div>
      ))}

      <div className="story-container">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="mb-6 inline-block"
          >
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
              Unlock Creativity Together
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants} 
            className="text-4xl md:text-6xl font-bold mb-6 font-display leading-tight"
          >
            Create <span className="text-primary">Magical Stories</span> with Friends
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            StoryForge is a fun and safe platform where children can collaborate to create
            stories, customize characters, and bring their imagination to life with
            interactive animations.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <CustomButton
              variant="primary"
              size="lg"
              icon={<Sparkles className="w-5 h-5" />}
              onClick={() => navigate('/create-story')}
            >
              Start Creating
            </CustomButton>
            
            <CustomButton
              variant="outline"
              size="lg"
              icon={<BookOpen className="w-5 h-5" />}
              onClick={() => navigate('/library')}
            >
              Explore Stories
            </CustomButton>
          </motion.div>
        </motion.div>

        {/* Hero Image/Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-1 bg-gradient-to-r from-primary via-accent to-primary/70 rounded-2xl">
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="aspect-[16/9] bg-muted relative overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                  {/* Replace with actual hero image when available */}
                  <div className="text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-primary opacity-30" />
                    <p className="text-lg font-medium">Interactive Story Canvas</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Collaborative Storytelling</h3>
                    <p className="text-sm text-muted-foreground">Create stories with friends in real-time</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400'].map((color, i) => (
                      <div key={i} className={`story-avatar ${color} border-2 border-white`}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    <span>Interactive & Animated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
