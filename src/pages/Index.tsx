import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, Users, BookOpen, Calendar, Star, ArrowRight, Bell, User, LogOut, Home, Sparkles, Plane, ShoppingCart, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import NaradAIChat from '@/components/NaradAIChat';

const Header = ({ currentUser, streakCount, onLogout, onQuickMeditation, onShowNaradAI, onScrollToContact }) => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/b272acdb-7757-4417-b550-561c69ec192a.png" 
            alt="AapkaSarthy" 
            className="h-12 w-auto"
          />
        </div>
        
        {currentUser ? (
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onShowNaradAI}
              className="text-gray-700 hover:bg-blue-50"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Narad AI
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onScrollToContact}
              className="text-gray-700 hover:bg-blue-50"
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
              className="text-gray-700 border-gray-300"
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
              className="text-gray-700 hover:bg-blue-50"
            >
              Contact Us
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
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Register
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

const HeroSection = ({ currentUser, onQuickMeditation, onDailyChallenge, onDevotionalShop }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Find Your Inner Peace
        </h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Experience personalized spiritual guidance with AI-powered meditation, sacred music, and authentic ritual bookings across India
        </p>
        {currentUser && (
          <div className="flex justify-center space-x-4">
            <Button 
              size="lg" 
              onClick={onQuickMeditation}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Quick Meditation (5 min)
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onDailyChallenge}
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Daily Challenge
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const DailyWisdomCard = ({ dailyQuote, dailyGoodDeed, onQuickMeditation, onDailyChallenge, onDevotionalShop }) => {
  return (
    <Card className="mb-8 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-bold text-orange-700 text-xl">Daily Wisdom</h3>
        </div>
        <blockquote className="text-gray-700 italic mb-4 p-4 bg-white rounded-lg border-l-4 border-orange-400">
          "{dailyQuote}"
        </blockquote>
        {dailyGoodDeed && (
          <div className="mb-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
            <h4 className="font-bold text-green-700 mb-2 flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Good Deed of the Day
            </h4>
            <p className="text-green-600">{dailyGoodDeed}</p>
          </div>
        )}
        <div className="flex space-x-3">
          <Button 
            size="sm" 
            onClick={onQuickMeditation}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Quick Meditation
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onDailyChallenge}
            className="border-green-500 text-green-600 hover:bg-green-50"
          >
            Daily Challenge
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onDevotionalShop}
            className="border-purple-500 text-purple-600 hover:bg-purple-50"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Shop
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const FeatureCard = ({ icon: Icon, title, description, badgeText, onButtonClick }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
      <CardHeader className="text-center">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
          <Icon className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
        {badgeText && (
          <Badge className="w-fit mx-auto bg-blue-100 text-blue-800 mt-2">
            {badgeText}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={onButtonClick}
        >
          Explore <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

const StatsCard = ({ count, label, onClick, buttonText }) => {
  return (
    <Card className="text-center hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="text-3xl font-bold text-blue-600 mb-2">{count}</div>
        <div className="text-sm text-gray-600 mb-3">{label}</div>
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-blue-600 hover:bg-blue-50"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

const ContactSection = () => {
  return (
    <div id="contact" className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600">Get in touch with our spiritual support team</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
            <p className="text-gray-600">+91 9876543210</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
            <p className="text-gray-600">support@aapkasarthy.com</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Address</h3>
            <p className="text-gray-600">Spiritual Center, New Delhi, India</p>
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
        onQuickMeditation={handleQuickMeditation} 
        onShowNaradAI={() => setShowNaradAI(true)} 
        onScrollToContact={scrollToContact} 
      />

      {/* Narad AI Chat Modal with Scrollable Content */}
      {showNaradAI && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full h-[80vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">Narad AI - Your Spiritual Guide</h2>
              <Button variant="ghost" onClick={() => setShowNaradAI(false)}>✕</Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4">
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
        onDevotionalShop={handleDevotionalShop}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
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
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Explore Our Spiritual Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={MessageCircle}
              title="Narad AI Chat"
              description="Chat with AI for mood-based meditation and spiritual guidance"
              badgeText={todaysMood ? `Today: ${todaysMood}` : null}
              onButtonClick={() => setShowNaradAI(true)}
            />
            <FeatureCard 
              icon={BookOpen}
              title="Spiritual Library"
              description="108+ Bhajans, chants, and spiritual content"
              badgeText="15 Languages"
              onButtonClick={() => navigate('/media-library')}
            />
            <FeatureCard 
              icon={Calendar}
              title="Book Rituals"
              description="Schedule poojas with verified priests"
              badgeText="42+ Temples"
              onButtonClick={() => navigate('/ritual-booking')}
            />
            <FeatureCard 
              icon={Plane}
              title="Trip Planning"
              description="Plan sacred journeys to spiritual destinations"
              badgeText="12+ Destinations"
              onButtonClick={() => navigate('/trip-planning')}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard 
            count={108} 
            label="Meditations" 
            onClick={() => navigate('/media-library')} 
            buttonText="Explore →" 
          />
          <StatsCard 
            count={42} 
            label="Bhajans" 
            onClick={() => navigate('/media-library')} 
            buttonText="Listen →" 
          />
          <StatsCard 
            count={15} 
            label="Rituals" 
            onClick={() => navigate('/ritual-booking')} 
            buttonText="Book →" 
          />
          <StatsCard 
            count={streakCount} 
            label="Day Streak" 
            onClick={handleQuickMeditation} 
            buttonText="Continue →" 
          />
        </div>
      </div>

      <ContactSection />
    </div>
  );
};

export default Index;
