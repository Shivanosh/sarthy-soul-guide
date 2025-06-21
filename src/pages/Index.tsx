
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, BookOpen, Calendar, Star, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  if (currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 shadow-lg">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-orange-200" />
              <h1 className="text-2xl font-bold">AapkaSarthy</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-orange-100">Welcome, {currentUser.name}</span>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Dashboard */}
        <main className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Mood Selection Card */}
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-800">
                  <Heart className="h-5 w-5" />
                  <span>Mood Meditation</span>
                </CardTitle>
                <CardDescription>AI-powered meditation based on your current mood</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  onClick={() => navigate('/mood-selection')}
                >
                  Start Meditation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Media Library Card */}
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-800">
                  <BookOpen className="h-5 w-5" />
                  <span>Spiritual Library</span>
                </CardTitle>
                <CardDescription>Bhajans, chants, and spiritual content</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                  onClick={() => navigate('/media-library')}
                >
                  Explore Library <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Ritual Booking Card */}
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-800">
                  <Calendar className="h-5 w-5" />
                  <span>Book Rituals</span>
                </CardTitle>
                <CardDescription>Schedule poojas and spiritual ceremonies</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full border-purple-500 text-purple-600 hover:bg-purple-50"
                  onClick={() => navigate('/ritual-booking')}
                >
                  Book Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Admin Features */}
          {currentUser.role === 'admin' && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border-l-4 border-l-yellow-500 mb-8">
              <h2 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center">
                <Star className="mr-2 h-5 w-5" />
                Admin Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="border-yellow-500 text-yellow-700 hover:bg-yellow-50"
                  onClick={() => navigate('/admin/media-upload')}
                >
                  Upload Media
                </Button>
                <Button 
                  variant="outline" 
                  className="border-yellow-500 text-yellow-700 hover:bg-yellow-50"
                  onClick={() => navigate('/admin/ritual-management')}
                >
                  Manage Rituals
                </Button>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-orange-600">108</div>
              <div className="text-sm text-gray-600">Meditations</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-blue-600">42</div>
              <div className="text-sm text-gray-600">Bhajans</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-purple-600">15</div>
              <div className="text-sm text-gray-600">Rituals</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-green-600">7</div>
              <div className="text-sm text-gray-600">Days Streak</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-blue-600 opacity-90"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
          <div className="flex justify-center mb-6">
            <Heart className="h-16 w-16 text-white animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            AapkaSarthy
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Guide to Your Soul - Experience personalized spiritual guidance with AI-powered meditation, sacred music, and ritual bookings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg"
              onClick={() => navigate('/register')}
            >
              Begin Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 text-lg"
              onClick={() => navigate('/login-user')}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Spiritual Features</h2>
          <p className="text-lg text-gray-600">Discover your inner peace through technology and tradition</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-orange-800">AI Mood Meditation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-600">
                Narad AI analyzes your mood and suggests personalized meditation practices for inner harmony
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-blue-800">Sacred Library</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-600">
                Access thousands of bhajans, mantras, and spiritual content in multiple languages
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-purple-800">Ritual Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-600">
                Book authentic poojas and ceremonies with verified priests and temples
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-blue-500 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Spiritual Journey?</h2>
          <p className="text-xl mb-8 text-orange-100">Join thousands of souls finding peace through AapkaSarthy</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-orange-50"
              onClick={() => navigate('/register')}
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
