
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, User, Clock, Star } from 'lucide-react';
import { toast } from 'sonner';

interface GuidedMeditationProps {
  onComplete?: (sessionData: { duration: number; type: string; points: number }) => void;
}

const GuidedMeditation = ({ onComplete }: GuidedMeditationProps) => {
  const [selectedSession, setSelectedSession] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');

  const sessions = [
    {
      id: 'mindfulness-basic',
      title: 'Mindfulness Basics',
      instructor: 'Narad AI',
      duration: 10,
      difficulty: 'Beginner',
      description: 'Learn the fundamentals of mindful breathing and awareness',
      phases: ['Welcome & Setup', 'Breathing Awareness', 'Body Scan', 'Mindful Observation', 'Gentle Return'],
      points: 100,
      category: 'Mindfulness'
    },
    {
      id: 'stress-relief',
      title: 'Stress Relief',
      instructor: 'Narad AI',
      duration: 15,
      difficulty: 'Intermediate',
      description: 'Release tension and find calm in challenging moments',
      phases: ['Grounding', 'Tension Release', 'Deep Breathing', 'Visualization', 'Integration'],
      points: 150,
      category: 'Healing'
    },
    {
      id: 'loving-kindness',
      title: 'Loving Kindness',
      instructor: 'Narad AI',
      duration: 12,
      difficulty: 'Beginner',
      description: 'Cultivate compassion for yourself and others',
      phases: ['Self-Love', 'Loved Ones', 'Neutral People', 'Difficult People', 'All Beings'],
      points: 120,
      category: 'Heart'
    },
    {
      id: 'chakra-balance',
      title: 'Chakra Balancing',
      instructor: 'Narad AI',
      duration: 20,
      difficulty: 'Advanced',
      description: 'Align and energize your seven chakras',
      phases: ['Root Chakra', 'Sacral Chakra', 'Solar Plexus', 'Heart Chakra', 'Throat Chakra', 'Third Eye', 'Crown Chakra'],
      points: 200,
      category: 'Energy'
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && selectedSession) {
      const session = sessions.find(s => s.id === selectedSession);
      if (!session) return;
      
      const totalDuration = session.duration * 60; // Convert to seconds
      const phaseLength = totalDuration / session.phases.length;
      
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / totalDuration);
          
          // Update current phase
          const currentPhaseIndex = Math.floor((newProgress / 100) * session.phases.length);
          setCurrentPhase(session.phases[Math.min(currentPhaseIndex, session.phases.length - 1)]);
          
          if (newProgress >= 100) {
            setIsPlaying(false);
            setProgress(100);
            onComplete?.({
              duration: session.duration,
              type: session.category,
              points: session.points
            });
            toast.success(`🧘‍♀️ "${session.title}" completed! +${session.points} XP earned`);
            return 100;
          }
          
          return newProgress;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, selectedSession, onComplete]);

  const handleSessionStart = (sessionId: string) => {
    if (selectedSession === sessionId && isPlaying) {
      setIsPlaying(false);
      return;
    }

    setSelectedSession(sessionId);
    setProgress(0);
    setIsPlaying(true);
    
    const session = sessions.find(s => s.id === sessionId);
    toast.success(`🧘‍♀️ Starting "${session?.title}" meditation`);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentPhase('');
    setSelectedSession('');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mindfulness': return '🧠';
      case 'Healing': return '💚';
      case 'Heart': return '❤️';
      case 'Energy': return '⚡';
      default: return '🧘‍♀️';
    }
  };

  const currentSession = sessions.find(s => s.id === selectedSession);

  return (
    <Card className="card-premium hover-lift">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center">
          🎧 Guided Meditations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Active Session Display */}
        {selectedSession && (
          <div className="p-4 bg-gradient-to-r from-purple-50 via-white to-pink-50 rounded-xl border-2 border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{currentSession?.title}</h3>
                <p className="text-sm text-gray-600 flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {currentSession?.instructor}
                </p>
              </div>
              <div className="text-right">
                <Badge className={getDifficultyColor(currentSession?.difficulty || '')}>
                  {currentSession?.difficulty}
                </Badge>
              </div>
            </div>
            
            {/* Progress */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{currentPhase || 'Ready to begin'}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-3">
              <Button
                size="lg"
                onClick={() => handleSessionStart(selectedSession)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8"
              >
                {isPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                {isPlaying ? 'Pause' : 'Continue'}
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleReset}
                className="border-gray-300 hover:bg-gray-50"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        )}

        {/* Session Selection */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-700 text-sm uppercase tracking-wider flex items-center">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2"></div>
            Available Sessions
          </h4>
          
          {sessions.map(session => (
            <Card 
              key={session.id} 
              className={`cursor-pointer transition-all duration-300 hover-lift ${
                selectedSession === session.id 
                  ? 'border-2 border-purple-400 shadow-lg' 
                  : 'border hover:border-purple-200'
              }`}
              onClick={() => handleSessionStart(session.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{getCategoryIcon(session.category)}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800 flex items-center">
                        {session.title}
                        {selectedSession === session.id && isPlaying && (
                          <div className="ml-2 flex space-x-1">
                            <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0ms'}}></div>
                            <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '150ms'}}></div>
                            <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '300ms'}}></div>
                          </div>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{session.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {session.duration} min
                        </span>
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          +{session.points} XP
                        </span>
                        <span className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {session.instructor}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(session.difficulty)}>
                    {session.difficulty}
                  </Badge>
                </div>
                
                {/* Phase Preview */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {session.phases.slice(0, 3).map((phase, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {phase}
                    </Badge>
                  ))}
                  {session.phases.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{session.phases.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GuidedMeditation;
