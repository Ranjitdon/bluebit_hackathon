
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Mail, Globe } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Create Story', path: '/create-story' },
        { name: 'Collaborate', path: '/collaborate' },
        { name: 'Library', path: '/library' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Story Templates', path: '/templates' },
        { name: 'Character Gallery', path: '/characters' },
        { name: 'How It Works', path: '/how-it-works' },
        { name: 'FAQs', path: '/faqs' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Use', path: '/terms' },
        { name: 'About Us', path: '/about' },
      ],
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

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted pt-12 pb-6">
      <div className="story-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-1"
          >
            <Link to="/" className="flex items-center mb-4">
              <div className="bg-primary rounded-lg p-2 mr-2">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold font-display">StoryForge</h3>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              A magical world where children collaborate to create
              stories, unleash their imagination, and bring characters to life.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"
              >
                <Globe size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Links */}
          {footerLinks.map((section, idx) => (
            <motion.div
              key={section.title}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delayChildren: 0.1 * idx }}
              className="col-span-1"
            >
              <h4 className="font-display font-bold mb-4 text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <motion.li key={link.name} variants={childVariants}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-6 mt-6 border-t border-border flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} StoryForge. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            Made with 
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="inline-block mx-1"
            >
              <Heart size={14} className="text-primary fill-primary" />
            </motion.span>
            for kids' creativity
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
