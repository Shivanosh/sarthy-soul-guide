
export interface MeditationSession {
  id: string;
  date: string;
  duration: number; // in minutes
  type: 'guided' | 'timer' | 'breathing' | 'quick';
  points: number;
  mood?: string;
}

export interface MeditationStats {
  totalSessions: number;
  totalMinutes: number;
  experiencePoints: number;
  streak: number;
  lastSessionDate: string;
  completedThisWeek: number;
  weeklyGoal: number;
  level: number;
  sessions: MeditationSession[];
}

export const getDefaultStats = (): MeditationStats => ({
  totalSessions: 0,
  totalMinutes: 0,
  experiencePoints: 0,
  streak: 0,
  lastSessionDate: '',
  completedThisWeek: 0,
  weeklyGoal: 5,
  level: 1,
  sessions: []
});

export const loadMeditationStats = (): MeditationStats => {
  const saved = localStorage.getItem('meditationStats');
  if (!saved) {
    return getDefaultStats();
  }
  
  try {
    return { ...getDefaultStats(), ...JSON.parse(saved) };
  } catch {
    return getDefaultStats();
  }
};

export const saveMeditationStats = (stats: MeditationStats): void => {
  localStorage.setItem('meditationStats', JSON.stringify(stats));
};

export const addMeditationSession = (session: Omit<MeditationSession, 'id' | 'date'>): MeditationStats => {
  const stats = loadMeditationStats();
  const today = new Date().toISOString().split('T')[0];
  
  const newSession: MeditationSession = {
    ...session,
    id: Date.now().toString(),
    date: today
  };
  
  // Calculate streak
  const lastSessionDate = stats.lastSessionDate ? new Date(stats.lastSessionDate).toISOString().split('T')[0] : null;
  let newStreak = stats.streak;
  
  if (!lastSessionDate || lastSessionDate !== today) {
    if (lastSessionDate) {
      const daysDiff = (new Date(today).getTime() - new Date(lastSessionDate).getTime()) / (1000 * 60 * 60 * 24);
      if (daysDiff === 1) {
        newStreak += 1;
      } else if (daysDiff > 1) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }
  }
  
  // Calculate weekly sessions
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const thisWeekSessions = stats.sessions.filter(s => new Date(s.date) > weekAgo).length;
  
  const updatedStats: MeditationStats = {
    ...stats,
    totalSessions: stats.totalSessions + 1,
    totalMinutes: stats.totalMinutes + session.duration,
    experiencePoints: stats.experiencePoints + session.points,
    streak: newStreak,
    lastSessionDate: new Date().toISOString(),
    completedThisWeek: lastSessionDate !== today ? thisWeekSessions + 1 : thisWeekSessions,
    level: Math.floor((stats.experiencePoints + session.points) / 100) + 1,
    sessions: [...stats.sessions, newSession].slice(-50) // Keep last 50 sessions
  };
  
  saveMeditationStats(updatedStats);
  return updatedStats;
};

export const calculateLevel = (experiencePoints: number): number => {
  return Math.floor(experiencePoints / 100) + 1;
};

export const getPointsToNextLevel = (experiencePoints: number): number => {
  const currentLevel = calculateLevel(experiencePoints);
  return (currentLevel * 100) - experiencePoints;
};
