
import React from 'react';
import { motion } from 'framer-motion';
import CustomButton from '../ui/CustomButton';

interface ChatPanelProps {
  showChatPanel: boolean;
  setShowChatPanel: React.Dispatch<React.SetStateAction<boolean>>;
  messages: {
    user: string;
    text: string;
    color: string;
  }[];
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
  handleSubmitMessage: (e: React.FormEvent) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  showChatPanel,
  setShowChatPanel,
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleSubmitMessage
}) => {
  if (!showChatPanel) return null;

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 300, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-[300px] border-l flex flex-col h-full"
    >
      <div className="p-3 border-b font-medium text-sm flex justify-between items-center">
        <span>Story Chat</span>
        <button onClick={() => setShowChatPanel(false)} className="text-muted-foreground hover:text-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      
      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto p-3 space-y-3">
        {messages.map((message, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
            className="flex items-start space-x-2"
          >
            <div className={`story-avatar ${message.color} flex-shrink-0`}>
              {message.user.charAt(0)}
            </div>
            <div className="bg-muted rounded-lg p-3 text-sm flex-grow">
              <div className="font-medium mb-1">{message.user}</div>
              <div>{message.text}</div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Chat input */}
      <form onSubmit={handleSubmitMessage} className="p-3 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="story-input text-sm py-2 flex-grow"
          />
          <CustomButton
            variant="primary"
            size="sm"
            onClick={handleSendMessage}
          >
            Send
          </CustomButton>
        </div>
      </form>
    </motion.div>
  );
};

export default ChatPanel;
