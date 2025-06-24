import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, BookOpen, Calendar, Star, ArrowRight, Bell, Settings, User, LogOut, Home, Sparkles, Plane, ShoppingCart, MessageCircle, Phone, Upload, FileText } from 'lucide-react';
import { toast } from 'sonner';
import NaradAIChat from '@/components/NaradAIChat';

const Header = ({ currentUser, streakCount, onLogout, onQuickMeditation, onShowNaradAI, onShowContactUs }) => {
  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-orange-200 shadow-lg relative z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 sm:p-6">
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="flex flex-col items-center">
            <img 
              src="/lovable-uploads/e81fabc3-1be6-4500-afbd-503816b027c1.png" 
              alt="AapkaSarthy Logo" 
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain transition-transform duration-300 hover:scale-105"
            />
            <div className="text-center mt-2">
              <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 tracking-wide">Guide to Your Soul</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onShowNaradAI}
            className="text-gray-800 hover:bg-orange-100 transition-all duration-300 p-2 sm:p-3"
          >
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline ml-1">Narad AI</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onShowContactUs}
            className="text-gray-800 hover:bg-orange-100 transition-all duration-300 p-2 sm:p-3"
          >
            <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline ml-1">Contact</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-800 hover:bg-orange-100 transition-all duration-300 p-2 sm:p-3">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <div className="text-right">
            <span className="text-gray-800 text-sm sm:text-lg font-semibold">Namaste, {currentUser.name}</span>
            <div className="flex items-center space-x-2 mt-1 sm:mt-2">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-2 py-1 sm:px-4 sm:py-2 h-auto shadow-lg transition-all duration-300 text-xs sm:text-sm"
                onClick={onQuickMeditation}
              >
                🔥 {streakCount} day streak
              </Button>
            </div>
          </div>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={onLogout} 
            className="bg-white text-orange-600 hover:bg-orange-50 border-2 border-orange-200 shadow-lg font-semibold px-2 py-1 sm:px-4 sm:py-2 transition-all duration-300 text-xs sm:text-sm"
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
    <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-l-orange-500 shadow-xl transition-all duration-300 hover:shadow-2xl">
      <CardContent className="p-4 sm:p-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center shadow-lg">
            <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
          </div>
          <h3 className="font-bold text-orange-700 text-lg sm:text-2xl">Daily Wisdom</h3>
        </div>
        <p className="text-gray-800 italic font-medium text-base sm:text-xl leading-relaxed mb-4 sm:mb-6 bg-white/60 p-3 sm:p-4 rounded-lg">"{dailyQuote}"</p>
        {dailyGoodDeed && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 rounded-xl border-l-4 border-green-500 shadow-sm">
            <h4 className="font-bold text-green-800 mb-2 sm:mb-3 text-base sm:text-lg">Good Deed of the Day</h4>
            <p className="text-green-700 text-sm sm:text-lg">{dailyGoodDeed}</p>
          </div>
        )}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Button 
            size="sm" 
            onClick={onQuickMeditation} 
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg font-bold px-3 py-2 sm:px-6 sm:py-3 transition-all duration-300 text-xs sm:text-base"
          >
            Quick Meditation (5 min)
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onDailyChallenge} 
            className="border-2 border-green-500 text-green-600 hover:bg-green-50 shadow-lg font-bold px-3 py-2 sm:px-6 sm:py-3 transition-all duration-300 text-xs sm:text-base"
          >
            Daily Challenge
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onDevotionalShop} 
            className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 shadow-lg font-bold px-3 py-2 sm:px-6 sm:py-3 transition-all duration-300 text-xs sm:text-base"
          >
            <ShoppingCart className="h-3 w-3 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
            Shop
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const FeatureCard = ({ icon: Icon, title, description, badgeText, badgeColor, buttonText, buttonVariant, onButtonClick }) => {
  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 border-0 rounded-2xl">
      <CardHeader className="pb-3 sm:pb-4 text-center">
        <div className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full ${badgeColor} flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xl`}>
          <Icon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
        </div>
        <CardTitle className="text-base sm:text-xl font-bold mb-2">{title}</CardTitle>
        <CardDescription className="text-gray-700 font-medium leading-relaxed text-sm sm:text-base">
          {description}
        </CardDescription>
        {badgeText && (
          <Badge className={`w-fit mx-auto ${badgeColor.replace('from-', 'bg-').replace('to-', '')} text-white border border-white font-semibold mt-2 text-xs sm:text-sm`}>
            {badgeText}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <Button 
          variant={buttonVariant} 
          className="w-full font-bold shadow-lg py-2 sm:py-3 text-sm sm:text-lg transition-all duration-300"
          onClick={onButtonClick}
        >
          {buttonText} <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </CardContent>
    </Card>
  );
};

const StatsCard = ({ count, label, color, onClick, buttonText }) => {
  return (
    <Card className={`text-center p-3 sm:p-6 border-l-4 ${color} bg-opacity-20 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300`}>
      <div className={`text-2xl sm:text-3xl font-bold ${color.replace('border-l-', 'text-')}`}>{count}</div>
      <div className="text-xs sm:text-sm text-gray-700 font-semibold mb-2 sm:mb-3">{label}</div>
      <Button size="sm" variant="ghost" className={`${color.replace('border-l-', 'text-')} hover:bg-opacity-30 font-semibold text-xs sm:text-sm`} onClick={onClick}>
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
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
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
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl max-w-4xl w-full h-[80vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-xl font-bold text-gray-800">Narad AI - Your Spiritual Guide</h2>
                  <Button variant="ghost" onClick={() => setShowNaradAI(false)}>✕</Button>
                </div>
                <div className="flex-1 overflow-hidden">
                  <NaradAIChat />
                </div>
              </div>
            </div>
          )}

          {/* Contact Us Modal */}
          {showContactUs && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Contact Us</h2>
                  <Button variant="ghost" onClick={() => setShowContactUs(false)}>✕</Button>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-600">Get in touch with our spiritual support team</p>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Email:</strong> support@aapkasarthy.com</p>
                    <p className="text-sm"><strong>Phone:</strong> +91 9876543210</p>
                    <p className="text-sm"><strong>Address:</strong> Spiritual Center, New Delhi, India</p>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
              <FeatureCard 
                icon={MessageCircle}
                title="Narad AI Chat"
                description="Chat with AI for mood-based meditation and spiritual guidance"
                badgeText={todaysMood ? `Today: ${todaysMood}` : null}
                badgeColor="bg-gradient-to-br from-orange-400 to-red-500"
                buttonText="Chat with Narad AI"
                buttonVariant="default"
                onButtonClick={() => setShowNaradAI(true)}
              />
              <FeatureCard 
                icon={BookOpen}
                title="Spiritual Library"
                description="108+ Bhajans, chants, and spiritual content"
                badgeText="15 Languages"
                badgeColor="bg-gradient-to-br from-green-500 to-teal-600"
                buttonText="Explore Library"
                buttonVariant="outline"
                onButtonClick={() => navigate('/media-library')}
              />
              <FeatureCard 
                icon={Calendar}
                title="Book Rituals"
                description="Schedule poojas with verified priests"
                badgeText="42+ Temples"
                badgeColor="bg-gradient-to-br from-blue-500 to-indigo-600"
                buttonText="Book Now"
                buttonVariant="outline"
                onButtonClick={() => navigate('/ritual-booking')}
              />
              <FeatureCard 
                icon={Plane}
                title="Trip Planning"
                description="Plan sacred journeys to spiritual destinations"
                badgeText="12+ Destinations"
                badgeColor="bg-gradient-to-br from-purple-500 to-pink-600"
                buttonText="Plan Journey"
                buttonVariant="outline"
                onButtonClick={() => navigate('/trip-planning')}
              />
            </div>

            {currentUser.role === 'admin' && (
              <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-l-yellow-500 shadow-xl">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Star className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
                    Admin Dashboard
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <Button 
                      variant="secondary"
                      className="bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-red-600 hover:to-orange-700 shadow-lg font-bold py-2 sm:py-3"
                      onClick={() => navigate('/admin/media-upload')}
                    >
                      <Upload className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Upload Media
                    </Button>
                    <Button 
                      variant="secondary"
                      className="bg-gradient-to-r from-green-600 to-teal-600 text-white hover:from-teal-700 hover:to-green-700 shadow-lg font-bold py-2 sm:py-3"
                      onClick={() => navigate('/admin/ritual-management')}
                    >
                      <Settings className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Manage Rituals
                    </Button>
                    <Button 
                      variant="secondary"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-lg font-bold py-2 sm:py-3"
                      onClick={() => {
                        toast.success('Opening PDF book upload...');
                      }}
                    >
                      <FileText className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Add PDF Books
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <StatsCard 
                count={108} 
                label="Meditations" 
                color="border-l-orange-500" 
                onClick={() => navigate('/media-library')} 
                buttonText="Explore →" 
              />
              <StatsCard 
                count={42} 
                label="Bhajans" 
                color="border-l-green-600" 
                onClick={() => navigate('/media-library')} 
                buttonText="Listen →" 
              />
              <StatsCard 
                count={15} 
                label="Rituals" 
                color="border-l-blue-600" 
                onClick={() => navigate('/ritual-booking')} 
                buttonText="Book →" 
              />
              <StatsCard 
                count={streakCount} 
                label="Day Streak" 
                color="border-l-purple-600" 
                onClick={handleQuickMeditation} 
                buttonText="Continue →" 
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/80 via-yellow-400/60 to-red-500/80"></div>
            <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24 text-center">
              <div className="flex justify-center mb-8 sm:mb-12">
                <div className="transition-transform duration-500 hover:scale-110">
                  <img 
                    src="/lovable-uploads/e81fabc3-1be6-4500-afbd-503816b027c1.png" 
                    alt="AapkaSarthy Logo" 
                    className="w-40 h-40 sm:w-52 sm:h-52 lg:w-60 lg:h-60 object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg tracking-wide">AapkaSarthy</h1>
              <p className="text-lg sm:text-2xl md:text-3xl text-white/95 mb-8 sm:mb-10 max-w-4xl mx-auto font-semibold leading-relaxed drop-shadow-md">
                🇮🇳 Guide to Your Soul - Experience personalized spiritual guidance with AI-powered meditation, sacred music, and authentic ritual bookings
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-orange-600 hover:bg-orange-50 px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl shadow-2xl font-bold border-2 border-white/20 transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    toast.success('Welcome to your spiritual journey!');
                    navigate('/register');
                  }}
                >
                  <User className="mr-2 sm:mr-3 h-5 w-5 sm:h-7 sm:w-7" />
                  Begin Your Journey
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-3 border-white text-white bg-white/10 hover:bg-white hover:text-orange-600 px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  onClick={() => navigate('/login-user')}
                >
                  <Home className="mr-2 sm:mr-3 h-5 w-5 sm:h-7 sm:w-7" />
                  Sign In
                </Button>
              </div>
              <div className="mt-6 sm:mt-8">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/70 text-white bg-white/5 hover:bg-white hover:text-orange-600 px-6 sm:px-10 py-2 sm:py-3 text-base sm:text-lg font-bold shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  onClick={() => navigate('/login-admin')}
                >
                  <Star className="mr-2 h-4 w-4 sm:h-6 sm:w-6" />
                  Admin Login
                </Button>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 relative z-10">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Spiritual Features</h2>
              <p className="text-lg sm:text-xl text-gray-700 font-semibold">Discover your inner peace through technology and tradition 🕉️</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <FeatureCard 
                icon={Heart}
                title="AI Mood Meditation"
                description="Narad AI analyzes your mood and suggests personalized meditation practices for inner harmony"
                badgeText={null}
                badgeColor="bg-gradient-to-br from-orange-400 to-red-500"
                buttonText="Try Narad AI"
                buttonVariant="default"
                onButtonClick={() => navigate('/mood-selection')}
              />
              <FeatureCard 
                icon={BookOpen}
                title="Sacred Library"
                description="Access thousands of bhajans, mantras, and spiritual content in 15+ Indian languages"
                badgeText={null}
                badgeColor="bg-gradient-to-br from-green-500 to-teal-600"
                buttonText="Explore Library"
                buttonVariant="outline"
                onButtonClick={() => navigate('/media-library')}
              />
              <FeatureCard 
                icon={Calendar}
                title="Ritual Booking"
                description="Book authentic poojas and ceremonies with verified priests and temples across India"
                badgeText={null}
                badgeColor="bg-gradient-to-br from-blue-600 to-indigo-700"
                buttonText="Book Pooja"
                buttonVariant="outline"
                onButtonClick={() => navigate('/ritual-booking')}
              />
              <FeatureCard 
                icon={ShoppingCart}
                title="Devotional Shop"
                description="Spiritual items, books, malas, and authentic devotional products for your spiritual journey"
                badgeText={null}
                badgeColor="bg-gradient-to-br from-purple-600 to-pink-700"
                buttonText="Shop Now"
                buttonVariant="outline"
                onButtonClick={handleDevotionalShop}
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-600 via-yellow-400 to-green-600 text-white py-12 sm:py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-700/80 via-yellow-300/60 to-green-700/80"></div>
            <div className="relative max-w-4xl mx-auto text-center px-4">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white drop-shadow-lg">Ready to Transform Your Spiritual Journey?</h2>
              <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-orange-100 font-semibold drop-shadow-md">Join thousands of souls finding peace through AapkaSarthy 🙏</p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg font-bold border border-orange-300 px-6 sm:px-10 py-3 sm:py-4 transition-all duration-300"
                  onClick={() => {
                    toast.success('Welcome to the spiritual community!');
                    navigate('/register');
                  }}
                >
                  <Users className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                  Join as User
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold shadow-lg px-6 sm:px-10 py-3 sm:py-4 transition-all duration-300"
                  onClick={() => navigate('/login-admin')}
                >
                  <Star className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
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
