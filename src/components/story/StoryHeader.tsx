import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, MessageCircle } from 'lucide-react';
import CustomButton from '../ui/CustomButton';

interface StoryHeaderProps {
  isCollaborative: boolean;
  activeUsers: {
    id: number;
    name: string;
    color: string;
  }[];
  showChatPanel: boolean;
  setShowChatPanel: React.Dispatch<React.SetStateAction<boolean>>;
  storyTitle?: string;
}

const StoryHeader: React.FC<StoryHeaderProps> = ({
  isCollaborative,
  activeUsers,
  showChatPanel,
  setShowChatPanel,
  storyTitle = "Collaborative Story Canvas"
}) => {
  return (
    <div className="p-4 border-b flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <PenTool className="w-5 h-5 text-primary" />
        <h3 className="font-bold">{storyTitle}</h3>
      </div>
      <div className="flex items-center space-x-2">
        {isCollaborative && (
          <div className="flex -space-x-2">
            {activeUsers.map(user => (
              <motion.div
                key={user.id}
                whileHover={{ y: -2 }}
                className={`story-avatar ${user.color} border-2 border-white`}
                title={user.name}
              >
                {user.name.charAt(0)}
              </motion.div>
            ))}
          </div>
        )}
        <CustomButton
          variant="ghost"
          size="sm"
          icon={<MessageCircle className="w-4 h-4" />}
          onClick={() => setShowChatPanel(!showChatPanel)}
        >
          Chat
        </CustomButton>
      </div>
    </div>
  );
};

export default StoryHeader;
