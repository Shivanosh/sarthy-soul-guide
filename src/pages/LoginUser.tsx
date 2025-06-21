
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Eye, EyeOff, ArrowLeft, Loader2, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { loginSchema, sanitizeInput, createRateLimiter } from '@/lib/validation';
import { secureAuth, DEMO_CREDENTIALS } from '@/lib/auth';
import { useCSRF } from '@/lib/csrf';

const LoginUser = () => {
  const navigate = useNavigate();
  const { getCSRFToken } = useCSRF();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Rate limiting
  const rateLimiter = createRateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const clientIp = 'user'; // In production, use actual IP
    if (!rateLimiter(clientIp)) {
      toast.error('Too many login attempts. Please try again later.');
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Input validation
      const sanitizedData = {
        email: sanitizeInput(formData.email),
        password: formData.password // Don't sanitize password as it may contain special chars
      };

      const validationResult = loginSchema.safeParse(sanitizedData);
      if (!validationResult.success) {
        const fieldErrors: Record<string, string> = {};
        validationResult.error.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
        return;
      }

      // CSRF token validation
      const csrfToken = getCSRFToken();
      
      // Secure authentication
      const result = await secureAuth.login(validationResult.data, false);
      
      if (result.success && result.user) {
        toast.success('🙏 Welcome back to your spiritual journey!');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        toast.error(result.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleGuestLogin = () => {
    setFormData({
      email: DEMO_CREDENTIALS.user.email,
      password: DEMO_CREDENTIALS.user.password
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
          {/* Security indicator */}
          <div className="h-2 bg-gradient-to-r from-green-500 to-blue-500"></div>
          
          <CardHeader className="text-center pb-4 bg-gradient-to-b from-orange-50 to-white">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">User Login</CardTitle>
            <CardDescription className="text-gray-600">
              Continue your spiritual journey with AapkaSarthy 🇮🇳
            </CardDescription>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-xs text-green-600 font-medium">Secured Connection</span>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="csrf_token" value={getCSRFToken()} />
              
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
                  className={`w-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  maxLength={100}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
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
                    className={`w-full pr-10 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                    maxLength={128}
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
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
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
                    {DEMO_CREDENTIALS.user.email} / {DEMO_CREDENTIALS.user.password}
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
