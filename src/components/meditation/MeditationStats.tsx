
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, Target, Star, Flame, Trophy } from 'lucide-react';

const MeditationStats = () => {
  // Mock data - in real app this would come from local storage or backend
  const stats = {
    streak: 7,
    totalSessions: 23,
    totalMinutes: 387,
    weeklyGoal: 5,
    completedThisWeek: 3,
    level: 2,
    experiencePoints: 850,
    pointsToNextLevel: 1000,
    achievements: [
      { name: 'First Session', icon: '🌱', earned: true },
      { name: 'Week Warrior', icon: '⚡', earned: true },
      { name: 'Zen Master', icon: '🧘‍♀️', earned: false },
      { name: 'Consistency King', icon: '👑', earned: false }
    ]
  };

  const progressToNextLevel = (stats.experiencePoints / stats.pointsToNextLevel) * 100;
  const weeklyProgress = (stats.completedThisWeek / stats.weeklyGoal) * 100;

  return (
    <div className="space-y-4">
      {/* Level and XP */}
      <Card className="card-premium">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold bg-gradient-to-r from-saffron to-indian-green bg-clip-text text-transparent flex items-center">
            <Trophy className="mr-2 h-5 w-5 text-saffron" />
            Level {stats.level} Meditator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{stats.experiencePoints} XP</span>
            <span>{stats.pointsToNextLevel} XP to Level {stats.level + 1}</span>
          </div>
          <Progress value={progressToNextLevel} className="h-3" />
          <div className="text-center">
            <Badge className="bg-gradient-to-r from-saffron to-indian-green text-white">
              +50 XP per session
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="card-premium text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Flame className="h-6 w-6 text-orange-500 mr-1" />
              <span className="text-2xl font-bold text-gray-800">{stats.streak}</span>
            </div>
            <p className="text-sm text-gray-600">Day Streak</p>
          </CardContent>
        </Card>

        <Card className="card-premium text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-blue-500 mr-1" />
              <span className="text-2xl font-bold text-gray-800">{stats.totalMinutes}</span>
            </div>
            <p className="text-sm text-gray-600">Total Minutes</p>
          </CardContent>
        </Card>

        <Card className="card-premium text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-6 w-6 text-green-500 mr-1" />
              <span className="text-2xl font-bold text-gray-800">{stats.totalSessions}</span>
            </div>
            <p className="text-sm text-gray-600">Sessions</p>
          </CardContent>
        </Card>

        <Card className="card-premium text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-6 w-6 text-purple-500 mr-1" />
              <span className="text-2xl font-bold text-gray-800">{stats.completedThisWeek}/{stats.weeklyGoal}</span>
            </div>
            <p className="text-sm text-gray-600">Weekly Goal</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card className="card-premium">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
            <Target className="mr-2 h-5 w-5 text-purple-500" />
            Weekly Goal Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{stats.completedThisWeek} of {stats.weeklyGoal} sessions</span>
              <span>{Math.round(weeklyProgress)}%</span>
            </div>
            <Progress value={weeklyProgress} className="h-3" />
            {weeklyProgress >= 100 && (
              <Badge className="w-full justify-center bg-green-100 text-green-800">
                🎉 Weekly goal achieved!
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="card-premium">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
            <Star className="mr-2 h-5 w-5 text-yellow-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {stats.achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  achievement.earned
                    ? 'border-saffron bg-gradient-to-r from-saffron/10 to-indian-green/10'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="text-2xl mb-1">{achievement.icon}</div>
                <div className="text-sm font-medium text-gray-700">
                  {achievement.name}
                </div>
                {achievement.earned && (
                  <Badge className="mt-1 bg-saffron text-white text-xs">
                    Earned
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeditationStats;
