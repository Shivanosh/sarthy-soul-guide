
import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Eye, EyeOff, ArrowLeft, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';

const LoginUser = React.memo(() => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  // Input validation with enhanced security
  const validateInput = useCallback((email: string, password: string) => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return false;
    }
    
    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    // Basic password security check
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    
    return true;
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInput(formData.email.trim(), formData.password)) {
      return;
    }
    
    setLoading(true);

    try {
      // Simulate API call with proper error handling
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check against stored user credentials
      const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const sanitizedEmail = formData.email.trim().toLowerCase();
      
      const foundUser = storedUsers.find((user: any) => 
        user.email === sanitizedEmail && user.password === formData.password
      );

      if (foundUser) {
        const mockUser = {
          id: foundUser.id || Math.floor(Math.random() * 10000),
          name: foundUser.name,
          email: sanitizedEmail,
          role: 'user',
          joinDate: foundUser.joinDate || new Date().toISOString(),
          streak: foundUser.streak || 1,
          points: foundUser.points || 100
        };
        
        // Secure token storage with expiry
        const tokenData = {
          token: 'mock-jwt-token-user',
          expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        };
        
        localStorage.setItem('authToken', JSON.stringify(tokenData));
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        toast.success('🙏 Welcome back to your spiritual journey!');
        
        // Clear sensitive form data
        setFormData({ email: '', password: '' });
        
        setTimeout(() => {
          navigate('/');
        }, 500);
      } else {
        // Generic error message for security
        toast.error('Invalid credentials. Please check your email and password.');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  }, [formData, validateInput, navigate]);

  const handleForgotPassword = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      toast.error('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setResetLoading(true);

    try {
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate and store OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem('passwordResetOTP', JSON.stringify({
        email: resetEmail.toLowerCase(),
        otp: otp,
        expires: Date.now() + (10 * 60 * 1000) // 10 minutes
      }));

      toast.success(`Password reset OTP sent to ${resetEmail}. OTP: ${otp} (Demo: This would be sent via email)`);
      setShowForgotPassword(false);
      setResetEmail('');
    } catch (error) {
      toast.error('Failed to send reset email. Please try again.');
    } finally {
      setResetLoading(false);
    }
  }, [resetEmail]);

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

  // Memoized styles for better performance
  const cardStyles = useMemo(() => ({
    card: "shadow-2xl border-0 overflow-hidden",
    header: "text-center pb-4 bg-gradient-to-b from-orange-50 to-white",
    content: "p-4 sm:p-6"
  }), []);

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-2 sm:p-4">
        <div className="w-full max-w-md">
          <Button 
            variant="ghost" 
            className="mb-4 text-gray-600 hover:text-gray-800 hover:bg-orange-50 text-sm sm:text-base"
            onClick={() => setShowForgotPassword(false)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>

          <Card className={cardStyles.card}>
            <div className="h-2 bg-gradient-to-r from-orange-500 via-white via-green-500 to-orange-500"></div>
            
            <CardHeader className={cardStyles.header}>
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Reset Password</CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600">
                Enter your email to receive a reset OTP
              </CardDescription>
            </CardHeader>
            
            <CardContent className={cardStyles.content}>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resetEmail" className="text-gray-700 font-medium text-sm sm:text-base">Email Address</Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base h-10 sm:h-12"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2 sm:py-3 text-sm sm:text-base h-10 sm:h-12"
                  disabled={resetLoading}
                >
                  {resetLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    'Send Reset OTP'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          className="mb-4 text-gray-600 hover:text-gray-800 hover:bg-orange-50 text-sm sm:text-base"
          onClick={navigateHome}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className={cardStyles.card}>
          <div className="h-2 bg-gradient-to-r from-orange-500 via-white via-green-500 to-orange-500"></div>
          
          <CardHeader className={cardStyles.header}>
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">User Login</CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-600">
              Continue your spiritual journey with AapkaSarthy 🇮🇳
            </CardDescription>
          </CardHeader>
          
          <CardContent className={cardStyles.content}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium text-sm sm:text-base">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  className="w-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base h-10 sm:h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium text-sm sm:text-base">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="w-full pr-10 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base h-10 sm:h-12"
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
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2 sm:py-3 text-sm sm:text-base h-10 sm:h-12"
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
            
            <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <div className="text-center">
                <Button 
                  variant="ghost" 
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 text-sm"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-orange-600 hover:text-orange-700 font-medium underline">
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

LoginUser.displayName = 'LoginUser';

export default LoginUser;
