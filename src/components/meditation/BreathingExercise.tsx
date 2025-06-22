
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface BreathingExerciseProps {
  technique?: 'box' | '478' | 'triangle';
  onComplete?: () => void;
}

const BreathingExercise = ({ technique = 'box', onComplete }: BreathingExerciseProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const [phaseTime, setPhaseTime] = useState(0);
  
  const techniques = {
    box: { inhale: 4, hold1: 4, exhale: 4, hold2: 4, name: 'Box Breathing' },
    '478': { inhale: 4, hold1: 7, exhale: 8, hold2: 0, name: '4-7-8 Breathing' },
    triangle: { inhale: 4, hold1: 4, exhale: 4, hold2: 0, name: 'Triangle Breathing' }
  };

  const currentTechnique = techniques[technique];
  const totalCycles = 10;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setPhaseTime((prev) => {
          const currentPhaseMax = currentTechnique[phase];
          
          if (prev >= currentPhaseMax - 1) {
            // Move to next phase
            switch (phase) {
              case 'inhale':
                setPhase(currentTechnique.hold1 > 0 ? 'hold1' : 'exhale');
                break;
              case 'hold1':
                setPhase('exhale');
                break;
              case 'exhale':
                if (currentTechnique.hold2 > 0) {
                  setPhase('hold2');
                } else {
                  setPhase('inhale');
                  setCycleCount(c => {
                    const newCount = c + 1;
                    if (newCount >= totalCycles) {
                      setIsRunning(false);
                      onComplete?.();
                      toast.success('🫁 Breathing exercise completed!');
                    }
                    return newCount;
                  });
                }
                break;
              case 'hold2':
                setPhase('inhale');
                setCycleCount(c => {
                  const newCount = c + 1;
                  if (newCount >= totalCycles) {
                    setIsRunning(false);
                    onComplete?.();
                    toast.success('🫁 Breathing exercise completed!');
                  }
                  return newCount;
                });
                break;
            }
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, phase, currentTechnique, cycleCount, onComplete]);

  const handleStart = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      toast.info(`🫁 ${currentTechnique.name} started`);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('inhale');
    setCycleCount(0);
    setPhaseTime(0);
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold1': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'hold2': return 'Hold';
    }
  };

  const getCircleScale = () => {
    const progress = (phaseTime + 1) / currentTechnique[phase];
    switch (phase) {
      case 'inhale':
        return 1 + (progress * 0.5); // Grow from 1 to 1.5
      case 'exhale':
        return 1.5 - (progress * 0.5); // Shrink from 1.5 to 1
      default:
        return phase === 'hold1' ? 1.5 : 1; // Stay at current size during holds
    }
  };

  const getCircleColor = () => {
    switch (phase) {
      case 'inhale': return 'from-blue-400 to-blue-600';
      case 'hold1': return 'from-purple-400 to-purple-600';
      case 'exhale': return 'from-green-400 to-green-600';
      case 'hold2': return 'from-orange-400 to-orange-600';
    }
  };

  return (
    <Card className="card-premium hover-lift">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          {currentTechnique.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Breathing Circle */}
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
          <div
            className={`w-40 h-40 rounded-full bg-gradient-to-br ${getCircleColor()} shadow-lg transition-transform duration-1000 ease-in-out flex items-center justify-center`}
            style={{ transform: `scale(${getCircleScale()})` }}
          >
            <div className="text-center text-white">
              <div className="text-xl font-bold mb-1">
                {getPhaseInstruction()}
              </div>
              <div className="text-sm opacity-80">
                {currentTechnique[phase] - phaseTime}
              </div>
            </div>
          </div>
          
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full opacity-30"></div>
        </div>

        {/* Progress */}
        <div className="text-center space-y-2">
          <div className="text-lg font-semibold text-gray-800">
            Cycle {cycleCount + 1} of {totalCycles}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-saffron to-indian-green h-2 rounded-full transition-all duration-300"
              style={{ width: `${((cycleCount + (phaseTime / currentTechnique[phase])) / totalCycles) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Technique Info */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-sm text-gray-600 mb-2">Pattern:</div>
          <div className="flex justify-center space-x-2 text-sm font-medium">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">In: {currentTechnique.inhale}s</span>
            {currentTechnique.hold1 > 0 && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded">Hold: {currentTechnique.hold1}s</span>
            )}
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Out: {currentTechnique.exhale}s</span>
            {currentTechnique.hold2 > 0 && (
              <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded">Hold: {currentTechnique.hold2}s</span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <Button
            size="lg"
            onClick={handleStart}
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8"
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
        </div>
      </CardContent>
    </Card>
  );
};

export default BreathingExercise;
