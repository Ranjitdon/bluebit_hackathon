import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, BookOpen, Wand2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StoryTemplate from '@/components/story/StoryTemplate';
import StoryCanvas from '@/components/story/StoryCanvas';
import StoryControls from '@/components/story/StoryControls';
import CustomButton from '@/components/ui/CustomButton';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useNavigate } from 'react-router-dom';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent } from '@/components/ui/card';

interface StoryNode {
  id: string;
  text: string;
  isSelected?: boolean;
  isGenre?: boolean;
}

interface NewStoryRequest {
  genre: string;
  style: string;
  word_count: number;
  story_progress_length: number;
  story_start: string;
}

interface StoryResponse {
  story_id: string;
  story_text: string;
  choices: string[];
}

interface StoryChoice {
  id: string;
  text: string;
}

const CreateStory = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  const [showStoryCanvas, setShowStoryCanvas] = useState<boolean>(false);

  const [genre, setGenre] = useState<string>('fantasy');
  const [style, setStyle] = useState<string>('children\'s');
  const [storyStart, setStoryStart] = useState<string>('Once upon a time in a magical forest...');
  const [wordCount, setWordCount] = useState<number>(500);
  const [progressLength, setProgressLength] = useState<number>(200);
  
  const [storyId, setStoryId] = useState<string | null>(null);
  const [storyText, setStoryText] = useState<string>('');
  const [choices, setChoices] = useState<StoryChoice[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [storyNodes, setStoryNodes] = useState<StoryNode[]>([]);

  const handleSelectTemplate = (template: string, genreValue: string) => {
    setSelectedTemplate(template);
    setStoryStart(template);
    setGenre(genreValue);
    
    // Update storyNodes with template selection
    setStoryNodes([
      { 
        id: 'genre', 
        text: `Genre: ${genreValue.charAt(0).toUpperCase() + genreValue.slice(1)}`, 
        isGenre: true 
      }
    ]);
  };

  const handleToggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const handlePlayStory = () => {
    setIsPlaying(!isPlaying);
  };

  const startStory = async () => {
    setIsLoading(true);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:8000/start_story/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          genre,
          style,
          word_count: wordCount,
          story_progress_length: progressLength,
          story_start: storyStart
        } as NewStoryRequest),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate story');
      }
      
      const data: StoryResponse = await response.json();
      
      setStoryId(data.story_id);
      setStoryText(data.story_text);
      setChoices(data.choices.map((choice, index) => ({
        id: String.fromCharCode(65 + index),
        text: choice
      })));
      
      setStoryNodes(prevNodes => [
        ...prevNodes,
        { 
          id: 'story-start', 
          text: `Story begins: ${storyStart.substring(0, 50)}${storyStart.length > 50 ? '...' : ''}`, 
          isSelected: true 
        }
      ]);
      
      setShowStoryCanvas(true);
      
      toast({
        title: "Story Created!",
        description: "Your magical story has begun. What happens next?",
      });
    } catch (error) {
      console.error('Error generating story:', error);
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "The magic quill ran out of ink. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const continueStory = async () => {
    if (!storyId || !selectedChoice) {
      toast({
        variant: "destructive",
        title: "Wait!",
        description: "Please select what happens next in your story.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Add the selected choice to the story nodes
      const selectedChoiceNode = choices.find(choice => choice.id === selectedChoice);
      if (selectedChoiceNode) {
        setStoryNodes(prevNodes => [
          ...prevNodes,
          { 
            id: `choice-${selectedChoice}`, 
            text: selectedChoiceNode.text.substring(0, 50) + (selectedChoiceNode.text.length > 50 ? '...' : ''), 
            isSelected: true 
          }
        ]);
      }

      if (selectedChoice.startsWith('E')) {
        const response = await fetch('http://localhost:8000/end_story/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            story_id: storyId
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to end story');
        }
        
        const data = await response.json();
        setStoryText(prevText => prevText + "\n\n" + data.story_text);
        setChoices([]);
        
        // Add the ending to the storyNodes
        setStoryNodes(prevNodes => [
          ...prevNodes,
          { id: 'story-end', text: 'The End', isSelected: true }
        ]);
        
        toast({
          title: "The End!",
          description: "Your magical story has concluded beautifully.",
        });
      } else {
        // Continue the story with chosen option
        const response = await fetch('http://localhost:8000/continue_story/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            story_id: storyId,
            choice: selectedChoice,
            word_count: wordCount,
            story_progress_length: progressLength
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to continue story');
        }
        
        const data = await response.json();
        setStoryText(prevText => prevText + "\n\n" + data.story_text);
        setChoices(data.choices.map((choice, index) => ({
          id: String.fromCharCode(65 + index),
          text: choice
        })));
        
        toast({
          title: "Story Continues!",
          description: "The adventure unfolds! What will you choose next?",
        });
      }
    } catch (error) {
      console.error('Error continuing story:', error);
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "The magical quill stumbled. Please try again.",
      });
    } finally {
      setIsLoading(false);
      setSelectedChoice('');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="story-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-between items-center"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2 font-display">Create Your Story</h1>
              <p className="text-muted-foreground">Start with a template or create from scratch!</p>
            </div>
          </motion.div>

          {storyId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <StoryCanvas 
                storyId={storyId}
                storyText={storyText}
                choices={choices.map(choice => choice.text)}
                onChoiceSelect={setSelectedChoice}
                isVisible={showStoryCanvas}
                selectedChoice={selectedChoice}
                storyNodes={storyNodes}
              />
              
              {choices.length > 0 && (
                <div className="mt-4 flex justify-center">
                  <CustomButton
                    variant="primary"
                    icon={<Sparkles className="w-5 h-5" />}
                    onClick={continueStory}
                    isLoading={isLoading}
                    disabled={isLoading || !selectedChoice}
                  >
                    {selectedChoice.startsWith('E') ? 'End Story' : 'Continue Story'}
                  </CustomButton>
                </div>
              )}
            </motion.div>
          )}

          {!storyId && (
            <>
              <StoryTemplate 
                onSelectTemplate={handleSelectTemplate} 
                selectedTemplate={selectedTemplate} 
              />
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mt-8"
              >
                <motion.div variants={itemVariants}>
                  <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-primary/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        <Wand2 className="w-5 h-5 text-primary mr-2" />
                        <h2 className="text-xl font-bold">AI Story Generator</h2>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Genre</label>
                            <Select value={genre} onValueChange={setGenre}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a genre" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fantasy">Fantasy</SelectItem>
                                <SelectItem value="adventure">Adventure</SelectItem>
                                <SelectItem value="mystery">Mystery</SelectItem>
                                <SelectItem value="science fiction">Science Fiction</SelectItem>
                                <SelectItem value="fairy tale">Fairy Tale</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Style</label>
                            <Select value={style} onValueChange={setStyle}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a style" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="children's">Children's</SelectItem>
                                <SelectItem value="whimsical">Whimsical</SelectItem>
                                <SelectItem value="educational">Educational</SelectItem>
                                <SelectItem value="funny">Funny</SelectItem>
                                <SelectItem value="epic">Epic</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Story Start</label>
                            <Input 
                              value={storyStart} 
                              onChange={(e) => setStoryStart(e.target.value)}
                              placeholder="Once upon a time..." 
                              className="bg-white/70"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <label className="text-sm font-medium">Word Count</label>
                              <span className="text-sm text-muted-foreground">{wordCount} words</span>
                            </div>
                            <Slider
                              value={[wordCount]}
                              min={300}
                              max={1000}
                              step={100}
                              onValueChange={(value) => setWordCount(value[0])}
                              className="w-full"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <label className="text-sm font-medium">Progress Length</label>
                              <span className="text-sm text-muted-foreground">{progressLength} words</span>
                            </div>
                            <Slider
                              value={[progressLength]}
                              min={100}
                              max={500}
                              step={50}
                              onValueChange={(value) => setProgressLength(value[0])}
                              className="w-full"
                            />
                          </div>
                          
                          <CustomButton
                            variant="primary"
                            icon={<Sparkles className="w-5 h-5" />}
                            onClick={startStory}
                            isLoading={isLoading}
                            disabled={isLoading || !storyStart.trim()}
                            className="w-full mt-4"
                          >
                            Generate Story
                          </CustomButton>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mt-8"
              >
                <motion.div variants={itemVariants}>
                  <StoryCanvas isVisible={false} />
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8"
              >
                <StoryControls
                  onPlay={handlePlayStory}
                  isPlaying={isPlaying}
                  audioEnabled={audioEnabled}
                  onToggleAudio={handleToggleAudio}
                  onSave={() => {}}
                  onShare={() => {}}
                  onExport={() => {}}
                />
              </motion.div>
            </>
          )}
          
          {!storyId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20"
            >
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-primary/10 rounded-lg text-primary">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 font-display">Storytelling Tips</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2 text-primary font-medium">•</span>
                      <span>Every great story has a beginning, middle, and end.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary font-medium">•</span>
                      <span>Create interesting characters with unique personalities.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary font-medium">•</span>
                      <span>Add problems for your characters to solve.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-primary font-medium">•</span>
                      <span>Use descriptive words to paint pictures with your words.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateStory;
