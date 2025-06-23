import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, BookOpen, Calendar, Star, ArrowRight, Bell, Settings, User, LogOut, Home, Sparkles, MapPin, Plane, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [dailyQuote, setDailyQuote] = useState('');
  const [dailyGoodDeed, setDailyGoodDeed] = useState('');
  const [streakCount, setStreakCount] = useState(0);
  const [todaysMood, setTodaysMood] = useState('');
  const [lastLoginDate, setLastLoginDate] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setCurrentUser(JSON.parse(user));
      calculateStreak();
    }
    
    // Load or fetch daily content
    loadDailyContent();
    
    // Load user's today mood
    const mood = localStorage.getItem('todaysMood');
    if (mood) setTodaysMood(mood);
  }, []);

  const calculateStreak = () => {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem('lastLoginDate');
    const currentStreak = parseInt(localStorage.getItem('streakCount') || '0');
    
    if (!lastLogin) {
      // First time login
      setStreakCount(1);
      localStorage.setItem('streakCount', '1');
      localStorage.setItem('lastLoginDate', today);
      return;
    }
    
    const lastLoginDate = new Date(lastLogin);
    const todayDate = new Date(today);
    const diffTime = Math.abs(todayDate.getTime() - lastLoginDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      // Consecutive day
      const newStreak = currentStreak + 1;
      setStreakCount(newStreak);
      localStorage.setItem('streakCount', newStreak.toString());
      localStorage.setItem('lastLoginDate', today);
    } else if (diffDays > 1) {
      // Streak broken
      setStreakCount(1);
      localStorage.setItem('streakCount', '1');
      localStorage.setItem('lastLoginDate', today);
    } else {
      // Same day
      setStreakCount(currentStreak);
    }
  };

  const loadDailyContent = () => {
    const today = new Date().toDateString();
    const savedQuoteDate = localStorage.getItem('dailyQuoteDate');
    const savedQuote = localStorage.getItem('dailyQuote');
    const savedGoodDeed = localStorage.getItem('dailyGoodDeed');
    
    if (savedQuoteDate === today && savedQuote) {
      setDailyQuote(savedQuote);
      setDailyGoodDeed(savedGoodDeed || '');
    } else {
      // Fetch new daily content
      fetchDailyContent();
    }
  };

  const fetchDailyContent = async () => {
    try {
      // Spiritual quotes collection
      const quotes = [
        "The mind is everything. What you think you become. - Buddha",
        "Yoga is a light, which once lit will never dim. - B.K.S. Iyengar",
        "The soul that sees beauty may sometimes walk alone. - Johann Wolfgang von Goethe",
        "Peace comes from within. Do not seek it without. - Buddha",
        "The best way to find yourself is to lose yourself in service. - Mahatma Gandhi",
        "Your task is not to seek for love, but merely to seek and find all the barriers within yourself. - Rumi",
        "The whole purpose of religion is to facilitate love and compassion, patience, tolerance, humility, and forgiveness. - Dalai Lama",
        "In the end, just three things matter: How well we have lived, How well we have loved, How well we have learned to let go. - Jack Kornfield",
        "Be yourself and you will be at peace. - Lao Tzu",
        "The greatest revolution of our generation is the discovery that human beings can alter their lives by altering their attitudes. - William James"
      ];

      const goodDeeds = [
        "Smile at a stranger and brighten their day",
        "Help someone carry their groceries",
        "Call a friend or family member you haven't spoken to in a while",
        "Donate to a local charity or food bank",
        "Volunteer at a community center",
        "Plant a tree or tend to a garden",
        "Write a thank you note to someone who has helped you",
        "Offer to help a neighbor with their chores",
        "Listen to someone who needs to talk",
        "Practice random acts of kindness throughout the day"
      ];

      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      const randomGoodDeed = goodDeeds[Math.floor(Math.random() * goodDeeds.length)];
      
      setDailyQuote(randomQuote);
      setDailyGoodDeed(randomGoodDeed);
      
      // Save to localStorage
      const today = new Date().toDateString();
      localStorage.setItem('dailyQuote', randomQuote);
      localStorage.setItem('dailyGoodDeed', randomGoodDeed);
      localStorage.setItem('dailyQuoteDate', today);
      
    } catch (error) {
      console.error('Error fetching daily content:', error);
      // Fallback content
      setDailyQuote("The mind is everything. What you think you become. - Buddha");
      setDailyGoodDeed("Smile at a stranger and brighten their day");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('todaysMood');
    setCurrentUser(null);
    toast.success('Logged out successfully');
  };

  const handleQuickMeditation = () => {
    // Update meditation stats
    const currentStats = JSON.parse(localStorage.getItem('meditationStats') || '{}');
    const today = new Date().toDateString();
    
    const updatedStats = {
      ...currentStats,
      totalSessions: (currentStats.totalSessions || 0) + 1,
      totalMinutes: (currentStats.totalMinutes || 0) + 5,
      lastSessionDate: new Date().toISOString(),
      experiencePoints: (currentStats.experiencePoints || 0) + 50,
      completedThisWeek: (currentStats.completedThisWeek || 0) + 1
    };
    
    localStorage.setItem('meditationStats', JSON.stringify(updatedStats));
    
    toast.success('Starting 5-minute guided meditation...');
    setTimeout(() => {
      toast.success('Meditation completed! +50 spiritual points earned');
    }, 3000);
  };

  const handleDailyChallenge = () => {
    const challenges = [
      'Recite Gayatri Mantra 21 times',
      'Practice gratitude for 5 minutes',
      'Listen to 3 bhajans mindfully',
      'Meditate for 10 minutes',
      'Help someone in need today'
    ];
    const todaysChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    toast.success(`Today's Challenge: ${todaysChallenge}`);
  };

  const handleDevotionalShop = () => {
    toast.success('Opening Devotional Item Shop... (Amazon API integration coming soon!)');
    // Future: navigate('/devotional-shop');
  };

  if (currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Enhanced Header */}
        <header className="bg-white/90 backdrop-blur-xl border-b border-orange-200 shadow-lg relative z-10">
          <div className="max-w-6xl mx-auto flex justify-between items-center p-6">
            <div className="flex items-center space-x-6">
              {/* Enlarged logo without white box */}
              <div className="flex flex-col items-center">
                <img 
                  src="/lovable-uploads/e81fabc3-1be6-4500-afbd-503816b027c1.png" 
                  alt="AapkaSarthy Logo" 
                  className="w-32 h-32 object-contain transition-transform duration-300 hover:scale-105"
                />
                <div className="text-center mt-3">
                  <p className="text-lg font-bold text-gray-800 tracking-wide">Guide to Your Soul</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-800 hover:bg-orange-100 transition-all duration-300 p-3">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="text-right">
                <span className="text-gray-800 text-lg font-semibold">Namaste, {currentUser.name}</span>
                <div className="flex items-center space-x-2 mt-2">
                  <Button 
                    size="sm"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-4 py-2 h-auto shadow-lg transition-all duration-300"
                    onClick={handleQuickMeditation}
                  >
                    🔥 {streakCount} day streak
                  </Button>
                </div>
              </div>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleLogout} 
                className="bg-white text-orange-600 hover:bg-orange-50 border-2 border-orange-200 shadow-lg font-semibold px-4 py-2 transition-all duration-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Enhanced Daily Content Section */}
        <div className="max-w-6xl mx-auto p-6 relative z-10">
          <Card className="mb-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-l-orange-500 shadow-xl transition-all duration-300 hover:shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-orange-700 text-2xl">Daily Wisdom</h3>
              </div>
              <p className="text-gray-800 italic font-medium text-xl leading-relaxed mb-6 bg-white/60 p-4 rounded-lg">"{dailyQuote}"</p>
              {dailyGoodDeed && (
                <div className="mb-6 p-4 bg-green-50 rounded-xl border-l-4 border-green-500 shadow-sm">
                  <h4 className="font-bold text-green-800 mb-3 text-lg">Good Deed of the Day</h4>
                  <p className="text-green-700 text-lg">{dailyGoodDeed}</p>
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <Button 
                  size="lg" 
                  onClick={handleQuickMeditation} 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg font-bold px-6 py-3 transition-all duration-300"
                >
                  Quick Meditation (5 min)
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={handleDailyChallenge} 
                  className="border-2 border-green-500 text-green-600 hover:bg-green-50 shadow-lg font-bold px-6 py-3 transition-all duration-300"
                >
                  Daily Challenge
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={handleDevotionalShop} 
                  className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 shadow-lg font-bold px-6 py-3 transition-all duration-300"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Devotional Shop
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={fetchDailyContent} 
                  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 shadow-lg font-bold px-6 py-3 transition-all duration-300"
                >
                  Refresh Content
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Main Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Enhanced Mood Selection Card */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 border-0 rounded-2xl">
              <CardHeader className="pb-4 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <Heart className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-orange-600 text-xl font-bold mb-2">Mood Meditation</CardTitle>
                <CardDescription className="text-gray-700 font-medium leading-relaxed text-base">
                  AI-powered meditation based on your current mood
                </CardDescription>
                {todaysMood && (
                  <Badge className="w-fit mx-auto bg-orange-100 text-orange-700 border border-orange-300 font-semibold mt-2">
                    Today: {todaysMood}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-lg py-3 text-lg transition-all duration-300"
                  onClick={() => {
                    toast.success('Opening Narad AI mood analyzer...');
                    navigate('/mood-selection');
                  }}
                >
                  Start Meditation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Media Library Card */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 border-0 rounded-2xl">
              <CardHeader className="pb-4 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-green-600 text-xl font-bold mb-2">Spiritual Library</CardTitle>
                <CardDescription className="text-gray-700 font-medium leading-relaxed text-base">
                  108+ Bhajans, chants, and spiritual content
                </CardDescription>
                <Badge className="w-fit mx-auto bg-green-100 text-green-700 border border-green-300 font-semibold mt-2">
                  15 Languages
                </Badge>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-green-500 text-green-600 hover:bg-green-50 font-bold shadow-lg py-3 text-lg transition-all duration-300"
                  onClick={() => {
                    toast.success('Loading spiritual media library...');
                    navigate('/media-library');
                  }}
                >
                  Explore Library <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Ritual Booking Card */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 border-0 rounded-2xl">
              <CardHeader className="pb-4 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <Calendar className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-blue-600 text-xl font-bold mb-2">Book Rituals</CardTitle>
                <CardDescription className="text-gray-700 font-medium leading-relaxed text-base">
                  Schedule poojas with verified priests
                </CardDescription>
                <Badge className="w-fit mx-auto bg-blue-100 text-blue-700 border border-blue-300 font-semibold mt-2">
                  42+ Temples
                </Badge>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold shadow-lg py-3 text-lg transition-all duration-300"
                  onClick={() => {
                    toast.success('Opening ritual booking system...');
                    navigate('/ritual-booking');
                  }}
                >
                  Book Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Trip Planning Card */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 border-0 rounded-2xl">
              <CardHeader className="pb-4 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <Plane className="h-10 w-10 text-white rotate-45" />
                </div>
                <CardTitle className="text-purple-600 text-xl font-bold mb-2">Trip Planning</CardTitle>
                <CardDescription className="text-gray-700 font-medium leading-relaxed text-base">
                  Plan sacred journeys to spiritual destinations
                </CardDescription>
                <Badge className="w-fit mx-auto bg-purple-100 text-purple-700 border border-purple-300 font-semibold mt-2">
                  12+ Destinations
                </Badge>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-bold shadow-lg py-3 text-lg transition-all duration-300"
                  onClick={() => {
                    toast.success('Opening trip planning...');
                    navigate('/trip-planning');
                  }}
                >
                  Plan Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Devotional Item Shop Section */}
          <Card className="card-premium p-6 rounded-xl border-l-4 border-l-purple-500 mb-8 hover-lift">
            <div className="relative">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <ShoppingCart className="mr-2 h-6 w-6 text-purple-500" />
                Devotional Item Shop
                <Badge className="ml-2 bg-purple-100 text-purple-700 text-xs">Coming Soon</Badge>
              </h2>
              <p className="text-gray-600 mb-4">
                Discover authentic spiritual items, books, malas, idols, and more. Future Amazon API integration for seamless shopping experience.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline"
                  className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 text-purple-700 hover:from-purple-100 hover:to-purple-200 font-bold"
                  onClick={handleDevotionalShop}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Browse Items
                </Button>
                <Button 
                  variant="outline"
                  className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 text-orange-700 hover:from-orange-100 hover:to-orange-200 font-bold"
                  onClick={() => toast.success('Wishlist feature coming soon!')}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  My Wishlist
                </Button>
                <Button 
                  variant="outline"
                  className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 text-green-700 hover:from-green-100 hover:to-green-200 font-bold"
                  onClick={() => toast.success('Special offers coming soon!')}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Special Offers
                </Button>
              </div>
            </div>
          </Card>

          {/* Enhanced Admin Features */}
          {currentUser.role === 'admin' && (
            <div className="card-premium p-6 rounded-xl border-l-4 border-l-yellow-500 mb-8 hover-lift">
              <div className="relative">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Star className="mr-2 h-6 w-6 text-yellow-500" />
                  Admin Dashboard
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="secondary"
                    className="bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-red-600 hover:to-orange-700 shadow-lg hover-lift font-bold"
                    onClick={() => {
                      toast.success('Opening media upload panel...');
                      navigate('/admin/media-upload');
                    }}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Upload Media
                  </Button>
                  <Button 
                    variant="secondary"
                    className="bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-teal-700 hover:to-green-700 shadow-lg hover-lift font-bold"
                    onClick={() => {
                      toast.success('Opening ritual management...');
                      navigate('/admin/ritual-management');
                    }}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Manage Rituals
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Stats with Premium Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="card-premium text-center hover-lift p-6 border-l-4 border-l-orange-500 bg-orange-50 shadow-lg rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">108</div>
              <div className="text-sm text-gray-700 font-semibold mb-3">Meditations</div>
              <Button size="sm" variant="ghost" className="text-orange-600 hover:bg-orange-100 font-semibold" onClick={() => navigate('/media-library')}>
                Explore →
              </Button>
            </Card>
            <Card className="card-premium text-center hover-lift p-6 border-l-4 border-l-green-600 bg-green-50 shadow-lg rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">42</div>
              <div className="text-sm text-gray-700 font-semibold mb-3">Bhajans</div>
              <Button size="sm" variant="ghost" className="text-green-600 hover:bg-green-100 font-semibold" onClick={() => navigate('/media-library')}>
                Listen →
              </Button>
            </Card>
            <Card className="card-premium text-center hover-lift p-6 border-l-4 border-l-blue-600 bg-blue-50 shadow-lg rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">15</div>
              <div className="text-sm text-gray-700 font-semibold mb-3">Rituals</div>
              <Button size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-100 font-semibold" onClick={() => navigate('/ritual-booking')}>
                Book →
              </Button>
            </Card>
            <Card className="card-premium text-center hover-lift p-6 border-l-4 border-l-purple-600 bg-purple-50 shadow-lg rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">{streakCount}</div>
              <div className="text-sm text-gray-700 font-semibold mb-3">Day Streak</div>
              <Button size="sm" variant="ghost" className="text-purple-600 hover:bg-purple-100 font-semibold" onClick={handleQuickMeditation}>
                Continue →
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced Landing page for non-authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/80 via-yellow-400/60 to-red-500/80"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
          <div className="flex justify-center mb-12">
            <div className="transition-transform duration-500 hover:scale-110">
              <img 
                src="/lovable-uploads/e81fabc3-1be6-4500-afbd-503816b027c1.png" 
                alt="AapkaSarthy Logo" 
                className="w-60 h-60 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg tracking-wide">AapkaSarthy</h1>
          <p className="text-2xl md:text-3xl text-white/95 mb-10 max-w-4xl mx-auto font-semibold leading-relaxed drop-shadow-md">
            🇮🇳 Guide to Your Soul - Experience personalized spiritual guidance with AI-powered meditation, sacred music, and authentic ritual bookings
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-orange-50 px-12 py-4 text-xl shadow-2xl font-bold border-2 border-white/20 transition-all duration-300 hover:scale-105"
              onClick={() => {
                toast.success('Welcome to your spiritual journey!');
                navigate('/register');
              }}
            >
              <User className="mr-3 h-7 w-7" />
              Begin Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-3 border-white text-white hover:bg-white hover:text-orange-600 px-12 py-4 text-xl font-bold shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/login-user')}
            >
              <Home className="mr-3 h-7 w-7" />
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Spiritual Features</h2>
          <p className="text-xl text-gray-700 font-semibold">Discover your inner peace through technology and tradition 🕉️</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="card-premium hover-lift group border-t-4 border-t-orange-500 bg-orange-50 shadow-lg rounded-xl">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Heart className="h-10 w-10 text-white group-hover:animate-pulse" />
              </div>
              <CardTitle className="text-xl text-orange-600 font-bold">AI Mood Meditation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-700 mb-4 font-medium leading-relaxed">
                Narad AI analyzes your mood and suggests personalized meditation practices for inner harmony
              </CardDescription>
              <Button 
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold shadow-lg hover-lift py-3 text-lg transition-all duration-300"
                onClick={() => navigate('/mood-selection')}
              >
                Try Narad AI
              </Button>
            </CardContent>
          </Card>

          <Card className="card-premium hover-lift group border-t-4 border-t-green-600 bg-green-50 shadow-lg rounded-xl">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <BookOpen className="h-10 w-10 text-white group-hover:animate-bounce" />
              </div>
              <CardTitle className="text-xl text-green-600 font-bold">Sacred Library</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-700 mb-4 font-medium leading-relaxed">
                Access thousands of bhajans, mantras, and spiritual content in 15+ Indian languages
              </CardDescription>
              <Button 
                variant="outline"
                className="w-full border-2 border-green-600 text-green-700 hover:bg-green-100 font-bold shadow-lg hover-lift py-3 text-lg transition-all duration-300"
                onClick={() => navigate('/media-library')}
              >
                Explore Library
              </Button>
            </CardContent>
          </Card>

          <Card className="card-premium hover-lift group border-t-4 border-t-blue-600 bg-blue-50 shadow-lg rounded-xl">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Calendar className="h-10 w-10 text-white group-hover:animate-spin" />
              </div>
              <CardTitle className="text-xl text-blue-700 font-bold">Ritual Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-700 mb-4 font-medium leading-relaxed">
                Book authentic poojas and ceremonies with verified priests and temples across India
              </CardDescription>
              <Button 
                variant="outline"
                className="w-full border-2 border-blue-700 text-blue-700 hover:bg-blue-100 font-bold shadow-lg hover-lift py-3 text-lg transition-all duration-300"
                onClick={() => navigate('/ritual-booking')}
              >
                Book Pooja
              </Button>
            </CardContent>
          </Card>

          <Card className="card-premium hover-lift group border-t-4 border-t-purple-600 bg-purple-50 shadow-lg rounded-xl">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                <ShoppingCart className="h-10 w-10 text-white group-hover:animate-pulse" />
              </div>
              <CardTitle className="text-xl text-purple-700 font-bold">Devotional Shop</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-700 mb-4 font-medium leading-relaxed">
                Spiritual items, books, malas, and authentic devotional products for your spiritual journey
              </CardDescription>
              <Button 
                variant="outline"
                className="w-full border-2 border-purple-700 text-purple-700 hover:bg-purple-100 font-bold shadow-lg hover-lift py-3 text-lg transition-all duration-300"
                onClick={handleDevotionalShop}
              >
                Shop Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="bg-gradient-to-r from-orange-600 via-yellow-400 to-green-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-700/80 via-yellow-300/60 to-green-700/80"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">Ready to Transform Your Spiritual Journey?</h2>
          <p className="text-xl mb-8 text-orange-100 font-semibold drop-shadow-md">Join thousands of souls finding peace through AapkaSarthy 🙏</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg font-bold border border-orange-300 hover-lift px-10 py-4 transition-all duration-300"
              onClick={() => {
                toast.success('Welcome to the spiritual community!');
                navigate('/register');
              }}
            >
              <Users className="mr-2 h-6 w-6" />
              Join as User
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold shadow-lg hover-lift px-10 py-4 transition-all duration-300"
              onClick={() => navigate('/login-admin')}
            >
              <Star className="mr-2 h-6 w-6" />
              Admin Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
