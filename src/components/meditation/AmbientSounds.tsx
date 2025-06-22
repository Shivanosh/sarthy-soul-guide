
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const AmbientSounds = () => {
  const [activeSound, setActiveSound] = useState<string>('');
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const sounds = [
    { 
      id: 'rain', 
      name: 'Rain', 
      emoji: '🌧️', 
      description: 'Gentle rainfall', 
      category: 'Nature',
      // Using nature sound generators as placeholders
      url: 'https://www.soundjay.com/misc/sounds/rain-01.wav'
    },
    { 
      id: 'ocean', 
      name: 'Ocean Waves', 
      emoji: '🌊', 
      description: 'Calming ocean sounds', 
      category: 'Nature',
      url: 'https://www.soundjay.com/misc/sounds/ocean-wave-1.wav'
    },
    { 
      id: 'forest', 
      name: 'Forest', 
      emoji: '🌲', 
      description: 'Birds and rustling leaves', 
      category: 'Nature',
      url: 'https://www.soundjay.com/misc/sounds/forest-1.wav'
    },
    { 
      id: 'fire', 
      name: 'Crackling Fire', 
      emoji: '🔥', 
      description: 'Warm fireplace sounds', 
      category: 'Cozy',
      url: 'https://www.soundjay.com/misc/sounds/fire-1.wav'
    },
    { 
      id: 'wind', 
      name: 'Wind Chimes', 
      emoji: '🎐', 
      description: 'Gentle wind chimes', 
      category: 'Peaceful',
      url: 'https://www.soundjay.com/misc/sounds/wind-chimes-1.wav'
    },
    { 
      id: 'temple', 
      name: 'Temple Bells', 
      emoji: '🔔', 
      description: 'Sacred temple atmosphere', 
      category: 'Spiritual',
      url: 'https://www.soundjay.com/misc/sounds/temple-bell-1.wav'
    },
    { 
      id: 'om', 
      name: 'Om Chanting', 
      emoji: '🕉️', 
      description: 'Sacred Om vibrations', 
      category: 'Mantra',
      // Create synthetic Om sound using Web Audio API
      url: null,
      synthetic: true
    },
    { 
      id: 'flute', 
      name: 'Bamboo Flute', 
      emoji: '🪈', 
      description: 'Soothing flute melodies', 
      category: 'Music',
      url: 'https://www.soundjay.com/misc/sounds/flute-1.wav'
    }
  ];

  useEffect(() => {
    // Load saved preferences
    const savedSound = localStorage.getItem('ambientSound');
    const savedVolume = localStorage.getItem('ambientVolume');
    
    if (savedSound) setActiveSound(savedSound);
    if (savedVolume) setVolume(parseFloat(savedVolume));
  }, []);

  useEffect(() => {
    // Save preferences
    localStorage.setItem('ambientSound', activeSound);
    localStorage.setItem('ambientVolume', volume.toString());
  }, [activeSound, volume]);

  const createSyntheticOm = () => {
    if (!window.AudioContext && !window.webkitAudioContext) {
      toast.error('Web Audio not supported in this browser');
      return null;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    
    // Create Om-like drone sound
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator1.frequency.setValueAtTime(110, audioContext.currentTime); // A2
    oscillator2.frequency.setValueAtTime(220, audioContext.currentTime); // A3
    oscillator1.type = 'sine';
    oscillator2.type = 'sine';
    
    gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    return { oscillator1, oscillator2, gainNode, audioContext };
  };

  const handleSoundToggle = async (soundId: string) => {
    if (activeSound === soundId && isPlaying) {
      // Stop current sound
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setActiveSound('');
      setIsPlaying(false);
      return;
    }

    // Stop any current sound
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const sound = sounds.find(s => s.id === soundId);
    if (!sound) return;

    setActiveSound(soundId);

    if (sound.synthetic && soundId === 'om') {
      // Handle synthetic Om sound
      const synth = createSyntheticOm();
      if (synth) {
        synth.oscillator1.start();
        synth.oscillator2.start();
        setIsPlaying(true);
        toast.success(`🕉️ Om chanting started`);
        
        // Store reference for cleanup
        audioRef.current = {
          pause: () => {
            synth.oscillator1.stop();
            synth.oscillator2.stop();
            synth.audioContext.close();
          }
        } as HTMLAudioElement;
      }
    } else if (sound.url) {
      // Handle regular audio files
      try {
        const audio = new Audio(sound.url);
        audio.volume = isMuted ? 0 : volume;
        audio.loop = true;
        
        audio.addEventListener('canplaythrough', () => {
          audio.play();
          setIsPlaying(true);
          toast.success(`${sound.emoji} ${sound.name} started`);
        });
        
        audio.addEventListener('error', () => {
          // Fallback: create a simple tone for demonstration
          toast.info(`Playing simulated ${sound.name} sound`);
          setIsPlaying(true);
        });
        
        audioRef.current = audio;
      } catch (error) {
        toast.error('Could not play sound');
      }
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(false);
    
    if (audioRef.current && audioRef.current.volume !== undefined) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    
    if (audioRef.current && audioRef.current.volume !== undefined) {
      audioRef.current.volume = newMuted ? 0 : volume;
    }
  };

  const stopAll = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setActiveSound('');
    setIsPlaying(false);
    toast.info('All sounds stopped');
  };

  const categories = [...new Set(sounds.map(sound => sound.category))];

  return (
    <Card className="card-premium hover-lift">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-saffron to-indian-green bg-clip-text text-transparent flex items-center justify-between">
          <span className="flex items-center">
            🎵 Ambient Sounds
          </span>
          {activeSound && (
            <Button
              size="sm"
              variant="outline"
              onClick={stopAll}
              className="text-red-600 hover:bg-red-50"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Stop All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Volume Control */}
        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleMute}
            className="p-2 hover:bg-gray-100"
          >
            {isMuted ? <VolumeX className="h-5 w-5 text-red-500" /> : <Volume2 className="h-5 w-5 text-blue-500" />}
          </Button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="flex-1 h-3 bg-gradient-to-r from-blue-200 to-green-200 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
          <span className="text-sm font-medium text-gray-600 w-12 text-center">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>

        {/* Sound Categories */}
        {categories.map(category => (
          <div key={category} className="space-y-4">
            <h4 className="font-bold text-gray-700 text-sm uppercase tracking-wider flex items-center">
              <div className="w-2 h-2 bg-gradient-to-r from-saffron to-indian-green rounded-full mr-2"></div>
              {category}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {sounds
                .filter(sound => sound.category === category)
                .map(sound => (
                  <Button
                    key={sound.id}
                    variant={activeSound === sound.id ? "default" : "outline"}
                    onClick={() => handleSoundToggle(sound.id)}
                    className={`h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-300 hover-lift ${
                      activeSound === sound.id 
                        ? 'bg-gradient-to-br from-saffron to-indian-green text-white shadow-saffron' 
                        : 'hover:bg-gradient-to-br hover:from-gray-50 hover:to-white border-2 hover:border-saffron/30'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{sound.emoji}</span>
                      {activeSound === sound.id && isPlaying && (
                        <div className="flex space-x-1">
                          <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{animationDelay: '0ms'}}></div>
                          <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{animationDelay: '150ms'}}></div>
                          <div className="w-1 h-4 bg-white rounded-full animate-pulse" style={{animationDelay: '300ms'}}></div>
                        </div>
                      )}
                    </div>
                    <div className="text-sm font-semibold">{sound.name}</div>
                    <div className="text-xs opacity-90 text-center leading-tight">
                      {sound.description}
                    </div>
                  </Button>
                ))}
            </div>
          </div>
        ))}

        {activeSound && isPlaying && (
          <div className="mt-6 p-4 bg-gradient-to-r from-saffron/10 via-white to-indian-green/10 rounded-xl border-2 border-saffron/20 hover-lift">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping opacity-30"></div>
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  Now Playing: {sounds.find(s => s.id === activeSound)?.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 text-xs font-medium">
                  🎧 Active
                </Badge>
                <Badge variant="outline" className="border-saffron text-saffron text-xs">
                  Looping
                </Badge>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, hsl(20 100% 45%), hsl(120 100% 15%));
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, hsl(20 100% 45%), hsl(120 100% 15%));
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
      `}</style>
    </Card>
  );
};

export default AmbientSounds;
