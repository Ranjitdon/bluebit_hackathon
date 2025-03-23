
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Sparkles, PenTool, MessagesSquare, BookOpen, Palette } from 'lucide-react';
import AnimatedText from '../ui/AnimatedText';

const FeatureSection = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Collaborate in Real-time',
      description: 'Work together with friends to create stories. See who\'s typing and watch the story grow instantly!',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Magical Animations',
      description: 'Bring your stories to life with playful animations. Make characters jump, fly, or dance across the pages!',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: 'Creative Story Tools',
      description: 'Get help with story ideas, plot twists, and character development using our creative story generators.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <MessagesSquare className="w-6 h-6" />,
      title: 'Chat with Co-Authors',
      description: 'Discuss ideas and plan your story with the built-in chat feature. Share thoughts without leaving the story page!',
      color: 'bg-amber-100 text-amber-600',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Story Templates',
      description: 'Choose from exciting story starters like fantasy adventures, space explorations, or magical journeys.',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Character Creator',
      description: 'Design unique characters with our easy-to-use creator. Choose appearances, personalities, and special abilities!',
      color: 'bg-indigo-100 text-indigo-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="story-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
            Magical Features for Young Storytellers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            StoryForge offers all the tools children need to create, collaborate, 
            and share their stories in a safe and fun environment.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="story-card p-6 h-full flex flex-col"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className={`p-3 rounded-xl ${feature.color} inline-block mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 font-display">{feature.title}</h3>
              <p className="text-muted-foreground text-sm flex-grow">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;
