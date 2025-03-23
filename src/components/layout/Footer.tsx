import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Heart, Mail, Globe } from "lucide-react";

const Footer = () => {
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Home", path: "/" },
        { name: "Create Story", path: "/create-story" },
        { name: "Collaborate", path: "/collaborate" },
        { name: "Library", path: "/library" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Story Templates", path: "/templates" },
        { name: "Character Gallery", path: "/characters" },
        { name: "How It Works", path: "/how-it-works" },
        { name: "FAQs", path: "/faqs" },
      ],
    },
    {
      title: "Connect",
      links: [
        { name: "Contact Us", path: "/contact" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Use", path: "/terms" },
        { name: "About Us", path: "/about" },
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
    <footer className="bg-muted pt-2 pb-6">
      <div className="story-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-1 mt-1  flex flex-col md:flex-row justify-end items-center"
        >
          <p className="text-sm text-muted-foreground flex items-center">
            Made for BlueBit Hackathon by Team AlgoCrew
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
