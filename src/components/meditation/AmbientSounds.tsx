
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

const AmbientSounds = () => {
  const [activeSound, setActiveSound] = useState<string>('');
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const sounds = [
    { id: 'rain', name: 'Rain', emoji: '🌧️', description: 'Gentle rainfall', category: 'Nature' },
    { id: 'ocean', name: 'Ocean Waves', emoji: '🌊', description: 'Calming ocean sounds', category: 'Nature' },
    { id: 'forest', name: 'Forest', emoji: '🌲', description: 'Birds and rustling leaves', category: 'Nature' },
    { id: 'fire', name: 'Crackling Fire', emoji: '🔥', description: 'Warm fireplace sounds', category: 'Cozy' },
    { id: 'wind', name: 'Wind Chimes', emoji: '🎐', description: 'Gentle wind chimes', category: 'Peaceful' },
    { id: 'temple', name: 'Temple Bells', emoji: '🔔', description: 'Sacred temple atmosphere', category: 'Spiritual' },
    { id: 'om', name: 'Om Chanting', emoji: '🕉️', description: 'Sacred Om vibrations', category: 'Mantra' },
    { id: 'flute', name: 'Bamboo Flute', emoji: '🪈', description: 'Soothing flute melodies', category: 'Music' }
  ];

  const handleSoundToggle = (soundId: string) => {
    if (activeSound === soundId) {
      setActiveSound('');
    } else {
      setActiveSound(soundId);
    }
  };

  const categories = [...new Set(sounds.map(sound => sound.category))];

  return (
    <Card className="card-premium">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-saffron to-indian-green bg-clip-text text-transparent flex items-center">
          🎵 Ambient Sounds
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Volume Control */}
        <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsMuted(!isMuted)}
            className="p-2"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              setIsMuted(false);
            }}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-600 w-8">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>

        {/* Sound Categories */}
        {categories.map(category => (
          <div key={category} className="space-y-3">
            <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
              {category}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {sounds
                .filter(sound => sound.category === category)
                .map(sound => (
                  <Button
                    key={sound.id}
                    variant={activeSound === sound.id ? "default" : "outline"}
                    onClick={() => handleSoundToggle(sound.id)}
                    className={`h-auto p-3 flex flex-col items-center space-y-1 ${
                      activeSound === sound.id 
                        ? 'bg-gradient-to-r from-saffron to-indian-green text-white' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{sound.emoji}</span>
                      {activeSound === sound.id && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <div className="text-xs font-medium">{sound.name}</div>
                    <div className="text-xs opacity-80 text-center leading-tight">
                      {sound.description}
                    </div>
                  </Button>
                ))}
            </div>
          </div>
        ))}

        {activeSound && (
          <div className="mt-4 p-3 bg-gradient-to-r from-saffron/10 to-indian-green/10 rounded-lg border border-saffron/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Playing: {sounds.find(s => s.id === activeSound)?.name}
                </span>
              </div>
              <Badge className="bg-green-100 text-green-800 text-xs">
                Active
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AmbientSounds;
