import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, BookOpen, Calendar, Star, ArrowRight, Bell, User, LogOut, Home, Sparkles, Plane, ShoppingCart, MessageCircle, Phone } from 'lucide-react';
import { toast } from 'sonner';
import NaradAIChat from '@/components/NaradAIChat';

const Header = ({ currentUser, streakCount, onLogout, onQuickMeditation, onShowNaradAI, onShowContactUs }) => {
  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-orange-100 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 sm:p-6">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <img 
                src="/lovable-uploads/b272acdb-7757-4417-b550-561c69ec192a.png" 
                alt="AapkaSarthy Logo" 
                className="h-12 sm:h-16 w-auto object-contain transition-all duration-300 hover:scale-105 drop-shadow-md"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onShowNaradAI}
            className="text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 p-2 sm:p-3 rounded-xl"
          >
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline ml-1">Narad AI</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onShowContactUs}
            className="text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 p-2 sm:p-3 rounded-xl"
          >
            <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline ml-1">Contact</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 p-2 sm:p-3 rounded-xl">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <div className="text-right">
            <span className="text-gray-700 text-sm sm:text-lg font-semibold">Namaste, {currentUser.name}</span>
            <div className="flex items-center space-x-2 mt-1 sm:mt-2">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-2 py-1 sm:px-4 sm:py-2 h-auto shadow-lg transition-all duration-300 text-xs sm:text-sm rounded-xl"
                onClick={onQuickMeditation}
              >
                🔥 {streakCount} day streak
              </Button>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onLogout} 
            className="bg-white text-orange-600 hover:bg-orange-50 border-2 border-orange-300 hover:border-orange-400 shadow-md font-semibold px-2 py-1 sm:px-4 sm:py-2 transition-all duration-300 text-xs sm:text-sm rounded-xl"
          >
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

