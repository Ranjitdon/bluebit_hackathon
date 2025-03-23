import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';

interface StorySuggestionsProps {
  suggestions: string[];
  handleSuggestion: (suggestion: string) => void;
  isChoices?: boolean;
  selectedChoice?: string;
}

const StorySuggestions: React.FC<StorySuggestionsProps> = ({
  suggestions,
  handleSuggestion,
  isChoices = false,
  selectedChoice = ''
}) => {
  return (
    <div className="border-t p-4">
      <div className="flex items-center mb-2">
        <Sparkles className="w-4 h-4 text-accent mr-2" />
        <h4 className="font-medium text-sm">{isChoices ? "What happens next?" : "Story Suggestions"}</h4>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {suggestions.map((suggestion, idx) => {
          const choiceId = String.fromCharCode(65 + idx);
          const isSelected = selectedChoice === choiceId || selectedChoice === suggestion;
          
          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`text-sm p-3 rounded-lg cursor-pointer transition-colors flex items-center justify-between
                ${isSelected 
                  ? 'bg-primary/20 text-primary border border-primary/30' 
                  : 'bg-muted hover:bg-primary/10 hover:text-primary'}`}
              onClick={() => handleSuggestion(isChoices ? choiceId : suggestion)}
            >
              <span className="flex-grow">
                {isChoices ? (
                  <span>
                    <span className="font-bold text-primary">{choiceId}: </span>
                    {suggestion}
                  </span>
                ) : (
                  suggestion
                )}
              </span>
              {isSelected && (
                <Check className="w-4 h-4 text-primary flex-shrink-0 ml-2" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StorySuggestions;
