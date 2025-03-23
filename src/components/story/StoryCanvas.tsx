import React, { useState } from 'react';
import StoryHeader from './StoryHeader';
import StoryContent from './StoryContent';
import ChatPanel from './ChatPanel';
import StorySuggestions from './StorySuggestions';
import StoryFlowchart from './StoryFlowchart';

interface StoryCanvasProps {
  storyId?: string;
  isCollaborative?: boolean;
  storyText?: string;
  choices?: string[];
  onChoiceSelect?: (choice: string) => void;
  isVisible?: boolean;
  selectedChoice?: string;
  storyNodes?: {id: string, text: string, isSelected?: boolean, isGenre?: boolean}[];
}

const StoryCanvas = ({ 
  storyId, 
  isCollaborative = true, 
  storyText = '', 
  choices = [],
  onChoiceSelect,
  isVisible = false,
  selectedChoice = '',
  storyNodes = []
}: StoryCanvasProps) => {
  const [story, setStory] = useState<string>(storyText || 'Once upon a time in a magical forest...');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showChatPanel, setShowChatPanel] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ user: string; text: string; color: string }[]>([
    { user: 'Emma', text: 'I added a dragon to the story!', color: 'bg-red-400' },
    { user: 'Alex', text: 'Cool! Maybe the dragon can be friendly?', color: 'bg-blue-400' },
  ]);
  const [newMessage, setNewMessage] = useState<string>('');

  // Simulated active users
  const activeUsers = [
    { id: 1, name: 'Emma', color: 'bg-red-400' },
    { id: 2, name: 'Alex', color: 'bg-blue-400' },
    { id: 3, name: 'You', color: 'bg-green-400' },
  ];

  // Simulated story suggestions (only used if no choices are provided)
  const suggestions = [
    'Add a friendly dragon that helps the main character',
    'The characters discover a hidden treasure map',
    'A magical storm brings the toys to life',
    'The forest animals can talk and have a secret society',
  ];

  // Update story text when prop changes
  React.useEffect(() => {
    if (storyText) {
      setStory(storyText);
    }
  }, [storyText]);

  const handleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStory(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    setMessages([
      ...messages,
      { user: 'You', text: newMessage, color: 'bg-green-400' }
    ]);
    setNewMessage('');
  };

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleSuggestion = (suggestion: string) => {
    if (onChoiceSelect) {
      onChoiceSelect(suggestion);
    } else {
      setStory(currentStory => `${currentStory}\n\n${suggestion}...`);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="story-card h-[1100px] flex flex-col border-2 border-primary/20 shadow-lg rounded-lg overflow-hidden bg-gradient-to-b from-white to-primary/5">
      {/* Story header */}
      <StoryHeader 
        isCollaborative={isCollaborative}
        activeUsers={activeUsers}
        showChatPanel={showChatPanel}
        setShowChatPanel={setShowChatPanel}
      />

      {/* Main content area with fixed height */}
      <div className="flex-grow flex overflow-hidden relative">
        {/* Story content - the main story display area */}
        <div className="flex-grow overflow-hidden flex flex-col">
          {/* Highlighted story snippet at the top */}
          {story && (
            <div className="bg-blue-100 text-blue-800 p-3 mx-4 mt-2 rounded-md border-l-4 border-blue-500 text-sm font-medium">
              {story.split('\n')[0].substring(0, 100)}
              {story.split('\n')[0].length > 100 ? '...' : ''}
            </div>
          )}
          
          <StoryContent 
            story={story}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleStoryChange={handleStoryChange}
          />
        </div>

        {/* Chat panel */}
        <ChatPanel 
          showChatPanel={showChatPanel}
          setShowChatPanel={setShowChatPanel}
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          handleSubmitMessage={handleSubmitMessage}
        />
      </div>

      {/* Story suggestions or choices */}
      <StorySuggestions 
        suggestions={choices.length > 0 ? choices : suggestions}
        handleSuggestion={handleSuggestion}
        isChoices={choices.length > 0}
        selectedChoice={selectedChoice}
      />

      {/* Story flowchart */}
      {storyNodes.length > 0 && (
        <div className="mt-2 px-4 pb-4">
          <StoryFlowchart storyNodes={storyNodes} />
        </div>
      )}
    </div>
  );
};

export default StoryCanvas;
