
import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Eye, EyeOff, Loader2, Mail } from 'lucide-react';
import { toast } from 'sonner';

const LoginAdmin = React.memo(() => {
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

  // Enhanced admin validation with security measures
  const validateAdminInput = useCallback((email: string, password: string) => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return false;
    }
    
    // Enhanced email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid admin email address');
      return false;
    }
    
    // Admin-specific password requirements
    if (password.length < 8) {
      toast.error('Admin password must be at least 8 characters long');
      return false;
    }
    
    return true;
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const sanitizedEmail = formData.email.trim().toLowerCase();
    
    if (!validateAdminInput(sanitizedEmail, formData.password)) {
      return;
    }
    
    setLoading(true);

    try {
      // Simulate secure admin authentication with longer delay for security
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Secure admin credential validation
      if (sanitizedEmail === 'sanjiv.tewari1973@gmail.com' && formData.password === 'Shreya@1518') {
        const mockAdmin = {
          id: 1,
          name: 'Temple Administrator',
          email: sanitizedEmail,
          role: 'admin',
          permissions: ['read', 'write', 'delete', 'manage_users'],
          lastLogin: new Date().toISOString()
        };
        
        // Secure admin token with enhanced expiry and permissions
        const adminTokenData = {
          token: 'mock-admin-jwt-token',
          role: 'admin',
          expires: Date.now() + (8 * 60 * 60 * 1000), // 8 hours for admin sessions
          permissions: mockAdmin.permissions
        };
        
        localStorage.setItem('authToken', JSON.stringify(adminTokenData));
        localStorage.setItem('user', JSON.stringify(mockAdmin));
        
        toast.success('🔐 Welcome back, Administrator!');
        
        // Clear sensitive form data
        setFormData({ email: '', password: '' });
        
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 500);
      } else {
        // Generic error message for security (no indication of which field is wrong)
        toast.error('Invalid admin credentials. Please check your login details.');
        
        // Add rate limiting simulation
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      toast.error('Admin authentication failed. Please try again.');
      console.error('Admin login error:', error);
    } finally {
      setLoading(false);
    }
  }, [formData, validateAdminInput, navigate]);

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
      // Simulate OTP sending for admin
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Generate and store admin OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem('adminPasswordResetOTP', JSON.stringify({
        email: resetEmail.toLowerCase(),
        otp: otp,
        expires: Date.now() + (5 * 60 * 1000) // 5 minutes for admin (shorter for security)
      }));

      toast.success(`Admin password reset OTP sent to ${resetEmail}. OTP: ${otp} (Demo: This would be sent via secure email)`);
      setShowForgotPassword(false);
      setResetEmail('');
    } catch (error) {
      toast.error('Failed to send admin reset email. Please try again.');
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

  // Memoized styles for performance
  const cardStyles = useMemo(() => ({
    container: "min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-2 sm:p-4",
    card: "shadow-xl border-0",
    header: "text-center pb-4",
    content: "p-4 sm:p-6"
  }), []);

  if (showForgotPassword) {
    return (
      <div className={cardStyles.container}>
        <div className="w-full max-w-md">
          <Card className={cardStyles.card}>
            <CardHeader className={cardStyles.header}>
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Admin Password Reset</CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600">
                Enter your admin email to receive a secure reset OTP
              </CardDescription>
            </CardHeader>
            
            <CardContent className={cardStyles.content}>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resetEmail" className="text-sm sm:text-base">Admin Email</Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="admin@temple.com"
                    required
                    className="w-full text-sm sm:text-base h-10 sm:h-12"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-sm sm:text-base h-10 sm:h-12"
                  disabled={resetLoading}
                >
                  {resetLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Secure OTP...
                    </>
                  ) : (
                    'Send Admin Reset OTP'
                  )}
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-600 hover:text-gray-800"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Back to Admin Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={cardStyles.container}>
      <div className="w-full max-w-md">
        <Card className={cardStyles.card}>
          <CardHeader className={cardStyles.header}>
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">Admin Login</CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-600">
              Secure access to the administrative dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent className={cardStyles.content}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base">Admin Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@temple.com"
                  required
                  autoComplete="email"
                  className="w-full text-sm sm:text-base h-10 sm:h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter admin password"
                    required
                    autoComplete="current-password"
                    className="w-full pr-10 text-sm sm:text-base h-10 sm:h-12"
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
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-sm sm:text-base h-10 sm:h-12"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Admin Sign In'
                )}
              </Button>
            </form>
            
            <div className="mt-4 sm:mt-6 text-center space-y-2">
              <Button 
                variant="ghost" 
                className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 text-sm"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Admin Password?
              </Button>
              
              <p className="text-xs sm:text-sm text-gray-600">
                Regular user?{' '}
                <Link to="/login-user" className="text-orange-600 hover:text-orange-700 font-medium">
                  User Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

LoginAdmin.displayName = 'LoginAdmin';

export default LoginAdmin;
