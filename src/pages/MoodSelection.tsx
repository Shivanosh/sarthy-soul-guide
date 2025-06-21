
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Heart, Brain, Smile, Frown, Meh, Sun, Moon, Cloud, Zap } from 'lucide-react';
import { toast } from 'sonner';

const MoodSelection = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const moods = [
    { id: 'happy', name: 'Joyful', icon: Smile, color: 'bg-yellow-500', description: 'Feeling blessed and grateful' },
    { id: 'peaceful', name: 'Peaceful', icon: Sun, color: 'bg-blue-500', description: 'Calm and centered' },
    { id: 'anxious', name: 'Anxious', icon: Cloud, color: 'bg-gray-500', description: 'Worried or restless' },
    { id: 'sad', name: 'Melancholy', icon: Frown, color: 'bg-purple-500', description: 'Feeling low or contemplative' },
    { id: 'energetic', name: 'Energetic', icon: Zap, color: 'bg-green-500', description: 'Full of vitality' },
    { id: 'tired', name: 'Tired', icon: Moon, color: 'bg-indigo-500', description: 'Seeking rest and renewal' },
    { id: 'confused', name: 'Confused', icon: Meh, color: 'bg-orange-500', description: 'Seeking clarity' },
    { id: 'grateful', name: 'Grateful', icon: Heart, color: 'bg-pink-500', description: 'Thankful and blessed' }
  ];

  const moodRecommendations = {
    happy: [
      { type: 'Meditation', title: 'Gratitude Meditation', duration: '10 min', description: 'Amplify your joy with thankfulness' },
      { type: 'Chant', title: 'Hanuman Chalisa', duration: '15 min', description: 'Celebrate strength and devotion' },
      { type: 'Music', title: 'Bhajans Collection', duration: '30 min', description: 'Uplifting devotional songs' }
    ],
    peaceful: [
      { type: 'Meditation', title: 'Inner Peace Meditation', duration: '20 min', description: 'Deepen your tranquility' },
      { type: 'Mantra', title: 'Om Shanti Chanting', duration: '12 min', description: 'Peace mantra repetition' },
      { type: 'Music', title: 'Flute Ragas', duration: '45 min', description: 'Soothing classical melodies' }
    ],
    anxious: [
      { type: 'Meditation', title: 'Anxiety Relief Meditation', duration: '15 min', description: 'Calm your mind and heart' },
      { type: 'Breathing', title: 'Pranayama Practice', duration: '10 min', description: 'Regulated breathing exercises' },
      { type: 'Mantra', title: 'Ganesha Mantra', duration: '8 min', description: 'Remove obstacles and fear' }
    ],
    sad: [
      { type: 'Meditation', title: 'Healing Heart Meditation', duration: '18 min', description: 'Comfort for difficult times' },
      { type: 'Chant', title: 'Mahamrityunjaya Mantra', duration: '21 min', description: 'Healing and transformation' },
      { type: 'Music', title: 'Soulful Bhajans', duration: '25 min', description: 'Comforting spiritual songs' }
    ],
    energetic: [
      { type: 'Meditation', title: 'Dynamic Meditation', duration: '12 min', description: 'Channel your energy positively' },
      { type: 'Chant', title: 'Durga Chalisa', duration: '14 min', description: 'Invoke divine power' },
      { type: 'Music', title: 'Energetic Kirtans', duration: '20 min', description: 'Upbeat devotional music' }
    ],
    tired: [
      { type: 'Meditation', title: 'Restorative Meditation', duration: '25 min', description: 'Deep rest and renewal' },
      { type: 'Mantra', title: 'Om Meditation', duration: '15 min', description: 'Universal sound healing' },
      { type: 'Music', title: 'Sleep Mantras', duration: '60 min', description: 'Peaceful sounds for rest' }
    ],
    confused: [
      { type: 'Meditation', title: 'Clarity Meditation', duration: '16 min', description: 'Find your inner guidance' },
      { type: 'Mantra', title: 'Saraswati Mantra', duration: '11 min', description: 'Wisdom and knowledge' },
      { type: 'Reading', title: 'Bhagavad Gita Verses', duration: '20 min', description: 'Ancient wisdom for guidance' }
    ],
    grateful: [
      { type: 'Meditation', title: 'Gratitude Practice', duration: '14 min', description: 'Expand your thankfulness' },
      { type: 'Chant', title: 'Lakshmi Aarti', duration: '10 min', description: 'Appreciate abundance' },
      { type: 'Music', title: 'Devotional Prayers', duration: '30 min', description: 'Songs of appreciation' }
    ]
  };

  const handleMoodSelect = async (moodId: string) => {
    setSelectedMood(moodId);
    setLoading(true);
    
    // Simulate Narad AI processing
    setTimeout(() => {
      const recs = moodRecommendations[moodId as keyof typeof moodRecommendations] || [];
      setRecommendations(recs);
      setLoading(false);
      toast.success('Narad AI has personalized recommendations for you!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-blue-500 text-white p-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
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
            <h1 className="text-xl font-bold">Mood-Based Meditation</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {!selectedMood ? (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">How are you feeling today?</h2>
              <p className="text-lg text-gray-600">Select your current mood and let Narad AI guide your spiritual practice</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {moods.map((mood) => {
                const IconComponent = mood.icon;
                return (
                  <Card 
                    key={mood.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                    onClick={() => handleMoodSelect(mood.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 ${mood.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">{mood.name}</h3>
                      <p className="text-sm text-gray-600">{mood.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Narad AI is analyzing...</h2>
            <p className="text-gray-600">Personalizing your spiritual recommendations</p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Personalized for your {moods.find(m => m.id === selectedMood)?.name.toLowerCase()} mood
              </h2>
              <p className="text-lg text-gray-600">Narad AI recommends these practices for you today</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {recommendations.map((rec, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{rec.title}</CardTitle>
                      <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                        {rec.type}
                      </span>
                    </div>
                    <CardDescription className="text-gray-600">
                      {rec.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{rec.duration}</span>
                      <Button size="sm" className="bg-gradient-to-r from-orange-500 to-orange-600">
                        Start Practice
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedMood('');
                  setRecommendations([]);
                }}
                className="mr-4"
              >
                Choose Different Mood
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-500"
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
