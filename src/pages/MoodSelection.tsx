import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Heart, Brain, Smile, Frown, Meh, Sun, Moon, Cloud, Zap, Play, Pause, RotateCcw, Star, Clock } from 'lucide-react';
import { toast } from 'sonner';
import MeditationTimer from '@/components/meditation/MeditationTimer';
import BreathingExercise from '@/components/meditation/BreathingExercise';
import AmbientSounds from '@/components/meditation/AmbientSounds';
import MeditationStats from '@/components/meditation/MeditationStats';
import GuidedMeditation from '@/components/meditation/GuidedMeditation';

const MoodSelection = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<string>('');
  const [meditationProgress, setMeditationProgress] = useState(0);
  const [isTracking, setIsTracking] = useState(false);

  const moods = [
    { id: 'happy', name: 'Joyful', icon: Smile, color: 'bg-yellow-500', description: 'Feeling blessed and grateful', mantra: 'Om Gam Ganapataye Namaha' },
    { id: 'peaceful', name: 'Peaceful', icon: Sun, color: 'bg-blue-500', description: 'Calm and centered', mantra: 'Om Shanti Shanti Shanti' },
    { id: 'anxious', name: 'Anxious', icon: Cloud, color: 'bg-gray-500', description: 'Worried or restless', mantra: 'Om Gam Ganapataye Namaha' },
    { id: 'sad', name: 'Melancholy', icon: Frown, color: 'bg-purple-500', description: 'Feeling low or contemplative', mantra: 'Om Tryambakam Yajamahe' },
    { id: 'energetic', name: 'Energetic', icon: Zap, color: 'bg-green-500', description: 'Full of vitality', mantra: 'Om Hanumate Namaha' },
    { id: 'tired', name: 'Tired', icon: Moon, color: 'bg-indigo-500', description: 'Seeking rest and renewal', mantra: 'Om Namo Bhagavate Vasudevaya' },
    { id: 'confused', name: 'Confused', icon: Meh, color: 'bg-orange-500', description: 'Seeking clarity', mantra: 'Om Aim Saraswatyai Namaha' },
    { id: 'grateful', name: 'Grateful', icon: Heart, color: 'bg-pink-500', description: 'Thankful and blessed', mantra: 'Om Sri Mahalakshmyai Namaha' }
  ];

  const moodRecommendations = {
    happy: [
      { type: 'Meditation', title: 'Gratitude Meditation', duration: '10 min', description: 'Amplify your joy with thankfulness', audioUrl: '/audio/gratitude.mp3', points: 50 },
      { type: 'Chant', title: 'Hanuman Chalisa', duration: '15 min', description: 'Celebrate strength and devotion', audioUrl: '/audio/hanuman.mp3', points: 75 },
      { type: 'Music', title: 'Bhajans Collection', duration: '30 min', description: 'Uplifting devotional songs', audioUrl: '/audio/bhajans.mp3', points: 100 }
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

  const [showTimer, setShowTimer] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showGuided, setShowGuided] = useState(false);

  const handleMoodSelect = async (moodId: string) => {
    setSelectedMood(moodId);
    setLoading(true);
    
    // Store today's mood
    localStorage.setItem('todaysMood', moods.find(m => m.id === moodId)?.name || '');
    
    // Simulate enhanced Narad AI processing
    setTimeout(() => {
      const recs = moodRecommendations[moodId as keyof typeof moodRecommendations] || [];
      setRecommendations(recs);
      setLoading(false);
      toast.success('Narad AI has personalized recommendations for you!');
    }, 2000);
  };

  const startPractice = (recommendation: any) => {
    setPlayingTrack(recommendation.title);
    setIsTracking(true);
    setMeditationProgress(0);
    
    toast.success(`Starting ${recommendation.title}...`);
    
    // Simulate meditation progress
    const duration = parseInt(recommendation.duration) * 60; // Convert to seconds
    const interval = setInterval(() => {
      setMeditationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTracking(false);
          setPlayingTrack('');
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

  const handleMeditationComplete = (sessionData?: { duration: number; type: string; points: number }) => {
    // Update stats in localStorage
    const currentStats = JSON.parse(localStorage.getItem('meditationStats') || '{}');
    const today = new Date().toDateString();
    const lastSession = currentStats.lastSessionDate ? new Date(currentStats.lastSessionDate).toDateString() : null;
    
    // Calculate streak
    let newStreak = currentStats.streak || 0;
    if (lastSession !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastSession === yesterday.toDateString()) {
        newStreak += 1;
      } else if (lastSession !== today) {
        newStreak = 1; // Reset streak if gap
      }
    }

    // Calculate weekly sessions
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const thisWeekSessions = (currentStats.thisWeekSessions || []).filter(
      (date: string) => new Date(date) > weekAgo
    );
    
    if (lastSession !== today) {
      thisWeekSessions.push(today);
    }

    const points = sessionData?.points || 50;
    
    const updatedStats = {
      ...currentStats,
      totalSessions: (currentStats.totalSessions || 0) + 1,
      totalMinutes: (currentStats.totalMinutes || 0) + (sessionData?.duration || 10),
      lastSessionDate: new Date().toISOString(),
      experiencePoints: (currentStats.experiencePoints || 0) + points,
      streak: newStreak,
      completedThisWeek: thisWeekSessions.length,
      thisWeekSessions: thisWeekSessions
    };
    
    localStorage.setItem('meditationStats', JSON.stringify(updatedStats));
    
    toast.success(`🎉 Session completed! +${points} XP earned`);
  };

  const selectedMoodData = moods.find(m => m.id === selectedMood);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header with Tricolour theme */}
      <div className="bg-tricolour text-white p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-white/10 to-green-600/90"></div>
        <div className="relative max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6" />
              <h1 className="text-xl font-bold">Narad AI Mood Meditation</h1>
            </div>
          </div>
          
          {/* Enhanced Navigation */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowStats(!showStats)}
              className="text-white hover:bg-white/20"
            >
              <Star className="h-4 w-4 mr-1" />
              Stats
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTimer(!showTimer)}
              className="text-white hover:bg-white/20"
            >
              <Clock className="h-4 w-4 mr-1" />
              Timer
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBreathing(!showBreathing)}
              className="text-white hover:bg-white/20"
            >
              🫁 Breathing
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowGuided(!showGuided)}
              className="text-white hover:bg-white/20"
            >
              🎧 Guided
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Show meditation tools when requested */}
        {showStats && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Your Meditation Journey</h2>
              <Button variant="ghost" onClick={() => setShowStats(false)}>✕</Button>
            </div>
            <MeditationStats />
          </div>
        )}

        {showGuided && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Guided Meditations</h2>
              <Button variant="ghost" onClick={() => setShowGuided(false)}>✕</Button>
            </div>
            <GuidedMeditation onComplete={handleMeditationComplete} />
          </div>
        )}

        {showTimer && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Meditation Timer</h2>
              <Button variant="ghost" onClick={() => setShowTimer(false)}>✕</Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MeditationTimer onComplete={() => handleMeditationComplete()} />
              <AmbientSounds />
            </div>
          </div>
        )}

        {showBreathing && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Breathing Exercises</h2>
              <Button variant="ghost" onClick={() => setShowBreathing(false)}>✕</Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <BreathingExercise technique="box" onComplete={() => handleMeditationComplete()} />
              <BreathingExercise technique="478" onComplete={() => handleMeditationComplete()} />
              <BreathingExercise technique="triangle" onComplete={() => handleMeditationComplete()} />
            </div>
          </div>
        )}

        {/* Original mood selection content */}
        {!selectedMood ? (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">How are you feeling today? 🧘‍♀️</h2>
              <p className="text-lg text-gray-600">Select your current mood and let Narad AI guide your spiritual practice</p>
            </div>

            {/* Quick Tools Section */}
            <div className="mb-8 p-6 bg-gradient-to-r from-saffron/5 to-indian-green/5 rounded-xl border border-saffron/20">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Quick Meditation Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button
                  onClick={() => setShowTimer(true)}
                  className="h-20 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex flex-col hover-lift"
                >
                  <Clock className="h-6 w-6 mb-1" />
                  <span>Timer</span>
                </Button>
                <Button
                  onClick={() => setShowBreathing(true)}
                  className="h-20 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex flex-col hover-lift"
                >
                  <span className="text-2xl mb-1">🫁</span>
                  <span>Breathing</span>
                </Button>
                <Button
                  onClick={() => setShowGuided(true)}
                  className="h-20 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white flex flex-col hover-lift"
                >
                  <span className="text-2xl mb-1">🎧</span>
                  <span>Guided</span>
                </Button>
                <Button
                  onClick={() => setShowStats(true)}
                  className="h-20 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white flex flex-col hover-lift"
                >
                  <Star className="h-6 w-6 mb-1" />
                  <span>Progress</span>
                </Button>
              </div>
            </div>

            {/* Mood selection grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {moods.map((mood) => {
                const IconComponent = mood.icon;
                return (
                  <Card 
                    key={mood.id}
                    className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-orange-200 card-premium hover-lift"
                    onClick={() => handleMoodSelect(mood.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 ${mood.color} rounded-full flex items-center justify-center mx-auto mb-3 hover:animate-pulse shadow-lg`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">{mood.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{mood.description}</p>
                      <Badge className="text-xs bg-gradient-to-r from-orange-100 to-green-100 text-orange-800 border border-orange-200">
                        {mood.mantra.split(' ')[1]}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : loading ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-tricolour rounded-full flex items-center justify-center mx-auto mb-4 animate-spin relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-white/20 to-green-600/90"></div>
              <Brain className="relative h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Narad AI is analyzing your mood...</h2>
            <p className="text-gray-600">Personalizing your spiritual recommendations</p>
            <div className="mt-4 max-w-md mx-auto">
              <Progress value={Math.random() * 100} className="h-2" />
            </div>
          </div>
        ) : (
          <div>
            {/* Selected mood display */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className={`w-16 h-16 ${selectedMoodData?.color} rounded-full flex items-center justify-center`}>
                  {selectedMoodData && <selectedMoodData.icon className="h-8 w-8 text-white" />}
                </div>
                <div className="text-left">
                  <h2 className="text-3xl font-bold text-gray-800">
                    Personalized for your {selectedMoodData?.name.toLowerCase()} mood
                  </h2>
                  <p className="text-lg text-gray-600">Narad AI recommends these practices for you today</p>
                  <Badge className="mt-2 bg-orange-100 text-orange-800">
                    Mantra: {selectedMoodData?.mantra}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Active practice tracking */}
            {isTracking && (
              <Card className="mb-6 border-2 border-orange-500 bg-gradient-to-r from-orange-50 to-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-orange-800">🧘‍♀️ Currently Practicing: {playingTrack}</h3>
                    <Button size="sm" variant="outline" onClick={resetProgress} className="text-gray-600">
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                  </div>
                  <Progress value={meditationProgress} className="h-3 mb-2" />
                  <p className="text-sm text-gray-600">{Math.round(meditationProgress)}% complete</p>
                </CardContent>
              </Card>
            )}

            {/* Recommendations grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {recommendations.map((rec, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-400">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-orange-100 text-orange-800 text-xs">
                          {rec.type}
                        </Badge>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          +{rec.points}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600">
                      {rec.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">{rec.duration}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">4.8</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                      onClick={() => startPractice(rec)}
                      disabled={isTracking && playingTrack !== rec.title}
                    >
                      {playingTrack === rec.title ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" />
                          Practicing...
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Start Practice
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center space-y-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedMood('');
                  setRecommendations([]);
                  setPlayingTrack('');
                  setIsTracking(false);
                  setMeditationProgress(0);
                  setShowTimer(false);
                  setShowBreathing(false);
                  setShowStats(false);
                  setShowGuided(false);
                }}
                className="mr-4 border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                Choose Different Mood
              </Button>
              <Button 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                onClick={() => navigate('/media-library')}
              >
                Explore More Content
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodSelection;
