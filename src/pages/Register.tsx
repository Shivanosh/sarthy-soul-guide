import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Register = React.memo(() => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateInput = useCallback((data: typeof formData) => {
    const { name, email, password, confirmPassword } = data;
    
    if (!name.trim() || name.trim().length < 2) {
      toast.error('Name must be at least 2 characters long');
      return false;
    }
    
    if (name.trim().length > 50) {
      toast.error('Name must be less than 50 characters');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (existingUsers.some((user: any) => user.email === email.trim().toLowerCase())) {
      toast.error('Email address is already registered');
      return false;
    }
    
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }
    
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      toast.error('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      return false;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    
    return true;
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitizedData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };
    
    if (!validateInput(sanitizedData)) {
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));

      const mockUser = {
        id: Math.floor(Math.random() * 10000) + 1000,
        name: sanitizedData.name,
        email: sanitizedData.email,
        password: sanitizedData.password, // In production, this would be hashed
        role: 'user',
        joinDate: new Date().toISOString(),
        streak: 0,
        points: 0
      };
      
      // Store user in registered users list
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      existingUsers.push(mockUser);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      
      // Auto-login after registration
      const tokenData = {
        token: `user-token-${mockUser.id}`,
        role: 'user',
        expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      
      localStorage.setItem('authToken', JSON.stringify(tokenData));
      localStorage.setItem('user', JSON.stringify({
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
        joinDate: mockUser.joinDate,
        streak: mockUser.streak,
        points: mockUser.points
      }));
      
      // Initialize user stats
      localStorage.setItem('meditationStats', JSON.stringify({
        totalSessions: 0,
        totalMinutes: 0,
        experiencePoints: 0,
        completedThisWeek: 0
      }));
      
      localStorage.setItem('ritualBookings', JSON.stringify([]));
      localStorage.setItem('travelBookings', JSON.stringify([]));
      localStorage.setItem('musicStats', JSON.stringify({
        totalPlayed: 0,
        favoriteGenre: '',
        recentlyPlayed: []
      }));
      
      toast.success('🎉 Welcome to AapkaSarthy! Registration successful.');
      
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  }, [formData, validateInput, navigate]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const navigateHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const passwordStrength = useMemo(() => {
    const { password } = formData;
    if (!password) {
      return { level: '', color: '' };
    }
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-blue-500', 'text-green-500'];
    
    return { 
      level: levels[strength - 1] || 'Very Weak', 
      color: colors[strength - 1] || 'text-red-500' 
    };
  }, [formData.password]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          className="mb-4 text-gray-600 hover:text-gray-800 text-sm sm:text-base"
          onClick={navigateHome}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4 px-4 sm:px-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Join AapkaSarthy</CardTitle>
            <CardDescription className="text-gray-600 text-base sm:text-lg">
              Begin your personalized spiritual journey
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-4 pb-6 sm:px-8 sm:pb-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-semibold text-sm sm:text-base">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your spiritual name"
                  required
                  autoComplete="name"
                  maxLength={50}
                  className="w-full h-10 sm:h-12 text-sm sm:text-lg border-2 border-gray-200 focus:border-blue-400 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-semibold text-sm sm:text-base">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  className="w-full h-10 sm:h-12 text-sm sm:text-lg border-2 border-gray-200 focus:border-blue-400 rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-semibold text-sm sm:text-base">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    required
                    autoComplete="new-password"
                    className="w-full h-10 sm:h-12 text-sm sm:text-lg border-2 border-gray-200 focus:border-blue-400 rounded-lg pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                    )}
                  </Button>
                </div>
                {formData.password && passwordStrength.level && (
                  <p className={`text-xs ${passwordStrength.color}`}>
                    Password strength: {passwordStrength.level}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-semibold text-sm sm:text-base">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  autoComplete="new-password"
                  className="w-full h-10 sm:h-12 text-sm sm:text-lg border-2 border-gray-200 focus:border-blue-400 rounded-lg"
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-500">Passwords do not match</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 h-10 sm:h-12 text-sm sm:text-lg font-semibold shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Start Your Journey'
                )}
              </Button>
            </form>
            
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-gray-600 text-sm sm:text-lg">
                Already have an account?{' '}
                <Link to="/login-user" className="text-blue-600 hover:text-blue-700 font-semibold underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

Register.displayName = 'Register';

export default Register;
