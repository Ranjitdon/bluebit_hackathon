
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import Footer from '@/components/layout/Footer';
import FeatureSection from '@/components/home/FeatureSection';

const Index = () => {
  // Magical floating elements for the background
  const floatingElements = [
    { id: 1, icon: "✨", x: "10%", y: 50, size: "text-xl", color: "text-yellow-400", delay: 0 },
    { id: 2, icon: "🪄", x: "85%", y: 150, size: "text-2xl", color: "text-purple-500", delay: 0.5 },
    { id: 3, icon: "🧙", x: "25%", y: 250, size: "text-3xl", color: "text-blue-400", delay: 1 },
    { id: 4, icon: "📚", x: "75%", y: 300, size: "text-2xl", color: "text-green-400", delay: 1.5 },
    { id: 5, icon: "🦄", x: "50%", y: 400, size: "text-3xl", color: "text-pink-400", delay: 2 },
    { id: 6, icon: "🔮", x: "15%", y: 450, size: "text-xl", color: "text-indigo-400", delay: 2.5 },
    { id: 7, icon: "🌟", x: "80%", y: 500, size: "text-2xl", color: "text-amber-400", delay: 3 },
    { id: 8, icon: "🐉", x: "40%", y: 550, size: "text-3xl", color: "text-red-400", delay: 3.5 },
    { id: 9, icon: "🏰", x: "65%", y: 600, size: "text-2xl", color: "text-stone-400", delay: 4 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 overflow-hidden relative">
      <Navbar />
      
      {/* Magical floating elements */}
      {floatingElements.map(element => (
        <motion.div
          key={element.id}
          className={`absolute ${element.size} ${element.color} opacity-70 pointer-events-none`}
          style={{ left: element.x, top: element.y }}
          initial={{ y: element.y }}
          animate={{ 
            y: [element.y - 20, element.y + 20] 
          }}
          transition={{
            delay: element.delay,
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "easeInOut"
          }}
        >
          {element.icon}
        </motion.div>
      ))}
      
      <Hero />
      <FeatureSection />
      <Footer />
    </div>
  );
};

export default Index;
