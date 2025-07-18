import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, BookOpen, Calendar, Star, ArrowRight, Bell, User, LogOut, Home, Sparkles, Plane, ShoppingCart, MessageCircle, Phone, Mail, MapPin, Shield, Menu, X } from 'lucide-react';
import { toast } from 'sonner';
import NaradAIChat from '@/components/NaradAIChat';
import { useIsMobile } from '@/hooks/use-mobile';

// TypeScript interfaces for component props
interface HeaderProps {
  currentUser: any;
  streakCount: number;
  onLogout: () => void;
  onShowNaradAI: () => void;
  onScrollToContact: () => void;
}

interface HeroSectionProps {
  currentUser: any;
  onQuickMeditation: () => void;
  onDailyChallenge: () => void;
}

interface DailyWisdomCardProps {
  dailyQuote: string;
  dailyGoodDeed: string;
  onQuickMeditation: () => void;
  onDailyChallenge: () => void;
  onDevotionalShop: () => void;
}

interface FeatureCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  badgeText?: string;
  buttonText?: string;
  path?: string;
  navigate: (path: string) => void;
  currentUser: any;
  onNaradAIClick?: () => void;
}

interface StatsCardProps {
  count: number | string;
  label: string;
  buttonText: string;
  currentUser: any;
}

const Header = React.memo<HeaderProps>(({ currentUser, streakCount, onLogout, onShowNaradAI, onScrollToContact }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-xl border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/b272acdb-7757-4417-b550-561c69ec192a.png" 
              alt="AapkaSarthy" 
              className="h-10 sm:h-12 md:h-16 w-auto hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {currentUser ? (
            <>
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onShowNaradAI}
                  className="text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-all duration-300 hover:scale-105 btn-premium rounded-full px-4"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Narad AI
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onScrollToContact}
                  className="text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-all duration-300 hover:scale-105 btn-secondary-premium rounded-full px-4"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                <div className="text-right hidden lg:block">
                  <span className="text-gray-700 font-medium text-sm">Namaste, {currentUser.name}</span>
                  <div className="text-xs text-gray-500">🔥 {streakCount} day streak</div>
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

              {/* Mobile Menu */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-700"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>

              {/* Mobile Menu Dropdown */}
              {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t md:hidden z-50">
                  <div className="px-4 py-3 space-y-3">
                    <div className="text-center pb-2 border-b">
                      <span className="text-gray-700 font-medium text-sm">Namaste, {currentUser.name}</span>
                      <div className="text-xs text-gray-500">🔥 {streakCount} day streak</div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => { onShowNaradAI(); setMobileMenuOpen(false); }}
                      className="w-full justify-start text-gray-700 hover:bg-orange-50 hover:text-orange-700"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Narad AI
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => { onScrollToContact(); setMobileMenuOpen(false); }}
                      className="w-full justify-start text-gray-700 hover:bg-orange-50 hover:text-orange-700"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                      className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Desktop Guest Menu */}
              <div className="hidden sm:flex items-center space-x-2 lg:space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={onScrollToContact}
                  size="sm"
                  className="text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/login-admin')}
                  size="sm"
                  className="text-orange-600 border-orange-600 hover:bg-orange-50"
                >
                  <Shield className="h-4 w-4 mr-1 lg:mr-2" />
                  <span className="hidden lg:inline">Admin</span>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/login-user')}
                  size="sm"
                  className="text-orange-600 border-orange-600 hover:bg-orange-50"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Register
                </Button>
              </div>

              {/* Mobile Guest Menu */}
              <div className="sm:hidden flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/login-user')}
                  size="sm"
                  className="text-orange-600 border-orange-600 hover:bg-orange-50 text-xs px-2"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs px-3"
                >
                  Register
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
});

