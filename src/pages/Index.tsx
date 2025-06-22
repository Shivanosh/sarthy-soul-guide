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
        {/* Header with enhanced contrast and logo */}
        <header className="bg-tricolour text-white p-4 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-saffron-dark/90 via-white/10 to-indian-green/90"></div>
          <div className="relative max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-1">
                <img 
                  src="/lovable-uploads/e81fabc3-1be6-4500-afbd-503816b027c1.png" 
                  alt="AapkaSarthy Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white-contrast">AapkaSarthy</h1>
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
                  <Badge className="bg-indian-green text-white text-xs">
                    {streakCount} day streak 🔥
                  </Badge>
                </div>
              </div>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleLogout} 
                className="bg-white text-saffron-dark hover:bg-orange-50 border border-saffron/20"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Daily Quote Section with improved contrast */}
        <div className="max-w-6xl mx-auto p-6">
          <Card className="mb-6 border-l-4 border-l-saffron bg-gradient-to-r from-orange-50 to-green-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-5 w-5 text-saffron" />
                <h3 className="font-semibold text-saffron-dark">Daily Wisdom</h3>
              </div>
              <p className="text-gray-800 italic font-medium">"{dailyQuote}"</p>
              <div className="flex space-x-2 mt-3">
                <Button size="sm" onClick={handleQuickMeditation} className="bg-saffron hover:bg-saffron-dark text-white">
                  Quick Meditation (5 min)
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleDailyChallenge} 
                  className="border-indian-green text-indian-green hover:bg-green-50"
                >
                  Daily Challenge
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Feature Cards with improved contrast */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Enhanced Mood Selection Card */}
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-saffron group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-saffron-dark">
                  <Heart className="h-5 w-5 group-hover:animate-pulse" />
                  <span>Mood Meditation</span>
                </CardTitle>
                <CardDescription className="text-gray-700">AI-powered meditation based on your current mood</CardDescription>
                {todaysMood && (
                  <Badge className="w-fit bg-orange-100 text-saffron-dark border border-saffron/20">
                    Today: {todaysMood}
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-saffron to-saffron-dark hover:from-saffron-dark hover:to-saffron text-white font-medium"
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
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-indian-green group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-indian-green">
                  <BookOpen className="h-5 w-5 group-hover:animate-bounce" />
                  <span>Spiritual Library</span>
                </CardTitle>
                <CardDescription className="text-gray-700">108+ Bhajans, chants, and spiritual content</CardDescription>
                <Badge className="w-fit bg-green-100 text-indian-green border border-indian-green/20">15 Languages</Badge>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full border-indian-green text-indian-green hover:bg-green-50 font-medium"
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
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600 group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-700">
                  <Calendar className="h-5 w-5 group-hover:animate-spin" />
                  <span>Book Rituals</span>
                </CardTitle>
                <CardDescription className="text-gray-700">Schedule poojas with verified priests</CardDescription>
                <Badge className="w-fit bg-blue-100 text-blue-700 border border-blue-600/20">42+ Temples</Badge>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 font-medium"
                  onClick={() => {
                    toast.success('Opening ritual booking system...');
                    navigate('/ritual-booking');
                  }}
                >
                  Book Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* New Trip Planning Card */}
            <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-600 group">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-700">
                  <ArrowRight className="h-5 w-5 group-hover:animate-pulse rotate-45" />
                  <span>Trip Planning</span>
                </CardTitle>
                <CardDescription className="text-gray-700">Plan sacred journeys to spiritual destinations</CardDescription>
                <Badge className="w-fit bg-purple-100 text-purple-700 border border-purple-600/20">12+ Destinations</Badge>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 font-medium"
                  onClick={() => {
                    toast.success('Opening trip planning...');
                    navigate('/trip-planning');
                  }}
                >
                  Plan Journey <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Admin Features with enhanced contrast */}
          {currentUser.role === 'admin' && (
            <div className="bg-tricolour p-6 rounded-lg border-l-4 border-l-yellow-500 mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-saffron-dark/20 via-white/10 to-indian-green/20"></div>
              <div className="relative">
                <h2 className="text-xl font-semibold text-white-contrast mb-4 flex items-center">
                  <Star className="mr-2 h-5 w-5 text-yellow-300" />
                  Admin Dashboard
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="secondary"
                    className="bg-white text-saffron-dark hover:bg-orange-50 border border-saffron/20 font-medium"
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
                    className="bg-white text-indian-green hover:bg-green-50 border border-indian-green/20 font-medium"
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

          {/* Enhanced Stats with improved contrast */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center hover:shadow-md transition-all p-4 border-l-4 border-l-saffron">
              <div className="text-2xl font-bold text-saffron">108</div>
              <div className="text-sm text-gray-700 font-medium">Meditations</div>
              <Button size="sm" variant="ghost" className="mt-2 text-saffron hover:bg-orange-50" onClick={() => navigate('/media-library')}>
                Explore →
              </Button>
            </Card>
            <Card className="text-center hover:shadow-md transition-all p-4 border-l-4 border-l-indian-green">
              <div className="text-2xl font-bold text-indian-green">42</div>
              <div className="text-sm text-gray-700 font-medium">Bhajans</div>
              <Button size="sm" variant="ghost" className="mt-2 text-indian-green hover:bg-green-50" onClick={() => navigate('/media-library')}>
                Listen →
              </Button>
            </Card>
            <Card className="text-center hover:shadow-md transition-all p-4 border-l-4 border-l-blue-500">
              <div className="text-2xl font-bold text-blue-600">15</div>
              <div className="text-sm text-gray-700 font-medium">Rituals</div>
              <Button size="sm" variant="ghost" className="mt-2 text-blue-600 hover:bg-blue-50" onClick={() => navigate('/ritual-booking')}>
                Book →
              </Button>
            </Card>
            <Card className="text-center hover:shadow-md transition-all p-4 border-l-4 border-l-purple-400">
              <div className="text-2xl font-bold text-purple-600">{streakCount}</div>
              <div className="text-sm text-gray-700 font-medium">Day Streak</div>
              <Button size="sm" variant="ghost" className="mt-2 text-purple-600 hover:bg-purple-50" onClick={handleQuickMeditation}>
                Continue →
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Landing page for non-authenticated users with enhanced logo and contrast
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Hero Section with logo and enhanced contrast */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-tricolour opacity-95"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center animate-pulse shadow-2xl p-2">
              <img 
                src="/lovable-uploads/e81fabc3-1be6-4500-afbd-503816b027c1.png" 
                alt="AapkaSarthy Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white-contrast mb-6">
            AapkaSarthy
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto font-medium">
            🇮🇳 Guide to Your Soul - Experience personalized spiritual guidance with AI-powered meditation, sacred music, and authentic ritual bookings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-saffron-dark hover:bg-orange-50 px-8 py-3 text-lg shadow-lg font-semibold border border-saffron/20"
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
              className="border-2 border-white text-white hover:bg-white hover:text-saffron-dark px-8 py-3 text-lg font-semibold"
              onClick={() => navigate('/login-user')}
            >
              <Home className="mr-2 h-5 w-5" />
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section with enhanced contrast */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Spiritual Features</h2>
          <p className="text-lg text-gray-700 font-medium">Discover your inner peace through technology and tradition 🕉️</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-all duration-300 group border-t-4 border-t-saffron">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-saffron to-saffron-dark rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-saffron-dark">AI Mood Meditation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-700 mb-4 font-medium">
                Narad AI analyzes your mood and suggests personalized meditation practices for inner harmony
              </CardDescription>
              <Button 
                className="w-full bg-saffron hover:bg-saffron-dark text-white font-medium"
                onClick={() => navigate('/mood-selection')}
              >
                Try Narad AI
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 group border-t-4 border-t-indian-green">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-indian-green to-indian-green-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-indian-green">Sacred Library</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-700 mb-4 font-medium">
                Access thousands of bhajans, mantras, and spiritual content in 15+ Indian languages
              </CardDescription>
              <Button 
                variant="outline"
                className="w-full border-indian-green text-indian-green hover:bg-green-50 font-medium"
                onClick={() => navigate('/media-library')}
              >
                Explore Library
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 group border-t-4 border-t-blue-600">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-blue-700">Ritual Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-700 mb-4 font-medium">
                Book authentic poojas and ceremonies with verified priests and temples across India
              </CardDescription>
              <Button 
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 font-medium"
                onClick={() => navigate('/ritual-booking')}
              >
                Book Pooja
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 group border-t-4 border-t-purple-600">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                <ArrowRight className="h-8 w-8 text-white rotate-45" />
              </div>
              <CardTitle className="text-xl text-purple-700">Trip Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-700 mb-4 font-medium">
                Plan sacred journeys to spiritual destinations with guided itineraries and temple visits
              </CardDescription>
              <Button 
                variant="outline"
                className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 font-medium"
                onClick={() => navigate('/trip-planning')}
              >
                Plan Journey
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section with enhanced contrast */}
      <div className="bg-tricolour text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-saffron-dark/80 via-white/20 to-indian-green/80"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4 text-white-contrast">Ready to Transform Your Spiritual Journey?</h2>
          <p className="text-xl mb-8 text-orange-100 font-medium">Join thousands of souls finding peace through AapkaSarthy 🙏</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-saffron-dark hover:bg-orange-50 shadow-lg font-semibold border border-saffron/20"
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
              className="border-2 border-white text-white hover:bg-white hover:text-saffron-dark font-semibold"
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
