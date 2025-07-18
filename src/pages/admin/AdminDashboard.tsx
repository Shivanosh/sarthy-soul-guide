
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Users, Upload, Calendar, Shield, Key } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const adminFeatures = [
    {
      title: 'Booking Requests',
      description: 'View, approve or deny ritual booking requests',
      icon: Calendar,
      path: '/admin/ritual-management',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'API Settings',
      description: 'Configure OpenAI, Gemini & YouTube API keys',
      icon: Key,
      path: '/admin/settings',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'User Management',
      description: 'Manage registered users and their data',
      icon: Users,
      path: '/admin/user-management',
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Upload Books & Media',
      description: 'Upload spiritual books and meditation content',
      icon: Upload,
      path: '/admin/media-upload',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-yellow-500 to-green-600 text-white p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-white/10 to-green-600/90"></div>
        <div className="relative max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <Button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              navigate('/login-admin');
            }}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome, Administrator</h2>
          <p className="text-gray-600">Manage your spiritual platform and configure settings</p>
        </div>

        {/* Quick Settings Access */}
        <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <Settings className="mr-2 h-6 w-6" />
              Quick Settings Access
            </CardTitle>
            <CardDescription className="text-blue-600">
              Configure your API keys to enable NaradAI and YouTube integration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/admin/settings')}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              size="lg"
            >
              <Key className="mr-2 h-5 w-5" />
              Configure API Keys
            </Button>
          </CardContent>
        </Card>

        {/* Admin Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate(feature.path)}
                  variant="outline"
                  className="w-full hover:bg-gradient-to-r hover:from-orange-50 hover:to-green-50"
                >
                  Access {feature.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
