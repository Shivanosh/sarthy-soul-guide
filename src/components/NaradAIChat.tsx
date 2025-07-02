import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Sparkles, Heart, Star, Moon, Sun } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  mood?: string;
}

interface AdminSettings {
  aiProvider: string;
  openaiApiKey: string;
  geminiApiKey: string;
  naradPersonality: string;
  meditationPrompts: string;
  astrologyPrompts: string;
}

const NaradAIChat = () => {
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '🙏 Namaste! I am Narad AI, your spiritual guide. I can help you with guided meditation, breathing exercises, and astrological insights. How can I assist you on your spiritual journey today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [adminSettings, setAdminSettings] = useState<AdminSettings | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadAdminSettings();
    scrollToBottom();
  }, [messages]);

  const loadAdminSettings = () => {
    const settings = localStorage.getItem('adminSettings');
    if (settings) {
      setAdminSettings(JSON.parse(settings));
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const detectMoodAndContext = (message: string): { mood: string; context: string } => {
    const lowerMessage = message.toLowerCase();
    
    // Mood detection
    let mood = 'neutral';
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
      mood = 'stressed';
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      mood = 'sad';
    } else if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated') || lowerMessage.includes('annoyed')) {
      mood = 'angry';
    } else if (lowerMessage.includes('happy') || lowerMessage.includes('joyful') || lowerMessage.includes('excited')) {
      mood = 'happy';
    } else if (lowerMessage.includes('peaceful') || lowerMessage.includes('calm') || lowerMessage.includes('relaxed')) {
      mood = 'peaceful';
    }

    // Context detection
    let context = 'general';
    if (lowerMessage.includes('meditat') || lowerMessage.includes('breath') || lowerMessage.includes('mindful')) {
      context = 'meditation';
    } else if (lowerMessage.includes('astrology') || lowerMessage.includes('horoscope') || lowerMessage.includes('zodiac') || lowerMessage.includes('birth chart')) {
      context = 'astrology';
    } else if (lowerMessage.includes('spiritual') || lowerMessage.includes('enlighten') || lowerMessage.includes('chakra')) {
      context = 'spiritual';
    }

    return { mood, context };
  };

  const callOpenAI = async (prompt: string): Promise<string> => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${adminSettings?.openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: adminSettings?.naradPersonality || 'You are a wise spiritual guide.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const callGemini = async (prompt: string): Promise<string> => {
    const systemPrompt = adminSettings?.naradPersonality || 'You are a wise spiritual guide.';
    const fullPrompt = `${systemPrompt}\n\nUser: ${prompt}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${adminSettings?.geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: fullPrompt
              }
            ]
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error('Gemini API request failed');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  };

  const getFallbackResponse = (mood: string, context: string): string => {
    const responses = {
      meditation: {
        stressed: "🧘‍♀️ I sense you're feeling stressed. Try this: Sit comfortably, close your eyes, and take 5 deep breaths. Inhale for 4 counts, hold for 4, exhale for 6. With each exhale, imagine releasing tension.",
        sad: "💙 When sadness visits, it's okay to feel it. Try a loving-kindness meditation: Place your hand on your heart and repeat 'May I be happy, may I be peaceful, may I be free from suffering.'",
        angry: "🔥 Anger is energy seeking release. Try the cooling breath: Inhale through pursed lips as if sipping cool air, then exhale slowly through your nose. Repeat 10 times.",
        happy: "✨ Beautiful energy! Use this joy in gratitude meditation: Close your eyes and think of 3 things you're grateful for. Feel the warmth in your heart expand with each one.",
        peaceful: "🌸 What a wonderful state! Maintain this peace with mindful breathing: Simply observe your natural breath without changing it. Notice the pause between inhale and exhale.",
        neutral: "🙏 Let's begin with a simple mindfulness practice: Focus on your breath for 5 minutes. When your mind wanders, gently return to your breathing."
      },
      astrology: {
        stressed: "⭐ The stars suggest this stress may be temporary. Focus on grounding practices - connect with earth energy through walking barefoot or holding crystals.",
        sad: "🌙 The moon's cycles remind us that emotions ebb and flow. This sadness too shall pass. Water signs benefit from emotional release through journaling.",
        angry: "🔥 Fire energy is strong in you now. Channel it constructively through physical activity or creative expression. Mars energy needs movement.",
        happy: "☀️ Jupiter's positive influence shines through you! Share this joy with others - your light can brighten someone else's day.",
        peaceful: "💫 Venus energy surrounds you with harmony. This is perfect timing for artistic pursuits or deepening relationships.",
        neutral: "🌟 The cosmic energies are balanced for you right now. Good time for setting intentions and planning your path forward."
      },
      spiritual: {
        stressed: "🕉️ Stress disconnects us from our true self. Chant 'Om' three times, feeling the vibration in your body. This reconnects you to universal consciousness.",
        sad: "💖 Your heart chakra needs healing. Visualize green healing light filling your chest. Send loving energy to yourself first, then to others.",
        angry: "⚡ This anger may be your soul's call for justice or change. Honor the message, then release the emotion through forgiveness practices.",
        happy: "🌟 Your soul is radiating joy! This is your natural state. Meditation and spiritual practice have awakened your inner light.",
        peaceful: "🕊️ You've touched the peace that passes understanding. Stay present with this feeling - it's your connection to the divine.",
        neutral: "🙏 Your spiritual journey continues. Each moment of awareness is sacred. Trust the process of your awakening."
      }
    };

    return responses[context as keyof typeof responses]?.[mood as keyof typeof responses.meditation] || 
           "🙏 I'm here to guide you on your spiritual path. Feel free to ask about meditation, astrology, or spiritual guidance.";
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { mood, context } = detectMoodAndContext(inputMessage);
      let aiResponse = '';

      if (adminSettings?.aiProvider && 
          ((adminSettings.aiProvider === 'openai' && adminSettings.openaiApiKey) ||
           (adminSettings.aiProvider === 'gemini' && adminSettings.geminiApiKey))) {
        
        const enhancedPrompt = `Context: ${context}, User mood: ${mood}. ${inputMessage}`;
        
        if (adminSettings.aiProvider === 'openai') {
          aiResponse = await callOpenAI(enhancedPrompt);
        } else if (adminSettings.aiProvider === 'gemini') {
          aiResponse = await callGemini(enhancedPrompt);
        }
      } else {
        aiResponse = getFallbackResponse(mood, context);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
        mood
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('AI API Error:', error);
      const { mood, context } = detectMoodAndContext(inputMessage);
      const fallbackResponse = getFallbackResponse(mood, context);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: fallbackResponse,
        isUser: false,
        timestamp: new Date(),
        mood
      };

      setMessages(prev => [...prev, botMessage]);
      toast.error('Using offline guidance. Configure API keys in admin settings for enhanced responses.');
    } finally {
      setIsLoading(false);
    }
  };

  const getMoodIcon = (mood?: string) => {
    switch (mood) {
      case 'happy': return <Sun className="h-4 w-4 text-yellow-500" />;
      case 'sad': return <Moon className="h-4 w-4 text-blue-500" />;
      case 'stressed': return <Star className="h-4 w-4 text-red-500" />;
      case 'peaceful': return <Heart className="h-4 w-4 text-green-500" />;
      case 'angry': return <Sparkles className="h-4 w-4 text-orange-500" />;
      default: return <Bot className="h-4 w-4 text-purple-500" />;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className={`w-full mx-auto flex flex-col ${isMobile ? 'h-[80vh] max-w-full' : 'h-[600px] max-w-4xl'}`}>
      <CardHeader className={`bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-white rounded-t-lg ${isMobile ? 'p-3' : 'p-6'}`}>
        <CardTitle className={`flex items-center justify-between ${isMobile ? 'text-lg' : 'text-xl'}`}>
          <div className="flex items-center space-x-2">
            <Bot className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
            <span className={isMobile ? 'text-sm' : ''}>Narad AI - Spiritual Guide</span>
          </div>
          <Badge variant="secondary" className={`bg-white/20 text-white ${isMobile ? 'text-xs px-2 py-1' : ''}`}>
            {adminSettings?.aiProvider === 'openai' && adminSettings.openaiApiKey ? 'GPT Powered' :
             adminSettings?.aiProvider === 'gemini' && adminSettings.geminiApiKey ? 'Gemini Powered' :
             'Offline Mode'}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className={`flex-1 overflow-y-auto space-y-3 ${isMobile ? 'p-3' : 'p-4'}`}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`${isMobile ? 'max-w-[85%]' : 'max-w-[80%]'} p-3 rounded-lg ${
                  message.isUser
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {!message.isUser && (
                    <div className="flex-shrink-0 mt-1">
                      {getMoodIcon(message.mood)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`whitespace-pre-wrap break-words ${isMobile ? 'text-sm' : ''}`}>
                      {message.content}
                    </p>
                    <p className={`text-xs mt-1 ${message.isUser ? 'text-orange-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  {message.isUser && (
                    <User className="h-4 w-4 mt-1 flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-purple-500 animate-pulse" />
                  <span className={`text-gray-600 ${isMobile ? 'text-sm' : ''}`}>
                    Narad AI is thinking...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className={`border-t bg-white ${isMobile ? 'p-3' : 'p-4'}`}>
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isMobile ? "Ask about meditation..." : "Ask about meditation, astrology, or spiritual guidance..."}
              className={`flex-1 ${isMobile ? 'text-sm' : ''}`}
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className={`bg-gradient-to-r from-orange-500 to-green-500 ${isMobile ? 'px-3' : ''}`}
              size={isMobile ? "sm" : "default"}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NaradAIChat;
