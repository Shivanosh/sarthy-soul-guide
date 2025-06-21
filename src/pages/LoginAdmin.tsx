
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { adminLoginSchema, sanitizeInput, createRateLimiter } from '@/lib/validation';
import { secureAuth, DEMO_CREDENTIALS } from '@/lib/auth';
import { useCSRF } from '@/lib/csrf';

const LoginAdmin = () => {
  const navigate = useNavigate();
  const { getCSRFToken } = useCSRF();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Stricter rate limiting for admin login
  const rateLimiter = createRateLimiter(3, 30 * 60 * 1000); // 3 attempts per 30 minutes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const clientIp = 'admin-login';
    if (!rateLimiter(clientIp)) {
      toast.error('Too many admin login attempts. Please try again later.');
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Input validation and sanitization
      const sanitizedData = {
        email: sanitizeInput(formData.email),
        password: formData.password
      };

      const validationResult = adminLoginSchema.safeParse(sanitizedData);
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
      
      // Secure admin authentication
      const result = await secureAuth.login(validationResult.data, true);
      
      if (result.success && result.user) {
        toast.success('Welcome back, Administrator!');
        navigate('/');
      } else {
        toast.error(result.error || 'Invalid admin credentials');
      }
    } catch (error) {
      console.error('Admin login error:', error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-4 text-gray-600 hover:text-gray-800"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-xl border-0 overflow-hidden">
          {/* Security indicator */}
          <div className="h-2 bg-gradient-to-r from-red-500 to-yellow-500"></div>
          
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Admin Login</CardTitle>
            <CardDescription className="text-gray-600">
              Access the administrative dashboard
            </CardDescription>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Shield className="h-4 w-4 text-red-600" />
              <span className="text-xs text-red-600 font-medium">High Security Zone</span>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="csrf_token" value={getCSRFToken()} />
              
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@temple.com"
                  required
                  className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                  maxLength={100}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter admin password"
                    required
                    className={`w-full pr-10 ${errors.password ? 'border-red-500' : ''}`}
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
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                disabled={loading}
              >
                {loading ? 'Authenticating...' : 'Admin Sign In'}
              </Button>
            </form>
            
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600">
                Regular user?{' '}
                <Link to="/login-user" className="text-orange-600 hover:text-orange-700 font-medium">
                  User Login
                </Link>
              </p>
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <p className="text-xs text-yellow-800 font-medium">
                  🔐 Demo Admin:
                </p>
                <p className="text-xs text-yellow-700">
                  {DEMO_CREDENTIALS.admin.email} / {DEMO_CREDENTIALS.admin.password}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginAdmin;