const HeroSection = React.memo<HeroSectionProps>(({ currentUser, onQuickMeditation, onDailyChallenge }) => {
  return (
    <div className="bg-gradient-to-br from-orange-500 via-yellow-500 to-green-500 text-white py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-green-600/20"></div>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-white via-orange-100 to-green-100 bg-clip-text text-transparent leading-tight">
            Find Your Inner Peace
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 lg:mb-12 text-orange-100 leading-relaxed max-w-3xl mx-auto px-2">
            Experience personalized spiritual guidance with AI-powered meditation, sacred music, and authentic ritual bookings across India 🇮🇳
          </p>
          {currentUser && (
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2">
              <Button 
                size="lg" 
                onClick={onQuickMeditation}
                className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4"
              >
                <Sparkles className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                Quick Meditation (5 min)
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={onDailyChallenge}
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4"
              >
                <Heart className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                Daily Challenge
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

const DailyWisdomCard = React.memo<DailyWisdomCardProps>(({ dailyQuote, dailyGoodDeed, onQuickMeditation, onDailyChallenge, onDevotionalShop }) => {
  return (
    <Card className="mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
          <div className="w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 rounded-full bg-gradient-to-r from-orange-500 to-green-500 flex items-center justify-center shadow-lg flex-shrink-0">
            <Sparkles className="h-5 sm:h-6 lg:h-8 w-5 sm:w-6 lg:w-8 text-white" />
          </div>
          <h3 className="font-bold text-orange-700 text-lg sm:text-xl lg:text-2xl">Daily Wisdom</h3>
        </div>
        <blockquote className="text-gray-700 italic mb-4 sm:mb-6 p-3 sm:p-4 lg:p-6 bg-white rounded-xl border-l-4 border-orange-400 shadow-sm text-sm sm:text-base lg:text-lg leading-relaxed">
          "{dailyQuote}"
        </blockquote>
        {dailyGoodDeed && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 lg:p-6 bg-green-50 rounded-xl border-l-4 border-green-400 shadow-sm">
            <h4 className="font-bold text-green-700 mb-2 sm:mb-3 flex items-center text-sm sm:text-base lg:text-lg">
              <Heart className="h-4 sm:h-5 w-4 sm:w-5 mr-2 flex-shrink-0" />
              Good Deed of the Day
            </h4>
            <p className="text-green-600 text-sm sm:text-base">{dailyGoodDeed}</p>
          </div>
        )}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Button 
            size="sm" 
            onClick={onQuickMeditation}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm flex-shrink-0"
          >
            <Sparkles className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
            Quick Meditation
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onDailyChallenge}
            className="border-green-500 text-green-600 hover:bg-green-50 shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm flex-shrink-0"
          >
            <Heart className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
            Daily Challenge
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onDevotionalShop}
            className="border-purple-500 text-purple-600 hover:bg-purple-50 shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm flex-shrink-0"
          >
            <ShoppingCart className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
            Shop
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

const FeatureCard = React.memo<FeatureCardProps>(({ icon: Icon, title, description, badgeText, buttonText = "Explore", path, navigate, currentUser, onNaradAIClick }) => {
  const handleFeatureClick = useCallback(() => {
    if (!currentUser) {
      toast.error('Please sign in to access this feature');
      return;
    }
    
    // Special handling for Narad AI Chat
    if (title === "Narad AI Chat" && onNaradAIClick) {
      onNaradAIClick();
      return;
    }
    
    if (path) {
      navigate(path);
    } else {
      toast.success(`Opening ${title}...`);
    }
  }, [currentUser, title, path, navigate, onNaradAIClick]);

  return (
    <Card className="feature-card hover:shadow-xl transition-all duration-300 h-full group border-0 shadow-lg bg-gradient-to-br from-white to-orange-50/30">
      <CardHeader className="text-center pb-3 sm:pb-4 p-3 sm:p-4 lg:p-6">
        <div className="w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 rounded-2xl bg-gradient-to-r from-orange-500 to-green-500 flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 pulse-glow">
          <Icon className="h-6 sm:h-8 lg:h-10 w-6 sm:w-8 lg:w-10 text-white" />
        </div>
        <CardTitle className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 leading-tight">{title}</CardTitle>
        <CardDescription className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">{description}</CardDescription>
        {badgeText && (
          <Badge className="w-fit mx-auto bg-orange-100 text-orange-800 mt-2 sm:mt-3 px-2 sm:px-3 py-1 text-xs">
            {badgeText}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="pt-0 p-3 sm:p-4 lg:p-6">
        <Button 
          className="w-full btn-premium hover:shadow-xl transition-all duration-300 py-2 sm:py-3 text-xs sm:text-sm lg:text-base font-semibold hover-lift"
          onClick={handleFeatureClick}
        >
          {buttonText} <ArrowRight className="ml-1 sm:ml-2 h-3 sm:h-4 w-3 sm:w-4" />
        </Button>
        {!currentUser && (
          <p className="text-xs text-gray-500 text-center mt-2">Sign in to access</p>
        )}
      </CardContent>
    </Card>
  );
});

const StatsCard = React.memo<StatsCardProps>(({ count, label, buttonText, currentUser }) => {
  const handleStatsClick = useCallback(() => {
    if (!currentUser) {
      toast.error('Please sign in to view your stats');
      return;
    }
    toast.success(`Opening ${label}...`);
  }, [currentUser, label]);

  return (
    <Card className="stats-card text-center transition-all duration-300 group border-0 shadow-lg bg-gradient-to-br from-white to-orange-50/30 hover-lift">
      <CardContent className="p-3 sm:p-4 lg:p-8">
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text mb-1 sm:mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-300">{count}</div>
        <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 lg:mb-4 font-medium">{label}</div>
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-orange-600 hover:bg-orange-50 transition-all duration-300 text-xs sm:text-sm"
          onClick={handleStatsClick}
        >
          {buttonText}
        </Button>
        {!currentUser && (
          <p className="text-xs text-gray-500 mt-1">Sign in required</p>
        )}
      </CardContent>
    </Card>
  );
});

const ContactSection = React.memo(() => {
  return (
    <div id="contact" className="bg-gradient-to-br from-orange-50 to-green-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">Contact Us</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">Get in touch with our spiritual support team</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="text-center p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Phone className="h-5 sm:h-6 lg:h-8 w-5 sm:w-6 lg:w-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg">Phone</h3>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">+91 9876543210</p>
          </div>
          
          <div className="text-center p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 bg-gradient-to-r from-green-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Mail className="h-5 sm:h-6 lg:h-8 w-5 sm:w-6 lg:w-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg">Email</h3>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">support@aapkasarthy.com</p>
          </div>
          
          <div className="text-center p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group sm:col-span-2 lg:col-span-1">
            <div className="w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <MapPin className="h-5 sm:h-6 lg:h-8 w-5 sm:w-6 lg:w-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg">Address</h3>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Spiritual Center, New Delhi, India</p>
          </div>
        </div>
      </div>
    </div>
  );
});

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentUser, setCurrentUser] = useState(null);
  const [streakCount, setStreakCount] = useState(0);
  const [todaysMood, setTodaysMood] = useState('');
  const [showNaradAI, setShowNaradAI] = useState(false);
  const [liveStats, setLiveStats] = useState({
    meditations: 0,
    bhajans: 0,
    rituals: 0,
    travelBookings: 0
  });

  // Memoized daily content - only calculate once per day
  const { dailyQuote, dailyGoodDeed } = useMemo(() => {
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

    const today = new Date();
    const dailyIndex = today.getDate() % quotes.length;
    return {
      dailyQuote: quotes[dailyIndex],
      dailyGoodDeed: goodDeeds[dailyIndex]
    };
  }, []);

  // Auth state check - optimized to run only once
  useEffect(() => {
    // Check both token and authToken for compatibility
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    
    console.log('Auth check:', { token, user }); // Debug log
    
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        const parsedToken = JSON.parse(token);
        
        // Check if token is expired
        if (parsedToken.expires && Date.now() > parsedToken.expires) {
          console.log('Token expired, clearing auth');
          localStorage.removeItem('token');
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          return;
        }
        
        console.log('Setting current user:', parsedUser); // Debug log
        setCurrentUser(parsedUser);
        
        const currentStreak = parseInt(localStorage.getItem('streakCount') || '1');
        setStreakCount(currentStreak);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
    
    const mood = localStorage.getItem('todaysMood');
    if (mood) setTodaysMood(mood);

    // Load live statistics
    const meditationStats = JSON.parse(localStorage.getItem('meditationStats') || '{}');
    const ritualBookings = JSON.parse(localStorage.getItem('ritualBookings') || '[]');
    const travelBookings = JSON.parse(localStorage.getItem('travelBookings') || '[]');
    const musicStats = JSON.parse(localStorage.getItem('musicStats') || '{}');

    setLiveStats({
      meditations: meditationStats.totalSessions || 108,
      bhajans: musicStats.totalPlayed || 42,
      rituals: ritualBookings.length || 15,
      travelBookings: travelBookings.length || 7
    });
  }, []);

  // Memoized handlers to prevent unnecessary re-renders
  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('todaysMood');
    setCurrentUser(null);
    toast.success('Logged out successfully');
  }, []);

  const handleQuickMeditation = useCallback(() => {
    if (!currentUser) {
      toast.error('Please sign in to access meditation features');
      return;
    }

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
    
    // Update live stats
    setLiveStats(prev => ({
      ...prev,
      meditations: updatedStats.totalSessions
    }));
    
    toast.success('Starting 5-minute guided meditation...');
    setTimeout(() => {
      toast.success('Meditation completed! +50 spiritual points earned');
    }, 3000);
  }, [currentUser]);

  const handleDailyChallenge = useCallback(() => {
    if (!currentUser) {
      toast.error('Please sign in to access daily challenges');
      return;
    }

    const challenges = [
      'Recite Gayatri Mantra 21 times',
      'Practice gratitude for 5 minutes',
      'Listen to 3 bhajans mindfully',
      'Meditate for 10 minutes',
      'Help someone in need today'
    ];
    const todaysChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    toast.success(`Today's Challenge: ${todaysChallenge}`);
  }, [currentUser]);

  const handleDevotionalShop = useCallback(() => {
    if (!currentUser) {
      toast.error('Please sign in to access the devotional shop');
      return;
    }
    toast.success('Opening Devotional Item Shop... (Amazon API integration coming soon!)');
  }, [currentUser]);

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleShowNaradAI = useCallback(() => {
    setShowNaradAI(true);
  }, []);

  const handleCloseNaradAI = useCallback(() => {
    setShowNaradAI(false);
  }, []);

  // Memoized feature cards data to prevent recreation on every render
  const featureCardsData = useMemo(() => [
    {
      icon: MessageCircle,
      title: "Narad AI Chat",
      description: "Chat with AI for mood-based meditation and spiritual guidance",
      badgeText: todaysMood ? `Today: ${todaysMood}` : "AI Powered",
      buttonText: "Start Chat",
      onNaradAIClick: handleShowNaradAI
    },
    {
      icon: BookOpen,
      title: "Spiritual Library",
      description: "108+ Bhajans, chants, and spiritual content",
      badgeText: "15 Languages",
      buttonText: "Browse Library",
      path: "/media-library"
    },
    {
      icon: Calendar,
      title: "Book Rituals",
      description: "Schedule poojas with verified priests",
      badgeText: "42+ Temples",
      buttonText: "Book Now",
      path: "/ritual-booking"
    },
    {
      icon: Plane,
      title: "Trip Planning",
      description: "Plan sacred journeys to spiritual destinations",
      badgeText: "12+ Destinations",
      buttonText: "Plan Trip",
      path: "/trip-planning"
    }
  ], [todaysMood, handleShowNaradAI]);

  const statsCardsData = useMemo(() => [
    { count: liveStats.meditations, label: "Meditations", buttonText: "Explore →" },
    { count: liveStats.bhajans, label: "Bhajans", buttonText: "Listen →" },
    { count: liveStats.rituals, label: "Rituals", buttonText: "Book →" },
    { count: liveStats.travelBookings, label: "Travel Bookings", buttonText: "Plan →" }
  ], [liveStats]);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentUser={currentUser} 
        streakCount={streakCount} 
        onLogout={handleLogout} 
        onShowNaradAI={handleShowNaradAI} 
        onScrollToContact={scrollToContact} 
      />

      {/* Optimized Narad AI Chat Modal - only render when needed */}
      {showNaradAI && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className={`bg-white rounded-2xl w-full h-full sm:h-[90vh] lg:h-[85vh] flex flex-col shadow-2xl border-0 ${isMobile ? 'max-w-full' : 'max-w-4xl'}`}>
            <div className={`flex justify-between items-center border-b bg-gradient-to-r from-orange-50 to-green-50 rounded-t-2xl flex-shrink-0 ${isMobile ? 'p-3' : 'p-4 lg:p-6'}`}>
              <h2 className={`font-bold text-gray-800 ${isMobile ? 'text-base' : 'text-lg lg:text-2xl'}`}>
                {isMobile ? 'Narad AI' : 'Narad AI - Your Spiritual Guide'}
              </h2>
              <Button 
                variant="ghost" 
                onClick={handleCloseNaradAI}
                className="text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-full p-2"
                size={isMobile ? "sm" : "default"}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className={`h-full bg-gradient-to-br from-orange-50/30 to-green-50/30 ${isMobile ? 'p-2' : 'p-4 lg:p-6'}`}>
                <NaradAIChat />
              </div>
            </div>
          </div>
        </div>
      )}

      <HeroSection 
        currentUser={currentUser}
        onQuickMeditation={handleQuickMeditation}
        onDailyChallenge={handleDailyChallenge}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16">
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
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">
              Explore Our Spiritual Services
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Discover a comprehensive suite of spiritual tools and services designed to enhance your journey
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {featureCardsData.map((card, index) => (
              <FeatureCard 
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                badgeText={card.badgeText}
                buttonText={card.buttonText}
                path={card.path}
                navigate={navigate}
                currentUser={currentUser}
                onNaradAIClick={card.onNaradAIClick}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">Our Impact</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">Join thousands on their spiritual journey</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
            {statsCardsData.map((stat, index) => (
              <StatsCard 
                key={index}
                count={stat.count} 
                label={stat.label} 
                buttonText={stat.buttonText} 
                currentUser={currentUser}
              />
            ))}
          </div>
        </div>
      </div>

      <ContactSection />
    </div>
  );
};

export default Index;
