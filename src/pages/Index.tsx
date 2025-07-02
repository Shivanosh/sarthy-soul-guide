import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, Users, BookOpen, Calendar, Star, ArrowRight, Bell, User, LogOut, Home, Sparkles, Plane, ShoppingCart, MessageCircle, Phone, Mail, MapPin, Shield } from 'lucide-react';
import { toast } from 'sonner';
import NaradAIChat from '@/components/NaradAIChat';

const Header = ({ currentUser, streakCount, onLogout, onShowNaradAI, onScrollToContact }) => {
  return (
    <header className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/b272acdb-7757-4417-b550-561c69ec192a.png" 
              alt="AapkaSarthy" 
              className="h-16 w-auto"
            />
          </div>
          
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onShowNaradAI}
                className="text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Narad AI
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onScrollToContact}
                className="text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <div className="text-right">
                <span className="text-gray-700 font-medium">Namaste, {currentUser.name}</span>
                <div className="text-sm text-gray-500">🔥 {streakCount} day streak</div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onScrollToContact}
                className="text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                Contact Us
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/login-admin'}
                className="text-orange-600 border-orange-600 hover:bg-orange-50"
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/login-user'}
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => window.location.href = '/register'}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const HeroSection = ({ currentUser, onQuickMeditation, onDailyChallenge }) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Find Your Inner Peace
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-100 leading-relaxed max-w-3xl mx-auto">
            Experience personalized spiritual guidance with AI-powered meditation, sacred music, and authentic ritual bookings across India
          </p>
          {currentUser && (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                onClick={onQuickMeditation}
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-4"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Quick Meditation (5 min)
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={onDailyChallenge}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-4"
              >
                <Heart className="mr-2 h-5 w-5" />
                Daily Challenge
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DailyWisdomCard = ({ dailyQuote, dailyGoodDeed, onQuickMeditation, onDailyChallenge, onDevotionalShop }) => {
  return (
    <Card className="mb-8 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h3 className="font-bold text-orange-700 text-2xl">Daily Wisdom</h3>
        </div>
        <blockquote className="text-gray-700 italic mb-6 p-6 bg-white rounded-xl border-l-4 border-orange-400 shadow-sm text-lg">
          "{dailyQuote}"
        </blockquote>
        {dailyGoodDeed && (
          <div className="mb-6 p-6 bg-green-50 rounded-xl border-l-4 border-green-400 shadow-sm">
            <h4 className="font-bold text-green-700 mb-3 flex items-center text-lg">
              <Heart className="h-5 w-5 mr-2" />
              Good Deed of the Day
            </h4>
            <p className="text-green-600 text-base">{dailyGoodDeed}</p>
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          <Button 
            size="sm" 
            onClick={onQuickMeditation}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Quick Meditation
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onDailyChallenge}
            className="border-green-500 text-green-600 hover:bg-green-50 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Heart className="h-4 w-4 mr-2" />
            Daily Challenge
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onDevotionalShop}
            className="border-purple-500 text-purple-600 hover:bg-purple-50 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Shop
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const FeatureCard = ({ icon: Icon, title, description, badgeText, buttonText = "Explore" }) => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 h-full group border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="text-center pb-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <Icon className="h-10 w-10 text-white" />
        </div>
        <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{title}</CardTitle>
        <CardDescription className="text-gray-600 text-base leading-relaxed">{description}</CardDescription>
        {badgeText && (
          <Badge className="w-fit mx-auto bg-blue-100 text-blue-800 mt-3 px-3 py-1">
            {badgeText}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <Button 
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-3"
          disabled
        >
          {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <p className="text-xs text-gray-500 text-center mt-2">Sign in to access</p>
      </CardContent>
    </Card>
  );
};

const StatsCard = ({ count, label, buttonText }) => {
  return (
    <Card className="text-center hover:shadow-xl transition-all duration-300 group border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
      <CardContent className="p-8">
        <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-3 group-hover:scale-110 transition-transform duration-300">{count}</div>
        <div className="text-sm text-gray-600 mb-4 font-medium">{label}</div>
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-blue-600 hover:bg-blue-50 transition-all duration-300"
          disabled
        >
          {buttonText}
        </Button>
        <p className="text-xs text-gray-500 mt-1">Sign in required</p>
      </CardContent>
    </Card>
  );
};

const ContactSection = () => {
  return (
    <div id="contact" className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h2>
          <p className="text-xl text-gray-600">Get in touch with our spiritual support team</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-800 mb-3 text-lg">Phone</h3>
            <p className="text-gray-600 text-lg">+91 9876543210</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-800 mb-3 text-lg">Email</h3>
            <p className="text-gray-600 text-lg">support@aapkasarthy.com</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-800 mb-3 text-lg">Address</h3>
            <p className="text-gray-600 text-lg">Spiritual Center, New Delhi, India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [dailyQuote, setDailyQuote] = useState('');
  const [dailyGoodDeed, setDailyGoodDeed] = useState('');
  const [streakCount, setStreakCount] = useState(0);
  const [todaysMood, setTodaysMood] = useState('');
  const [showNaradAI, setShowNaradAI] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setCurrentUser(JSON.parse(user));
      calculateStreak();
    }
    
    loadDailyContent();
    
    const mood = localStorage.getItem('todaysMood');
    if (mood) setTodaysMood(mood);
  }, []);

  const calculateStreak = () => {
    const today = new Date().toDateString();
    const lastLogin = localStorage.getItem('lastLoginDate');
    const currentStreak = parseInt(localStorage.getItem('streakCount') || '0');
    
    if (!lastLogin) {
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
      const newStreak = currentStreak + 1;
      setStreakCount(newStreak);
      localStorage.setItem('streakCount', newStreak.toString());
      localStorage.setItem('lastLoginDate', today);
    } else if (diffDays > 1) {
      setStreakCount(1);
      localStorage.setItem('streakCount', '1');
      localStorage.setItem('lastLoginDate', today);
    } else {
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
      fetchDailyContent();
    }
  };

  const fetchDailyContent = async () => {
    try {
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

      const dailyIndex = new Date().getDate() % quotes.length;
      const randomQuote = quotes[dailyIndex];
      const randomGoodDeed = goodDeeds[dailyIndex];
      
      setDailyQuote(randomQuote);
      setDailyGoodDeed(randomGoodDeed);
      
      const today = new Date().toDateString();
      localStorage.setItem('dailyQuote', randomQuote);
      localStorage.setItem('dailyGoodDeed', randomGoodDeed);
      localStorage.setItem('dailyQuoteDate', today);
      
    } catch (error) {
      console.error('Error fetching daily content:', error);
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
    const currentStats = JSON.parse(localStorage.getItem('meditationStats') || '{}');
    
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
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentUser={currentUser} 
        streakCount={streakCount} 
        onLogout={handleLogout} 
        onShowNaradAI={() => setShowNaradAI(true)} 
        onScrollToContact={scrollToContact} 
      />

      {/* Narad AI Chat Modal with Enhanced Scrollable Content */}
      {showNaradAI && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full h-[85vh] flex flex-col shadow-2xl border-0">
            <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-800">Narad AI - Your Spiritual Guide</h2>
              <Button 
                variant="ghost" 
                onClick={() => setShowNaradAI(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-full p-2"
              >
                ✕
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 bg-gradient-to-br from-blue-50/30 to-purple-50/30">
                  <NaradAIChat />
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      )}

      <HeroSection 
        currentUser={currentUser}
        onQuickMeditation={handleQuickMeditation}
        onDailyChallenge={handleDailyChallenge}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {currentUser && (
          <DailyWisdomCard 
            dailyQuote={dailyQuote} 
            dailyGoodDeed={dailyGoodDeed} 
            onQuickMeditation={handleQuickMeditation} 
            onDailyChallenge={handleDailyChallenge} 
            onDevotionalShop={handleDevotionalShop} 
          />
        )}

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Explore Our Spiritual Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover a comprehensive suite of spiritual tools and services designed to enhance your journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={MessageCircle}
              title="Narad AI Chat"
              description="Chat with AI for mood-based meditation and spiritual guidance"
              badgeText={todaysMood ? `Today: ${todaysMood}` : "AI Powered"}
              buttonText="Start Chat"
            />
            <FeatureCard 
              icon={BookOpen}
              title="Spiritual Library"
              description="108+ Bhajans, chants, and spiritual content"
              badgeText="15 Languages"
              buttonText="Browse Library"
            />
            <FeatureCard 
              icon={Calendar}
              title="Book Rituals"
              description="Schedule poojas with verified priests"
              badgeText="42+ Temples"
              buttonText="Book Now"
            />
            <FeatureCard 
              icon={Plane}
              title="Trip Planning"
              description="Plan sacred journeys to spiritual destinations"
              badgeText="12+ Destinations"
              buttonText="Plan Trip"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Impact</h2>
            <p className="text-xl text-gray-600">Join thousands on their spiritual journey</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatsCard 
              count={108} 
              label="Meditations" 
              buttonText="Explore →" 
            />
            <StatsCard 
              count={42} 
              label="Bhajans" 
              buttonText="Listen →" 
            />
            <StatsCard 
              count={15} 
              label="Rituals" 
              buttonText="Book →" 
            />
            <StatsCard 
              count={streakCount || "5+"} 
              label="Day Streak" 
              buttonText="Continue →" 
            />
          </div>
        </div>
      </div>

      <ContactSection />
    </div>
  );
};

export default Index;
