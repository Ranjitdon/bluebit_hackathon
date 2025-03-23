import React from 'react';
import { motion } from 'framer-motion';
import { PenTool } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { ScrollArea } from '@/components/ui/scroll-area';

interface StoryContentProps {
  story: string;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleStoryChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const StoryContent: React.FC<StoryContentProps> = ({
  story,
  isEditing,
  setIsEditing,
  handleStoryChange
}) => {
  return (
    <div className="flex-grow p-6 relative bg-white/95 rounded-md shadow-sm my-2 mx-2">
      {/* Story display banner */}
      {!isEditing && story && (
        <div className="bg-primary/10 text-primary rounded-md p-2 mb-4 flex items-center">
          <span className="text-sm font-medium">Your story is displayed below. Click to edit.</span>
        </div>
      )}

      {isEditing ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-full"
        >
          <textarea
            className="story-input h-full w-full p-4 text-base leading-relaxed font-medium bg-white rounded-md border border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            value={story}
            onChange={handleStoryChange}
            placeholder="Start typing your story here..."
            autoFocus
          />
        </motion.div>
      ) : (
        <ScrollArea className="h-[450px] w-full pr-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="prose prose-lg max-w-none cursor-pointer bg-white p-5 rounded-md border border-primary/10"
            onClick={() => setIsEditing(true)}
          >
            {story.trim() ? (
              story.split('\n').map((paragraph, idx) => (
                paragraph.trim() ? (
                  <p key={idx} className="mb-4 last:mb-0 text-gray-800 text-base leading-relaxed">{paragraph}</p>
                ) : <div key={idx} className="h-4"></div>
              ))
            ) : (
              <p className="text-gray-500 italic">Your story will appear here. Click to start editing.</p>
            )}
          </motion.div>
        </ScrollArea>
      )}

      {/* Editing controls */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {isEditing ? (
          <CustomButton
            variant="primary"
            size="sm"
            onClick={() => setIsEditing(false)}
          >
            Save Changes
          </CustomButton>
        ) : (
          <CustomButton
            variant="outline"
            size="sm"
            icon={<PenTool className="w-4 h-4" />}
            onClick={() => setIsEditing(true)}
          >
            Edit Story
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default StoryContent;
