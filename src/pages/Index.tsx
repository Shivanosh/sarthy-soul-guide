import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Calendar, Book, Music, MapPin, User, Shield, Flame, Trophy, Target, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { dailyContentService } from '@/services/dailyContent';
import { loadMeditationStats } from '@/utils/meditationStats';

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [goodDeed, setGoodDeed] = useState({ text: '', category: '' });
  const [userStats, setUserStats] = useState({ streak: 0, totalXP: 0 });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      loadUserStats();
    } else {
      setUser(null);
    }

    const fetchQuoteAndDeed = async () => {
      try {
        const content = await dailyContentService.loadDailyContent();
        const [quoteText, author] = content.quote.split(' - ');
        setQuote({ text: quoteText, author: author || '' });
        setGoodDeed({ text: content.goodDeed, category: 'kindness' });
      } catch (error) {
        console.error('Failed to fetch daily content:', error);
        toast.error('Failed to load daily content. Please try again.');
      }
    };

    fetchQuoteAndDeed();
  }, []);

  useEffect(() => {
    if (user) {
      loadUserStats();
    }
  }, [user]);

  const loadUserStats = () => {
    try {
      const stats = loadMeditationStats();
      setUserStats({ 
        streak: stats.streak, 
        totalXP: stats.experiencePoints 
      });
    } catch (error) {
      console.error('Failed to load user stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login-user');
    toast.success('Logged out successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/e81fabc3-1be6-4500-afbd-503816b027c1.png" 
              alt="AapkaSarthy Logo" 
              className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                AapkaSarthy
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Your Spiritual Journey 🇮🇳</p>
            </div>
          </div>

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <Link to="/login-user" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700 bg-white font-medium px-4 py-2 h-10"
                >
                  <User className="mr-2 h-4 w-4" />
                  User Sign In
                </Button>
              </Link>
              <Link to="/login-admin" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800 bg-white font-medium px-4 py-2 h-10"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Admin Login
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              {/* User Stats */}
              <div className="flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-orange-100 to-green-100 px-3 sm:px-4 py-2 rounded-full">
                <div className="flex items-center gap-1">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-semibold text-orange-700">{userStats.streak}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">{userStats.totalXP}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <span className="text-sm font-medium text-gray-700 text-center sm:text-left">
                  Welcome, {user.name}!
                </span>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-3 py-1 h-8 text-sm"
                >
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Welcome Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="mb-6 sm:mb-8 flex justify-center">
            <img 
              src="/lovable-uploads/e81fabc3-1be6-4500-afbd-503816b027c1.png" 
              alt="AapkaSarthy - Your Spiritual Companion" 
              className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 object-contain mx-auto"
            />
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
            Welcome to Your Spiritual Journey
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Discover inner peace through meditation, explore sacred places, and connect with your spiritual self through our comprehensive platform.
          </p>
          
          {!user && (
            <div className="mt-6 sm:mt-8">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
                >
                  Begin Your Journey
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Daily Content Section */}
        {user && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg hover:shadow-xl transition-all duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg sm:text-xl font-bold text-orange-800 flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Daily Inspiration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="text-sm sm:text-base text-orange-700 italic leading-relaxed">
                  "{quote.text}"
                  {quote.author && <div className="mt-2 text-right text-sm font-medium">- {quote.author}</div>}
                </blockquote>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 shadow-lg hover:shadow-xl transition-all duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg sm:text-xl font-bold text-green-800 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Today's Good Deed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-green-700 leading-relaxed">{goodDeed.text}</p>
                <Badge variant="secondary" className="mt-2 bg-green-200 text-green-800 capitalize">
                  {goodDeed.category}
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Meditation Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-orange-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold text-gray-800">Meditation</CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600">
                Find inner peace with guided meditations and breathing exercises
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/mood-selection">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-2 sm:py-3">
                  Start Meditation
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Ritual Booking Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-orange-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold text-gray-800">Ritual Booking</CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600">
                Book sacred ceremonies and spiritual rituals
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/ritual-booking">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2 sm:py-3">
                  Book Ritual
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Media Library Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-orange-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Book className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold text-gray-800">Media Library</CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600">
                Explore spiritual books, music, and resources
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/media-library">
                <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium py-2 sm:py-3">
                  Browse Library
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Trip Planning Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-orange-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold text-gray-800">Trip Planning</CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600">
                Plan spiritual journeys to sacred destinations
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/trip-planning">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 sm:py-3">
                  Plan Journey
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Music Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-orange-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Music className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold text-gray-800">Spiritual Music</CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600">
                Listen to devotional songs and mantras
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium py-2 sm:py-3">
                Listen Now
              </Button>
            </CardContent>
          </Card>

          {/* Admin Panel Card - Only for Admin Users */}
          {user?.role === 'admin' && (
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-red-300 bg-gradient-to-br from-red-50 to-red-100">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-bold text-red-800">Admin Panel</CardTitle>
                <CardDescription className="text-sm sm:text-base text-red-600">
                  Manage content, rituals, and uploads
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <Link to="/admin/ritual-management" className="block">
                  <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2 mb-2">
                    Manage Rituals
                  </Button>
                </Link>
                <Link to="/admin/media-upload" className="block">
                  <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2">
                    Upload Content
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
