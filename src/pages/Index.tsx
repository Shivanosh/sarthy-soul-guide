
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, BookOpen, Calendar, Star, ArrowRight, Bell, Settings, User, LogOut, Home, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [dailyQuote, setDailyQuote] = useState('');
  const [streakCount, setStreakCount] = useState(7);
  const [todaysMood, setTodaysMood] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setCurrentUser(JSON.parse(user));
    }
    
    // Set daily spiritual quote
    const quotes = [
      "The mind is everything. What you think you become. - Buddha",
      "Yoga is a light, which once lit will never dim. - B.K.S. Iyengar",
      "The soul that sees beauty may sometimes walk alone. - Johann Wolfgang von Goethe",
      "Peace comes from within. Do not seek it without. - Buddha",
      "The best way to find yourself is to lose yourself in service. - Mahatma Gandhi"
    ];
    setDailyQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    
    // Load user's today mood
    const mood = localStorage.getItem('todaysMood');
    if (mood) setTodaysMood(mood);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('todaysMood');
    setCurrentUser(null);
    toast.success('Logged out successfully');
  };

  const handleQuickMeditation = () => {
    toast.success('Starting 5-minute guided meditation...');
    // In a real app, this would start a meditation session
    setTimeout(() => {
      toast.success('Meditation completed! +10 spiritual points earned');
      setStreakCount(prev => prev + 1);
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

  if (currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
        {/* Header with Tricolour theme */}
        <header className="bg-tricolour text-white p-4 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-white/10 to-green-600/90"></div>
          <div className="relative max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">AapkaSarthy</h1>
                <p className="text-xs text-orange-100">Guide to Your Soul</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="text-right">
                <span className="text-orange-100 text-sm">Namaste, {currentUser.name}</span>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className="bg-green-600 text-white text-xs">
                    {streakCount} day streak 🔥
                  </Badge>
                </div>
              </div>
              <Button variant="secondary" size="sm" onClick={handleLogout} className="bg-white text-orange-600 hover:bg-orange-50">
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Daily Quote Section */}
        <div className="max-w-6xl mx-auto p-6">
          <Card className="mb-6 border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-green-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold text-orange-800">Daily Wisdom</h3>
              </div>
              <p className="text-gray-700 italic">"{dailyQuote}"</p>
              <div className="flex space-x-2 mt-3">
                <Button size="sm" onClick={handleQuickMeditation} className="bg-orange-500 hover:bg-orange-600 text-white">
                  Quick Meditation (5 min)
                </Button>
                <Button size="sm" variant="outline" onClick={handleDailyChallenge} className="border-green-500 text-green-700 hover:bg-green-50">
                  Daily Challenge
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Enhanced Mood Selection Card */}
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500 group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-800">
                  <Heart className="h-5 w-5 group-hover:animate-pulse" />
                  <span>Mood Meditation</span>
                </CardTitle>
                <CardDescription>AI-powered meditation based on your current mood</CardDescription>
                {todaysMood && (
                  <Badge className="w-fit bg-orange-100 text-orange-800">
                    Today: {todaysMood}
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                  onClick={() => {
                    toast.success('Opening Narad AI mood analyzer...');
                    navigate('/mood-selection');
                  }}
                >
                  Start Meditation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Media Library Card */}
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500 group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <BookOpen className="h-5 w-5 group-hover:animate-bounce" />
                  <span>Spiritual Library</span>
                </CardTitle>
                <CardDescription>108+ Bhajans, chants, and spiritual content</CardDescription>
                <Badge className="w-fit bg-green-100 text-green-800">15 Languages</Badge>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full border-green-500 text-green-600 hover:bg-green-50"
                  onClick={() => {
                    toast.success('Loading spiritual media library...');
                    navigate('/media-library');
                  }}
                >
                  Explore Library <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Ritual Booking Card */}
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500 group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-800">
                  <Calendar className="h-5 w-5 group-hover:animate-spin" />
                  <span>Book Rituals</span>
                </CardTitle>
                <CardDescription>Schedule poojas with verified priests</CardDescription>
                <Badge className="w-fit bg-blue-100 text-blue-800">42+ Temples</Badge>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                  onClick={() => {
                    toast.success('Opening ritual booking system...');
                    navigate('/ritual-booking');
                  }}
                >
                  Book Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Admin Features with Tricolour theme */}
          {currentUser.role === 'admin' && (
            <div className="bg-tricolour p-6 rounded-lg border-l-4 border-l-yellow-500 mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-white/10 to-green-600/20"></div>
              <div className="relative">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Star className="mr-2 h-5 w-5 text-yellow-300" />
                  Admin Dashboard
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="secondary"
                    className="bg-white text-orange-700 hover:bg-orange-50 border border-orange-200"
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
                    className="bg-white text-green-700 hover:bg-green-50 border border-green-200"
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

          {/* Enhanced Stats with Tricolour theme */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center hover:shadow-md transition-all p-4 border-l-4 border-l-orange-400">
              <div className="text-2xl font-bold text-orange-600">108</div>
              <div className="text-sm text-gray-600">Meditations</div>
              <Button size="sm" variant="ghost" className="mt-2 text-orange-600" onClick={() => navigate('/media-library')}>
                Explore →
              </Button>
            </Card>
            <Card className="text-center hover:shadow-md transition-all p-4 border-l-4 border-l-green-400">
              <div className="text-2xl font-bold text-green-600">42</div>
              <div className="text-sm text-gray-600">Bhajans</div>
              <Button size="sm" variant="ghost" className="mt-2 text-green-600" onClick={() => navigate('/media-library')}>
                Listen →
              </Button>
            </Card>
            <Card className="text-center hover:shadow-md transition-all p-4 border-l-4 border-l-blue-400">
              <div className="text-2xl font-bold text-blue-600">15</div>
              <div className="text-sm text-gray-600">Rituals</div>
              <Button size="sm" variant="ghost" className="mt-2 text-blue-600" onClick={() => navigate('/ritual-booking')}>
                Book →
              </Button>
            </Card>
            <Card className="text-center hover:shadow-md transition-all p-4 border-l-4 border-l-purple-400">
              <div className="text-2xl font-bold text-purple-600">{streakCount}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
              <Button size="sm" variant="ghost" className="mt-2 text-purple-600" onClick={handleQuickMeditation}>
                Continue →
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Landing page for non-authenticated users with Tricolour theme
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Hero Section with Indian Tricolour */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-tricolour opacity-90"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center animate-pulse shadow-lg">
              <Heart className="h-12 w-12 text-orange-600" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            AapkaSarthy
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
            🇮🇳 Guide to Your Soul - Experience personalized spiritual guidance with AI-powered meditation, sacred music, and authentic ritual bookings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg shadow-lg"
              onClick={() => {
                toast.success('Welcome to your spiritual journey!');
                navigate('/register');
              }}
            >
              <User className="mr-2 h-5 w-5" />
              Begin Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg"
              onClick={() => navigate('/login-user')}
            >
              <Home className="mr-2 h-5 w-5" />
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section with Tricolour accents */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Spiritual Features</h2>
          <p className="text-lg text-gray-600">Discover your inner peace through technology and tradition 🕉️</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-all duration-300 group border-t-4 border-t-orange-500">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-orange-800">AI Mood Meditation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-600 mb-4">
                Narad AI analyzes your mood and suggests personalized meditation practices for inner harmony
              </CardDescription>
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => navigate('/mood-selection')}
              >
                Try Narad AI
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 group border-t-4 border-t-green-500">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-green-800">Sacred Library</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-600 mb-4">
                Access thousands of bhajans, mantras, and spiritual content in 15+ Indian languages
              </CardDescription>
              <Button 
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50"
                onClick={() => navigate('/media-library')}
              >
                Explore Library
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 group border-t-4 border-t-blue-500">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-blue-800">Ritual Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-600 mb-4">
                Book authentic poojas and ceremonies with verified priests and temples across India
              </CardDescription>
              <Button 
                variant="outline"
                className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                onClick={() => navigate('/ritual-booking')}
              >
                Book Pooja
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section with Tricolour */}
      <div className="bg-tricolour text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/80 via-white/20 to-green-600/80"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Spiritual Journey?</h2>
          <p className="text-xl mb-8 text-orange-100">Join thousands of souls finding peace through AapkaSarthy 🙏</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg"
              onClick={() => {
                toast.success('Welcome to the spiritual community!');
                navigate('/register');
              }}
            >
              <Users className="mr-2 h-5 w-5" />
              Join as User
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-orange-600"
              onClick={() => navigate('/login-admin')}
            >
              <Star className="mr-2 h-5 w-5" />
              Admin Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
