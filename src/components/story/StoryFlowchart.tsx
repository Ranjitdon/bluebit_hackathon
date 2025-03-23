import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, GitBranch, Circle, CheckCircle2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface StoryNode {
  id: string;
  text: string;
  isSelected?: boolean;
  isGenre?: boolean;
}

interface StoryFlowchartProps {
  storyNodes: StoryNode[];
}

const StoryFlowchart: React.FC<StoryFlowchartProps> = ({ storyNodes }) => {
  if (!storyNodes.length) return null;

  return (
    <div className="border rounded-lg shadow-sm bg-white/80 p-4 w-full">
      <div className="flex items-center mb-3">
        <GitBranch className="w-4 h-4 text-primary mr-2" />
        <h3 className="font-medium text-sm">Story Progression</h3>
      </div>
      
      <ScrollArea className="h-[150px] w-full pr-4">
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-muted z-0" />
          
          {/* Story nodes */}
          <div className="relative z-10">
            {storyNodes.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start mb-4 last:mb-0"
              >
                <div className="mr-4 flex-shrink-0">
                  {node.isSelected ? (
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  ) : node.isGenre ? (
                    <Circle className="w-6 h-6 text-primary" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                
                <div className={`flex-grow p-2 rounded-md text-sm ${node.isSelected ? 'bg-accent/10 text-accent font-medium' : node.isGenre ? 'bg-primary/10 text-primary font-medium' : 'bg-muted'}`}>
                  {node.text}
                </div>
                
                {index < storyNodes.length - 1 && (
                  <div className="flex items-center ml-2">
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default StoryFlowchart;
