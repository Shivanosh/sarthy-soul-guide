
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { toast } from 'sonner';
import { addMeditationSession } from '@/utils/meditationStats';

interface MeditationTimerProps {
  initialDuration?: number;
  onComplete?: () => void;
  title?: string;
}

const MeditationTimer = ({ initialDuration = 600, onComplete, title = "Meditation Session" }: MeditationTimerProps) => {
  const [duration, setDuration] = useState(initialDuration);
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleSessionComplete = () => {
    const sessionDuration = Math.floor((duration - timeLeft) / 60); // Convert to minutes
    const points = Math.max(25, sessionDuration * 10); // Minimum 25 points, 10 points per minute
    
    // Add session to stats
    addMeditationSession({
      duration: sessionDuration,
      type: 'timer',
      points: points
    });
    
    onComplete?.();
    toast.success(`🧘‍♀️ Meditation session completed! +${points} XP earned for ${sessionDuration} minutes`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!isRunning) {
      setSessionStartTime(Date.now());
      toast.info('🧘‍♀️ Meditation session started');
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
    setSessionStartTime(null);
    toast.info('Timer reset');
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
    setTimeLeft(newDuration);
    setIsRunning(false);
    setShowSettings(false);
    setSessionStartTime(null);
  };

  const progress = ((duration - timeLeft) / duration) * 100;
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Card className="card-premium hover-lift">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-saffron to-indian-green bg-clip-text text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Circular Timer */}
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-linear"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(20 100% 45%)" />
                <stop offset="100%" stopColor="hsl(120 100% 15%)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Timer display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-600">
                {isRunning ? 'Meditating...' : 'Ready to start'}
              </div>
              {sessionStartTime && (
                <div className="text-xs text-gray-500 mt-1">
                  {Math.floor((Date.now() - sessionStartTime) / 60000)} min elapsed
                </div>
              )}
            </div>
          </div>
          
          {/* Breathing animation overlay when running */}
          {isRunning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-saffron/20 to-indian-green/20 animate-pulse"></div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="text-center text-xs text-gray-500">
            Earn {Math.max(25, Math.floor(duration / 60) * 10)} XP when completed
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <Button
            size="lg"
            onClick={handleStart}
            className="bg-gradient-to-r from-saffron to-saffron-dark hover:from-saffron-dark hover:to-saffron text-white px-8"
          >
            {isRunning ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isRunning ? 'Pause' : 'Start'}
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
          
          <Button
            size="lg"
            variant="outline"
            onClick={() => setShowSettings(!showSettings)}
            className="border-gray-300 hover:bg-gray-50"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Duration Settings */}
        {showSettings && (
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800">Timer Duration</h4>
            <div className="grid grid-cols-2 gap-2">
              {[300, 600, 900, 1200, 1800, 2700].map((seconds) => (
                <Button
                  key={seconds}
                  size="sm"
                  variant={duration === seconds ? "default" : "outline"}
                  onClick={() => handleDurationChange(seconds)}
                  className="text-sm"
                >
                  {Math.floor(seconds / 60)} min
                  <span className="text-xs ml-1">
                    (+{Math.max(25, Math.floor(seconds / 60) * 10)} XP)
                  </span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MeditationTimer;
