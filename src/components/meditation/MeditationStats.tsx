
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Target, Star, Flame, Trophy, TrendingUp } from 'lucide-react';

const MeditationStats = () => {
  const [stats, setStats] = useState({
    streak: 0,
    totalSessions: 0,
    totalMinutes: 0,
    weeklyGoal: 5,
    completedThisWeek: 0,
    level: 1,
    experiencePoints: 0,
    pointsToNextLevel: 100,
    achievements: [
      { name: 'First Session', icon: '🌱', earned: false, points: 25 },
      { name: 'Week Warrior', icon: '⚡', earned: false, points: 100 },
      { name: 'Zen Master', icon: '🧘‍♀️', earned: false, points: 500 },
      { name: 'Consistency King', icon: '👑', earned: false, points: 1000 }
    ]
  });

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem('meditationStats');
    if (savedStats) {
      const parsedStats = JSON.parse(savedStats);
      
      // Calculate level based on XP
      const level = Math.floor(parsedStats.experiencePoints / 100) + 1;
      const pointsToNextLevel = (level * 100) - parsedStats.experiencePoints;
      
      // Check achievements
      const updatedAchievements = [...stats.achievements];
      updatedAchievements[0].earned = parsedStats.totalSessions >= 1;
      updatedAchievements[1].earned = parsedStats.completedThisWeek >= 7;
      updatedAchievements[2].earned = parsedStats.totalSessions >= 50;
      updatedAchievements[3].earned = parsedStats.streak >= 30;
      
      setStats({
        ...parsedStats,
        level,
        pointsToNextLevel,
        achievements: updatedAchievements
      });
    }
  }, []);

  const updateWeeklyGoal = (newGoal: number) => {
    const updatedStats = { ...stats, weeklyGoal: newGoal };
    setStats(updatedStats);
    localStorage.setItem('meditationStats', JSON.stringify(updatedStats));
  };

  const progressToNextLevel = (stats.experiencePoints % 100);
  const weeklyProgress = (stats.completedThisWeek / stats.weeklyGoal) * 100;

  return (
    <div className="space-y-6">
      {/* Level and XP */}
      <Card className="card-premium hover-lift">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-saffron to-indian-green bg-clip-text text-transparent flex items-center">
            <Trophy className="mr-2 h-6 w-6 text-saffron" />
            Level {stats.level} Meditator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{stats.experiencePoints} XP</span>
            <span>{stats.pointsToNextLevel} XP to Level {stats.level + 1}</span>
          </div>
          <Progress value={progressToNextLevel} className="h-4" />
          <div className="flex justify-center space-x-2">
            <Badge className="bg-gradient-to-r from-saffron to-indian-green text-white">
              +50 XP per session
            </Badge>
            <Badge variant="outline" className="border-saffron text-saffron">
              <TrendingUp className="w-3 h-3 mr-1" />
              Growing
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-premium text-center hover-lift">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Flame className="h-8 w-8 text-orange-500 mr-1" />
              <span className="text-3xl font-bold text-gray-800">{stats.streak}</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Day Streak</p>
          </CardContent>
        </Card>

        <Card className="card-premium text-center hover-lift">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-8 w-8 text-blue-500 mr-1" />
              <span className="text-3xl font-bold text-gray-800">{stats.totalMinutes}</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Total Minutes</p>
          </CardContent>
        </Card>

        <Card className="card-premium text-center hover-lift">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-8 w-8 text-green-500 mr-1" />
              <span className="text-3xl font-bold text-gray-800">{stats.totalSessions}</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Sessions</p>
          </CardContent>
        </Card>

        <Card className="card-premium text-center hover-lift">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-8 w-8 text-purple-500 mr-1" />
              <span className="text-3xl font-bold text-gray-800">{stats.completedThisWeek}/{stats.weeklyGoal}</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">Weekly Goal</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card className="card-premium hover-lift">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
              <Target className="mr-2 h-5 w-5 text-purple-500" />
              Weekly Goal Progress
            </CardTitle>
            <div className="flex space-x-1">
              {[3, 5, 7, 10].map(goal => (
                <Button
                  key={goal}
                  size="sm"
                  variant={stats.weeklyGoal === goal ? "default" : "outline"}
                  onClick={() => updateWeeklyGoal(goal)}
                  className="h-8 w-8 p-0 text-xs"
                >
                  {goal}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{stats.completedThisWeek} of {stats.weeklyGoal} sessions</span>
              <span>{Math.round(weeklyProgress)}%</span>
            </div>
            <Progress value={weeklyProgress} className="h-3" />
            {weeklyProgress >= 100 && (
              <Badge className="w-full justify-center bg-green-100 text-green-800 pulse-glow">
                🎉 Weekly goal achieved! +100 XP bonus!
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="card-premium hover-lift">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
            <Star className="mr-2 h-5 w-5 text-yellow-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {stats.achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 text-center transition-all hover-lift ${
                  achievement.earned
                    ? 'border-saffron bg-gradient-to-br from-saffron/10 to-indian-green/10 shadow-saffron'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className="text-sm font-semibold text-gray-700 mb-1">
                  {achievement.name}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  +{achievement.points} XP
                </div>
                {achievement.earned ? (
                  <Badge className="bg-saffron text-white text-xs">
                    ✨ Earned
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    Locked
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
