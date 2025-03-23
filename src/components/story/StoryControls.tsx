import React from 'react';
import { motion } from 'framer-motion';
import { Play, Save, Download, Share2, MicOff, Volume2 } from 'lucide-react';
import CustomButton from '../ui/CustomButton';

interface StoryControlsProps {
  onPlay?: () => void;
  onSave?: () => void;
  onToggleAudio?: () => void;
  onShare?: () => void;
  onExport?: () => void;
  isPlaying?: boolean;
  audioEnabled?: boolean;
}

const StoryControls = ({
  onPlay,
  onSave,
  onToggleAudio,
  onShare,
  onExport,
  isPlaying = false,
  audioEnabled = false,
}: StoryControlsProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glassmorphism p-4 rounded-xl flex items-center justify-between"
    >
      <div className="flex items-center space-x-2">
        <CustomButton
          variant={isPlaying ? 'accent' : 'primary'}
          onClick={onPlay}
          icon={<Play className="w-4 h-4" />}
          size="sm"
        >
          {isPlaying ? 'Pause Story' : 'Play Story'}
        </CustomButton>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onToggleAudio}
          className={`p-2 rounded-lg ${audioEnabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
        >
          {audioEnabled ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <MicOff className="w-5 h-5" />
          )}
        </motion.button>
      </div>
      
      <div className="flex items-center space-x-2">
        <CustomButton
          variant="outline"
          size="sm"
          onClick={onSave}
          icon={<Save className="w-4 h-4" />}
        >
          Save
        </CustomButton>
        
        <CustomButton
          variant="outline"
          size="sm"
          onClick={onShare}
          icon={<Share2 className="w-4 h-4" />}
        >
          Share
        </CustomButton>
        
        <CustomButton
          variant="outline"
          size="sm"
          onClick={onExport}
          icon={<Download className="w-4 h-4" />}
        >
          Export
        </CustomButton>
      </div>
    </motion.div>
  );
};

export default StoryControls;
