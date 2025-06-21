
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const LoginUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Enhanced mock authentication with validation
      if (!formData.email || !formData.password) {
        toast.error('Please fill in all fields');
        return;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (formData.email === 'user@example.com' && formData.password === 'password') {
        const mockUser = {
          id: 1,
          name: 'Spiritual Seeker',
          email: formData.email,
          role: 'user',
          joinDate: new Date().toISOString(),
          streak: 7,
          points: 1250
        };
        
        localStorage.setItem('token', 'mock-jwt-token-user');
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        toast.success('🙏 Welcome back to your spiritual journey!');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        toast.error('Invalid credentials. Try user@example.com / password');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleGuestLogin = () => {
    setFormData({
      email: 'user@example.com',
      password: 'password'
    });
    toast.info('Demo credentials filled! Click Sign In to continue.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-4 text-gray-600 hover:text-gray-800 hover:bg-orange-50"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-2xl border-0 overflow-hidden">
          {/* Tricolour header */}
          <div className="h-2 bg-tricolour"></div>
          
          <CardHeader className="text-center pb-4 bg-gradient-to-b from-orange-50 to-white">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">User Login</CardTitle>
            <CardDescription className="text-gray-600">
              Continue your spiritual journey with AapkaSarthy 🇮🇳
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full pr-10 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
            
            <div className="mt-6 space-y-4">
              <Button 
                variant="outline" 
                className="w-full border-green-500 text-green-600 hover:bg-green-50"
                onClick={handleGuestLogin}
                disabled={loading}
              >
                Try Demo Login
              </Button>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-orange-600 hover:text-orange-700 font-medium underline">
                    Register here
                  </Link>
                </p>
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                  <p className="text-xs text-orange-800 font-medium">
                    🎯 Demo Credentials:
                  </p>
                  <p className="text-xs text-orange-700">
                    user@example.com / password
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginUser;
