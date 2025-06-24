import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Send, Bot, User, Heart, Brain, Smile, Frown, Meh, Sun, Moon, Cloud, Zap, Play, Pause, RotateCcw, Star, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'narad';
  timestamp: Date;
  mood?: string;
  recommendations?: any[];
  type?: 'meditation' | 'astrology' | 'general';
}

const NaradAIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<string>('');
  const [meditationProgress, setMeditationProgress] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [apiConnected, setApiConnected] = useState(false);

  const moods = [
    { id: 'happy', name: 'Joyful', icon: Smile, color: 'bg-yellow-500', keywords: ['happy', 'joy', 'blessed', 'grateful', 'excited', 'content'] },
    { id: 'peaceful', name: 'Peaceful', icon: Sun, color: 'bg-blue-500', keywords: ['peaceful', 'calm', 'serene', 'tranquil', 'relaxed'] },
    { id: 'anxious', name: 'Anxious', icon: Cloud, color: 'bg-gray-500', keywords: ['anxious', 'worried', 'stressed', 'nervous', 'restless'] },
    { id: 'sad', name: 'Melancholy', icon: Frown, color: 'bg-purple-500', keywords: ['sad', 'down', 'melancholy', 'depressed', 'lonely'] },
    { id: 'energetic', name: 'Energetic', icon: Zap, color: 'bg-green-500', keywords: ['energetic', 'motivated', 'active', 'dynamic'] },
    { id: 'tired', name: 'Tired', icon: Moon, color: 'bg-indigo-500', keywords: ['tired', 'exhausted', 'weary', 'sleepy'] },
    { id: 'confused', name: 'Confused', icon: Meh, color: 'bg-orange-500', keywords: ['confused', 'lost', 'uncertain', 'unclear'] },
    { id: 'grateful', name: 'Grateful', icon: Heart, color: 'bg-pink-500', keywords: ['grateful', 'thankful', 'appreciative', 'blessed'] }
  ];

  const moodRecommendations = {
    happy: [
      { type: 'Meditation', title: 'Gratitude Meditation', duration: '10 min', description: 'Amplify your joy with thankfulness', points: 50 },
      { type: 'Chant', title: 'Hanuman Chalisa', duration: '15 min', description: 'Celebrate strength and devotion', points: 75 },
      { type: 'Music', title: 'Bhajans Collection', duration: '30 min', description: 'Uplifting devotional songs', points: 100 }
    ],
    peaceful: [
      { type: 'Meditation', title: 'Inner Peace Meditation', duration: '20 min', description: 'Deepen your tranquility', points: 80 },
      { type: 'Mantra', title: 'Om Shanti Chanting', duration: '12 min', description: 'Peace mantra repetition', points: 60 },
      { type: 'Music', title: 'Flute Ragas', duration: '45 min', description: 'Soothing classical melodies', points: 120 }
    ],
    anxious: [
      { type: 'Meditation', title: 'Anxiety Relief Meditation', duration: '15 min', description: 'Calm your mind and heart', points: 70 },
      { type: 'Breathing', title: 'Pranayama Practice', duration: '10 min', description: 'Regulated breathing exercises', points: 50 },
      { type: 'Mantra', title: 'Ganesha Mantra', duration: '8 min', description: 'Remove obstacles and fear', points: 40 }
    ],
    sad: [
      { type: 'Meditation', title: 'Healing Heart Meditation', duration: '18 min', description: 'Comfort for difficult times', points: 80 },
      { type: 'Chant', title: 'Mahamrityunjaya Mantra', duration: '21 min', description: 'Healing and transformation', points: 100 },
      { type: 'Music', title: 'Soulful Bhajans', duration: '25 min', description: 'Devotional healing songs', points: 90 }
    ],
    energetic: [
      { type: 'Meditation', title: 'Dynamic Meditation', duration: '12 min', description: 'Channel your energy positively', points: 60 },
      { type: 'Chant', title: 'Durga Chalisa', duration: '14 min', description: 'Invoke divine power', points: 70 },
      { type: 'Music', title: 'Energetic Kirtans', duration: '20 min', description: 'Upbeat devotional music', points: 80 }
    ],
    tired: [
      { type: 'Meditation', title: 'Restorative Meditation', duration: '25 min', description: 'Deep rest and renewal', points: 100 },
      { type: 'Mantra', title: 'Om Meditation', duration: '15 min', description: 'Universal sound healing', points: 75 },
      { type: 'Music', title: 'Sleep Mantras', duration: '60 min', description: 'Peaceful sounds for rest', points: 150 }
    ],
    confused: [
      { type: 'Meditation', title: 'Clarity Meditation', duration: '16 min', description: 'Find your inner guidance', points: 80 },
      { type: 'Mantra', title: 'Saraswati Mantra', duration: '11 min', description: 'Wisdom and knowledge', points: 55 },
      { type: 'Reading', title: 'Bhagavad Gita Verses', duration: '20 min', description: 'Ancient wisdom for guidance', points: 85 }
    ],
    grateful: [
      { type: 'Meditation', title: 'Gratitude Practice', duration: '14 min', description: 'Expand your thankfulness', points: 70 },
      { type: 'Chant', title: 'Lakshmi Aarti', duration: '10 min', description: 'Appreciate abundance', points: 50 },
      { type: 'Music', title: 'Devotional Prayers', duration: '30 min', description: 'Songs of appreciation', points: 100 }
    ]
  };

  useEffect(() => {
    // Initialize with welcome message
    setMessages([{
      id: '1',
      text: 'Namaste! I am Narad AI, your personal spiritual guide and chatbot. I can help you with guided meditation, provide astrological insights, and offer spiritual guidance. Feel free to ask me about your mood, meditation practices, or seek astrological advice!',
      sender: 'narad',
      timestamp: new Date(),
      type: 'general'
    }]);

    // Check if API is configured
    checkApiConnection();
  }, []);

  const checkApiConnection = () => {
    const settings = localStorage.getItem('adminSettings');
    if (settings) {
      const { openaiApiKey } = JSON.parse(settings);
      setApiConnected(!!openaiApiKey);
    }
  };

  const detectMood = (text: string): string | null => {
    const lowercaseText = text.toLowerCase();
    
    for (const mood of moods) {
      for (const keyword of mood.keywords) {
        if (lowercaseText.includes(keyword)) {
          return mood.id;
        }
      }
    }
    return null;
  };

  const detectMessageType = (text: string): 'meditation' | 'astrology' | 'general' => {
    const lowercaseText = text.toLowerCase();
    
    const meditationKeywords = ['meditat', 'breath', 'relax', 'calm', 'peace', 'mindful', 'zen', 'yoga'];
    const astrologyKeywords = ['astrology', 'horoscope', 'zodiac', 'birth chart', 'planet', 'star', 'cosmic', 'celestial'];
    
    const hasMeditation = meditationKeywords.some(keyword => lowercaseText.includes(keyword));
    const hasAstrology = astrologyKeywords.some(keyword => lowercaseText.includes(keyword));
    
    if (hasMeditation) return 'meditation';
    if (hasAstrology) return 'astrology';
    return 'general';
  };

  const callChatGPT = async (userMessage: string, messageType: 'meditation' | 'astrology' | 'general'): Promise<string> => {
    const settings = localStorage.getItem('adminSettings');
    if (!settings) {
      return "I need to be configured with an API key first. Please ask your admin to set up my connection.";
    }

    const { openaiApiKey, naradPersonality, meditationPrompts, astrologyPrompts } = JSON.parse(settings);
    
    if (!openaiApiKey) {
      return "My OpenAI connection isn't configured yet. Please ask your admin to add the API key.";
    }

    let systemPrompt = naradPersonality;
    
    if (messageType === 'meditation') {
      systemPrompt += ` ${meditationPrompts}`;
    } else if (messageType === 'astrology') {
      systemPrompt += ` ${astrologyPrompts}`;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('API call failed');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('ChatGPT API error:', error);
      return "I'm having trouble connecting to my AI brain right now. Let me give you some traditional guidance instead.";
    }
  };

  const generateFallbackResponse = (userInput: string, detectedMood: string | null, messageType: 'meditation' | 'astrology' | 'general'): string => {
    if (messageType === 'meditation') {
      return "Let me guide you through a simple meditation. Find a comfortable position, close your eyes, and focus on your breath. Inhale slowly for 4 counts, hold for 4, then exhale for 4. Let your thoughts pass like clouds in the sky.";
    }
    
    if (messageType === 'astrology') {
      return "The cosmos holds many mysteries! While I'd love to provide personalized astrological insights, consider how the current planetary alignments might be influencing your spiritual journey. Each zodiac sign has unique spiritual gifts - what's yours?";
    }
    
    if (detectedMood) {
      const moodData = moods.find(m => m.id === detectedMood);
      return `I sense you're feeling ${moodData?.name.toLowerCase()}. This is a valuable emotional state that can guide your spiritual practice. Let me recommend some practices that align with your current energy.`;
    }
    
    return "Thank you for sharing with me. As your spiritual guide, I'm here to help you on your journey. Feel free to ask about meditation, astrology, or share what's on your heart today.";
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const detectedMood = detectMood(input);
    const messageType = detectMessageType(input);
    
    try {
      let aiResponse;
      if (apiConnected) {
        aiResponse = await callChatGPT(input, messageType);
      } else {
        aiResponse = generateFallbackResponse(input, detectedMood, messageType);
      }
      
      const recommendations = detectedMood ? moodRecommendations[detectedMood as keyof typeof moodRecommendations] : undefined;
      
      const naradMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'narad',
        timestamp: new Date(),
        mood: detectedMood || undefined,
        recommendations,
        type: messageType
      };

      setMessages(prev => [...prev, naradMessage]);

      if (detectedMood) {
        const moodData = moods.find(m => m.id === detectedMood);
        localStorage.setItem('todaysMood', moodData?.name || '');
        toast.success(`Mood detected: ${moodData?.name}! Personalized recommendations ready.`);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "I'm experiencing some technical difficulties. Please try again in a moment.",
        sender: 'narad',
        timestamp: new Date(),
        type: 'general'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const startPractice = (recommendation: any) => {
    setPlayingTrack(recommendation.title);
    setIsTracking(true);
    setMeditationProgress(0);
    
    toast.success(`Starting ${recommendation.title}...`);
    
    const duration = parseInt(recommendation.duration) * 60;
    const interval = setInterval(() => {
      setMeditationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTracking(false);
          setPlayingTrack('');
          
          const currentStats = JSON.parse(localStorage.getItem('meditationStats') || '{}');
          const updatedStats = {
            ...currentStats,
            totalSessions: (currentStats.totalSessions || 0) + 1,
            totalMinutes: (currentStats.totalMinutes || 0) + parseInt(recommendation.duration),
            lastSessionDate: new Date().toISOString(),
            experiencePoints: (currentStats.experiencePoints || 0) + recommendation.points
          };
          localStorage.setItem('meditationStats', JSON.stringify(updatedStats));
          
          toast.success(`🎉 Practice completed! +${recommendation.points} spiritual points earned`);
          return 100;
        }
        return prev + (100 / duration);
      });
    }, 1000);
  };

  const resetProgress = () => {
    setMeditationProgress(0);
    setIsTracking(false);
    setPlayingTrack('');
    toast.info('Practice reset');
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-orange-50 to-green-50">
      {/* Connection Status */}
      <div className="p-2 bg-gradient-to-r from-orange-100 to-green-100 border-b">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${apiConnected ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span className="text-gray-700">
              {apiConnected ? 'AI Enhanced Mode' : 'Basic Mode'}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Sparkles className="h-3 w-3 text-orange-500" />
            <span className="text-gray-600 text-xs">Meditation & Astrology Guide</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'bg-orange-500 text-white' : 'bg-white text-gray-800'} rounded-lg p-3 shadow-lg`}>
              <div className="flex items-center space-x-2 mb-2">
                {message.sender === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4 text-orange-500" />
                )}
                <span className="font-semibold text-sm">
                  {message.sender === 'user' ? 'You' : 'Narad AI'}
                </span>
                {message.type && message.sender === 'narad' && (
                  <Badge className={`text-xs ${
                    message.type === 'meditation' ? 'bg-blue-100 text-blue-700' :
                    message.type === 'astrology' ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {message.type}
                  </Badge>
                )}
              </div>
              <p className="text-sm leading-relaxed">{message.text}</p>
              
              {/* Mood Detection Display */}
              {message.mood && (
                <div className="mt-3">
                  <Badge className="bg-orange-100 text-orange-700 mb-2">
                    Detected Mood: {moods.find(m => m.id === message.mood)?.name}
                  </Badge>
                </div>
              )}
              
              {/* Recommendations */}
              {message.recommendations && (
                <div className="mt-4 space-y-3">
                  <h4 className="font-semibold text-orange-700">Personalized Recommendations:</h4>
                  {message.recommendations.map((rec, index) => (
                    <Card key={index} className="bg-orange-50 border border-orange-200">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-gray-800 text-sm">{rec.title}</h5>
                          <div className="flex items-center space-x-1">
                            <Badge className="bg-orange-100 text-orange-700 text-xs">{rec.type}</Badge>
                            <Badge className="bg-green-100 text-green-700 text-xs">+{rec.points}</Badge>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{rec.duration}</span>
                          <Button 
                            size="sm" 
                            className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1"
                            onClick={() => startPractice(rec)}
                            disabled={isTracking && playingTrack !== rec.title}
                          >
                            {playingTrack === rec.title ? (
                              <>
                                <Pause className="mr-1 h-3 w-3" />
                                Practicing...
                              </>
                            ) : (
                              <>
                                <Play className="mr-1 h-3 w-3" />
                                Start
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 rounded-lg p-3 shadow-lg">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4 text-orange-500" />
                <span className="font-semibold text-sm">Narad AI</span>
              </div>
              <div className="flex items-center space-x-1 mt-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Active Practice Tracking */}
      {isTracking && (
        <div className="border-t border-orange-200 p-4 bg-orange-50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-orange-800 text-sm">🧘‍♀️ Currently Practicing: {playingTrack}</h3>
            <Button size="sm" variant="outline" onClick={resetProgress} className="text-gray-600 text-xs">
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </div>
          <Progress value={meditationProgress} className="h-2 mb-1" />
          <p className="text-xs text-gray-600">{Math.round(meditationProgress)}% complete</p>
        </div>
      )}
      
      {/* Input Area */}
      <div className="border-t border-orange-200 p-4 bg-white">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about meditation, astrology, or share your feelings..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 border-orange-200 focus:border-orange-500"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Try: "I feel anxious", "What's my horoscope?", "Guide me through meditation", etc.
        </div>
      </div>
    </div>
  );
};

export default NaradAIChat;