const DailyWisdomCard = ({ dailyQuote, dailyGoodDeed, onQuickMeditation, onDailyChallenge, onDevotionalShop }) => {
  return (
    <Card className="mb-8 bg-gradient-to-br from-orange-50 via-white to-emerald-50 border-2 border-orange-200 shadow-2xl rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-500">
      <CardContent className="p-8 relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-orange-100/60 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-100/60 to-transparent rounded-full translate-y-16 -translate-x-16"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-orange-700 text-2xl">Daily Wisdom</h3>
          </div>
          <blockquote className="text-gray-700 italic font-medium text-lg leading-relaxed mb-6 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-l-4 border-orange-400 shadow-lg">
            "{dailyQuote}"
          </blockquote>
          {dailyGoodDeed && (
            <div className="mb-6 p-6 bg-emerald-50/80 backdrop-blur-sm rounded-2xl border-l-4 border-emerald-400 shadow-lg">
              <h4 className="font-bold text-emerald-700 mb-3 text-lg flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Good Deed of the Day
              </h4>
              <p className="text-emerald-600 text-lg">{dailyGoodDeed}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <Button 
              size="sm" 
              onClick={onQuickMeditation} 
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl font-bold px-6 py-3 transition-all duration-300 text-base rounded-xl hover:scale-105"
            >
              Quick Meditation (5 min)
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onDailyChallenge} 
              className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 shadow-xl font-bold px-6 py-3 transition-all duration-300 text-base rounded-xl hover:scale-105"
            >
              Daily Challenge
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onDevotionalShop} 
              className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 shadow-xl font-bold px-6 py-3 transition-all duration-300 text-base rounded-xl hover:scale-105 flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Shop
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FeatureCard = ({ icon: Icon, title, description, badgeText, badgeColor, buttonText, buttonVariant, onButtonClick }) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-2 border-gray-100 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 rounded-3xl group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="pb-4 text-center relative z-10">
        <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl ${badgeColor} flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
          <Icon className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
        </div>
        <CardTitle className="text-xl font-bold mb-3 text-gray-800 group-hover:text-orange-600 transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 font-medium leading-relaxed text-base">
          {description}
        </CardDescription>
        {badgeText && (
          <Badge className={`w-fit mx-auto ${badgeColor.replace('from-', 'bg-').replace('to-', '')} text-white border-0 font-semibold mt-3 shadow-md`}>
            {badgeText}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="pt-0 relative z-10">
        <Button 
          variant={buttonVariant} 
          className="w-full font-bold shadow-lg py-3 text-lg transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white rounded-xl hover:scale-105"
          onClick={onButtonClick}
        >
          {buttonText} <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};

const StatsCard = ({ count, label, color, onClick, buttonText }) => {
  return (
    <Card className={`text-center p-6 border-2 bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group`}>
      <div className={`text-4xl font-bold ${color.replace('border-', 'text-')} mb-2 group-hover:scale-110 transition-transform`}>
        {count}
      </div>
      <div className="text-sm text-gray-600 font-semibold mb-3">{label}</div>
      <Button 
        size="sm" 
        variant="ghost" 
        className={`${color.replace('border-', 'text-')} hover:bg-orange-50 font-semibold transition-all duration-300 group-hover:bg-orange-50 rounded-xl`} 
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </Card>
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
  const [showContactUs, setShowContactUs] = useState(false);

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
  };

  const handleContactUs = () => {
    setShowContactUs(true);
    toast.success('Contact form opened! Reach out for support and feedback.');
  };

  return (
    <>
      {currentUser ? (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-emerald-50 relative">
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF6B35' fill-opacity='0.1'%3E%3Cpath d='M50 30c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20zm0 5c-8.284 0-15 6.716-15 15s6.716 15 15 15 15-6.716 15-15-6.716-15-15-15z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <Header 
            currentUser={currentUser} 
            streakCount={streakCount} 
            onLogout={handleLogout} 
            onQuickMeditation={handleQuickMeditation} 
            onShowNaradAI={() => setShowNaradAI(true)} 
            onShowContactUs={handleContactUs} 
          />

          {/* Narad AI Chat Modal */}
          {showNaradAI && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl max-w-4xl w-full h-[80vh] flex flex-col shadow-2xl border-2 border-orange-200">
                <div className="flex justify-between items-center p-6 border-b border-orange-100">
                  <h2 className="text-xl font-bold text-gray-800">Narad AI - Your Spiritual Guide</h2>
                  <Button variant="ghost" onClick={() => setShowNaradAI(false)} className="rounded-xl hover:bg-orange-50">✕</Button>
                </div>
                <div className="flex-1 overflow-hidden">
                  <NaradAIChat />
                </div>
              </div>
            </div>
          )}

          {/* Contact Us Modal */}
          {showContactUs && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-orange-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Contact Us</h2>
                  <Button variant="ghost" onClick={() => setShowContactUs(false)} className="rounded-xl hover:bg-orange-50">✕</Button>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600">Get in touch with our spiritual support team</p>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Email:</strong> support@aapkasarthy.com</p>
                    <p className="text-sm"><strong>Phone:</strong> +91 9876543210</p>
                    <p className="text-sm"><strong>Address:</strong> Spiritual Center, New Delhi, India</p>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-lg">
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-7xl mx-auto p-4 sm:p-6 relative z-10">
            <DailyWisdomCard 
              dailyQuote={dailyQuote} 
              dailyGoodDeed={dailyGoodDeed} 
              onQuickMeditation={handleQuickMeditation} 
              onDailyChallenge={handleDailyChallenge} 
              onDevotionalShop={handleDevotionalShop} 
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <FeatureCard 
                icon={MessageCircle}
                title="Narad AI Chat"
                description="Chat with AI for mood-based meditation and spiritual guidance"
                badgeText={todaysMood ? `Today: ${todaysMood}` : null}
                badgeColor="bg-gradient-to-br from-orange-500 to-orange-600"
                buttonText="Chat with Narad AI"
                buttonVariant="default"
                onButtonClick={() => setShowNaradAI(true)}
              />
              <FeatureCard 
                icon={BookOpen}
                title="Spiritual Library"
                description="108+ Bhajans, chants, and spiritual content"
                badgeText="15 Languages"
                badgeColor="bg-gradient-to-br from-emerald-600 to-emerald-700"
                buttonText="Explore Library"
                buttonVariant="outline"
                onButtonClick={() => navigate('/media-library')}
              />
              <FeatureCard 
                icon={Calendar}
                title="Book Rituals"
                description="Schedule poojas with verified priests"
                badgeText="42+ Temples"
                badgeColor="bg-gradient-to-br from-blue-600 to-indigo-700"
                buttonText="Book Now"
                buttonVariant="outline"
                onButtonClick={() => navigate('/ritual-booking')}
              />
              <FeatureCard 
                icon={Plane}
                title="Trip Planning"
                description="Plan sacred journeys to spiritual destinations"
                badgeText="12+ Destinations"
                badgeColor="bg-gradient-to-br from-purple-600 to-pink-700"
                buttonText="Plan Journey"
                buttonVariant="outline"
                onButtonClick={() => navigate('/trip-planning')}
              />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard 
                count={108} 
                label="Meditations" 
                color="border-orange-500" 
                onClick={() => navigate('/media-library')} 
                buttonText="Explore →" 
              />
              <StatsCard 
                count={42} 
                label="Bhajans" 
                color="border-emerald-600" 
                onClick={() => navigate('/media-library')} 
                buttonText="Listen →" 
              />
              <StatsCard 
                count={15} 
                label="Rituals" 
                color="border-blue-600" 
                onClick={() => navigate('/ritual-booking')} 
                buttonText="Book →" 
              />
              <StatsCard 
                count={streakCount} 
                label="Day Streak" 
                color="border-purple-600" 
                onClick={handleQuickMeditation} 
                buttonText="Continue →" 
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-emerald-50 relative">
          {/* Enhanced Hero Background with Logo */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200/60 rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/60 rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-pulse"></div>
            <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-200/60 rounded-full mix-blend-multiply filter blur-3xl opacity-80 animate-pulse"></div>
            
            {/* Large Background Logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <img 
                src="/lovable-uploads/b272acdb-7757-4417-b550-561c69ec192a.png" 
                alt="AapkaSarthy Background Logo" 
                className="w-[600px] h-auto sm:w-[700px] lg:w-[800px] object-contain"
              />
            </div>
          </div>
          
          {/* Hero Section */}
          <div className="relative overflow-hidden">
            <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-32 text-center">
              <div className="flex justify-center mb-16">
                <div className="relative group transition-all duration-700 hover:scale-105">
                  {/* Glowing backdrop */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-300 to-emerald-400 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-700 scale-125"></div>
                  
                  {/* Secondary glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-3xl blur-2xl opacity-20 group-hover:opacity-35 transition-all duration-700 scale-110 animate-pulse"></div>
                  
                  {/* Main logo container */}
                  <div className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-white/30">
                    <img 
                      src="/lovable-uploads/b272acdb-7757-4417-b550-561c69ec192a.png" 
                      alt="AapkaSarthy Logo" 
                      className="w-64 h-auto sm:w-80 lg:w-96 object-contain drop-shadow-2xl filter brightness-110 contrast-110"
                    />
                  </div>
                  
                  {/* Floating particles effect */}
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400 rounded-full opacity-60 animate-ping"></div>
                  <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-emerald-500 rounded-full opacity-50 animate-pulse"></div>
                  <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-70 animate-bounce"></div>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-emerald-600 bg-clip-text text-transparent drop-shadow-sm">
                  Guide to Your Soul
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-12 max-w-4xl mx-auto font-medium leading-relaxed">
                🇮🇳 Experience personalized spiritual guidance with AI-powered meditation, sacred music, and authentic ritual bookings
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-4 text-xl shadow-2xl font-bold transition-all duration-300 hover:scale-105 rounded-2xl"
                  onClick={() => {
                    toast.success('Welcome to your spiritual journey!');
                    navigate('/register');
                  }}
                >
                  <User className="mr-3 h-6 w-6" />
                  Begin Your Journey
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 px-12 py-4 text-xl font-bold shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl"
                  onClick={() => navigate('/login-user')}
                >
                  <Home className="mr-3 h-6 w-6" />
                  Sign In
                </Button>
              </div>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-gray-300 text-gray-600 bg-white/80 hover:bg-gray-50 px-10 py-3 text-lg font-bold shadow-lg transition-all duration-300 hover:scale-105 rounded-2xl backdrop-blur-sm"
                onClick={() => navigate('/login-admin')}
              >
                <Star className="mr-2 h-5 w-5" />
                Admin Login
              </Button>
            </div>
          </div>

          {/* About Section */}
          <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">About AapkaSarthy</h2>
              <p className="text-xl text-gray-600 font-medium">Your spiritual companion for inner peace and wisdom 🕉️</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-orange-200">
              <p className="text-gray-600 text-lg leading-relaxed mb-8 text-center max-w-4xl mx-auto">
                AapkaSarthy is more than just a spiritual platform - it's your personal guide to discovering inner peace and wisdom. 
                Our AI-powered system provides personalized meditation experiences, connects you with sacred music and literature, 
                and helps you book authentic spiritual rituals with verified priests across India.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-3xl bg-gradient-to-br from-orange-50 to-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-orange-100">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Heart className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3 text-xl">AI-Powered Guidance</h3>
                  <p className="text-gray-600 leading-relaxed">Personalized spiritual content based on your mood and needs</p>
                </div>
                
                <div className="text-center p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-emerald-100">
                  <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <BookOpen className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3 text-xl">Sacred Library</h3>
                  <p className="text-gray-600 leading-relaxed">Thousands of bhajans, mantras, and spiritual texts in multiple languages</p>
                </div>
                
                <div className="text-center p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-blue-100">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Calendar className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3 text-xl">Authentic Rituals</h3>
                  <p className="text-gray-600 leading-relaxed">Connect with verified priests and temples for traditional ceremonies</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white/90 backdrop-blur-sm py-16 border-t-2 border-orange-200">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-8">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="flex flex-col items-center p-6 rounded-3xl bg-gradient-to-br from-orange-50 to-white shadow-xl border-2 border-orange-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">Phone</h3>
                  <p className="text-gray-600">+91 9876543210</p>
                </div>
                
                <div className="flex flex-col items-center p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-white shadow-xl border-2 border-emerald-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mb-4 shadow-xl">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">Email</h3>
                  <p className="text-gray-600">support@aapkasarthy.com</p>
                </div>
                
                <div className="flex flex-col items-center p-6 rounded-3xl bg-gradient-to-br from-blue-50 to-white shadow-xl border-2 border-blue-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4 shadow-xl">
                    <Home className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">Address</h3>
                  <p className="text-gray-600">Spiritual Center, New Delhi, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-orange-500 via-white to-emerald-600 relative overflow-hidden py-20">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/90 via-white/95 to-emerald-600/90"></div>
            <div className="relative max-w-4xl mx-auto text-center px-4">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">Ready to Transform Your Spiritual Journey?</h2>
              <p className="text-xl mb-8 text-gray-700 font-medium">Join thousands of souls finding peace through AapkaSarthy 🙏</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-2xl font-bold px-10 py-4 transition-all duration-300 rounded-2xl hover:scale-105"
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
                  className="border-2 border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 font-bold shadow-xl px-10 py-4 transition-all duration-300 rounded-2xl hover:scale-105"
                  onClick={() => navigate('/login-admin')}
                >
                  <Star className="mr-2 h-6 w-6" />
                  Admin Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
