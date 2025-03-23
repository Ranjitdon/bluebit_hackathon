import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, Castle, Rocket, Sparkles, Map, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StoryTemplateProps {
  onSelectTemplate: (template: string, genre: string) => void;
  selectedTemplate: string;
}

const StoryTemplate = ({ onSelectTemplate, selectedTemplate }: StoryTemplateProps) => {
  const templates = [
    {
      id: 'fantasy',
      title: 'Magical Kingdom',
      icon: <Castle className="w-5 h-5" />,
      description: 'A story set in a magical kingdom with wizards, dragons, and enchanted forests.',
      color: 'from-purple-500 to-blue-500',
      starter: 'In the Kingdom of Lumina, where magic sparkled in the air and dragons soared through the clouds, there lived a young apprentice wizard named...',
      genre: 'fantasy'
    },
    {
      id: 'space',
      title: 'Space Adventure',
      icon: <Rocket className="w-5 h-5" />,
      description: 'An exciting journey through space with aliens, planets, and galactic mysteries.',
      color: 'from-indigo-500 to-purple-500',
      starter: 'The spaceship "Star Explorer" zoomed past the rings of Saturn as Captain Alex looked out at the stars. Suddenly, a mysterious signal appeared on the radar...',
      genre: 'science fiction'
    },
    {
      id: 'adventure',
      title: 'Treasure Hunt',
      icon: <Map className="w-5 h-5" />,
      description: 'A thrilling adventure to find hidden treasures in mysterious locations.',
      color: 'from-amber-500 to-red-500',
      starter: 'The old map was wrinkled and torn at the edges, but the X marking the treasure was still clearly visible. With excitement bubbling in their hearts, the friends set off to find...',
      genre: 'adventure'
    },
    {
      id: 'magical',
      title: 'Enchanted Objects',
      icon: <Sparkles className="w-5 h-5" />,
      description: 'Everyday objects come to life with magical powers and personalities.',
      color: 'from-pink-500 to-rose-500',
      starter: 'It was past midnight when Maya first noticed her toys whispering to each other. She rubbed her eyes in disbelief as her teddy bear turned and waved at her...',
      genre: 'fairy tale'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="py-8">
      <div className="flex items-center mb-6">
        <BookOpen className="w-5 h-5 text-primary mr-2" />
        <h2 className="text-xl font-bold">Choose a Story Template</h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.starter;
          
          return (
            <motion.div
              key={template.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "story-card cursor-pointer overflow-hidden flex flex-col h-full relative",
                isSelected ? "ring-2 ring-primary shadow-lg" : ""
              )}
              onClick={() => onSelectTemplate(template.starter, template.genre)}
            >
              <div className={`bg-gradient-to-r ${template.color} p-4 text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-white/20 p-2 rounded-lg">
                    {template.icon}
                  </div>
                  {isSelected ? (
                    <div className="bg-white rounded-full p-1">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  ) : (
                    <Star className="w-4 h-4" />
                  )}
                </div>
                <h3 className="font-bold text-lg mb-1">{template.title}</h3>
              </div>
              
              <div className="p-4 flex-grow flex flex-col">
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  {template.description}
                </p>
                
                <div 
                  className="text-xs bg-muted p-3 rounded-lg italic"
                  onClick={(e) => e.stopPropagation()}
                >
                  "{template.starter.substring(0, 70)}..."
                </div>
              </div>
              
              {isSelected && (
                <div className="absolute top-2 right-2 bg-primary text-white text-xs py-1 px-2 rounded-full">
                  Selected
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default StoryTemplate;
