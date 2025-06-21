
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, Eye, EyeOff, ArrowLeft, User, Shield, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { registerSchema, sanitizeInput, createRateLimiter } from '@/lib/validation';
import { secureAuth } from '@/lib/auth';
import { useCSRF } from '@/lib/csrf';

const Register = () => {
  const navigate = useNavigate();
  const { getCSRFToken } = useCSRF();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Rate limiting
  const rateLimiter = createRateLimiter(3, 15 * 60 * 1000); // 3 registration attempts per 15 minutes

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password)
    };
    
    const score = Object.values(checks).filter(Boolean).length;
    return { checks, score };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const clientIp = 'register-user';
    if (!rateLimiter(clientIp)) {
      toast.error('Too many registration attempts. Please try again later.');
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Input validation and sanitization
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        password: formData.password,
        confirmPassword: formData.confirmPassword
      };

      const validationResult = registerSchema.safeParse(sanitizedData);
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
      
      // Secure registration
      const result = await secureAuth.register(validationResult.data);
      
      if (result.success && result.user) {
        toast.success('Welcome to AapkaSarthy! Your spiritual journey begins now.');
        navigate('/');
      } else {
        toast.error(result.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
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
          <div className="h-2 bg-gradient-to-r from-green-500 to-blue-500"></div>
          
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Join AapkaSarthy</CardTitle>
            <CardDescription className="text-gray-600">
              Begin your personalized spiritual journey
            </CardDescription>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-xs text-green-600 font-medium">Secured Registration</span>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="csrf_token" value={getCSRFToken()} />
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your spiritual name"
                  required
                  className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                  maxLength={50}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
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
                    placeholder="Create a strong password"
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
                
                {/* Password strength indicator */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded ${
                            passwordStrength.score >= level
                              ? passwordStrength.score >= 4
                                ? 'bg-green-500'
                                : passwordStrength.score >= 3
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="space-y-1 text-xs">
                      {Object.entries(passwordStrength.checks).map(([check, passed]) => (
                        <div key={check} className={`flex items-center gap-1 ${passed ? 'text-green-600' : 'text-gray-500'}`}>
                          {passed ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                          <span>
                            {check === 'length' && '8+ characters'}
                            {check === 'uppercase' && 'Uppercase letter'}
                            {check === 'lowercase' && 'Lowercase letter'}
                            {check === 'number' && 'Number'}
                            {check === 'special' && 'Special character'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className={`w-full ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  maxLength={128}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                disabled={loading || passwordStrength.score < 4}
              >
                {loading ? 'Creating Account...' : 'Start Your Journey'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login-user" className="text-blue-600 hover:text-blue-700 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
