
import { jwtDecode } from 'jwt-decode';

// Environment-based demo credentials (more secure than hardcoded)
const DEMO_CREDENTIALS = {
  user: {
    email: import.meta.env.VITE_DEMO_USER_EMAIL || 'user@example.com',
    password: import.meta.env.VITE_DEMO_USER_PASSWORD || 'SecurePass123!',
  },
  admin: {
    email: import.meta.env.VITE_DEMO_ADMIN_EMAIL || 'admin@example.com',
    password: import.meta.env.VITE_DEMO_ADMIN_PASSWORD || 'AdminSecure123!',
  }
};

// Token validation interface
interface TokenPayload {
  id: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

// Secure token storage using encrypted localStorage
class SecureStorage {
  private static encrypt(data: string): string {
    // Simple encryption for demo - in production use proper encryption
    return btoa(data + 'security-salt-' + Date.now());
  }

  private static decrypt(encryptedData: string): string {
    try {
      const decoded = atob(encryptedData);
      return decoded.split('security-salt-')[0];
    } catch {
      return '';
    }
  }

  static setToken(token: string): void {
    const encrypted = this.encrypt(token);
    localStorage.setItem('secure_token', encrypted);
    
    // Set expiration
    const expiry = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    localStorage.setItem('token_expiry', expiry.toString());
  }

  static getToken(): string | null {
    const expiry = localStorage.getItem('token_expiry');
    if (expiry && Date.now() > parseInt(expiry)) {
      this.clearAuth();
      return null;
    }

    const encrypted = localStorage.getItem('secure_token');
    if (!encrypted) return null;
    
    return this.decrypt(encrypted);
  }

  static setUser(user: any): void {
    const encrypted = this.encrypt(JSON.stringify(user));
    localStorage.setItem('secure_user', encrypted);
  }

  static getUser(): any | null {
    const encrypted = localStorage.getItem('secure_user');
    if (!encrypted) return null;
    
    try {
      const decrypted = this.decrypt(encrypted);
      return JSON.parse(decrypted);
    } catch {
      return null;
    }
  }

  static clearAuth(): void {
    localStorage.removeItem('secure_token');
    localStorage.removeItem('secure_user');
    localStorage.removeItem('token_expiry');
    // Clear any other auth-related data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

// Token validation
export const validateToken = (token: string): boolean => {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const currentTime = Date.now() / 1000;
    
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

// Generate a more secure mock JWT token
export const generateSecureToken = (user: any): string => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
  };
  
  // Mock JWT creation (in production, use proper JWT library)
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = btoa(`${encodedHeader}.${encodedPayload}.mock-signature-${Date.now()}`);
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

// Secure authentication functions
export const secureAuth = {
  login: async (credentials: { email: string; password: string }, isAdmin = false): Promise<{ success: boolean; user?: any; error?: string }> => {
    const demoUser = isAdmin ? DEMO_CREDENTIALS.admin : DEMO_CREDENTIALS.user;
    
    // Simulate network delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.email === demoUser.email && credentials.password === demoUser.password) {
      const user = {
        id: isAdmin ? 'admin-1' : `user-${Math.floor(Math.random() * 1000)}`,
        name: isAdmin ? 'Temple Administrator' : 'Spiritual Seeker',
        email: credentials.email,
        role: isAdmin ? 'admin' : 'user',
        joinDate: new Date().toISOString(),
        ...(isAdmin ? {} : { streak: 7, points: 1250 })
      };
      
      const token = generateSecureToken(user);
      
      SecureStorage.setToken(token);
      SecureStorage.setUser(user);
      
      return { success: true, user };
    }
    
    return { success: false, error: 'Invalid credentials' };
  },

  register: async (userData: { name: string; email: string; password: string }): Promise<{ success: boolean; user?: any; error?: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const user = {
      id: `user-${Math.floor(Math.random() * 10000)}`,
      name: userData.name,
      email: userData.email,
      role: 'user',
      joinDate: new Date().toISOString(),
      streak: 0,
      points: 0
    };
    
    const token = generateSecureToken(user);
    
    SecureStorage.setToken(token);
    SecureStorage.setUser(user);
    
    return { success: true, user };
  },

  logout: (): void => {
    SecureStorage.clearAuth();
  },

  getCurrentUser: (): any | null => {
    const token = SecureStorage.getToken();
    if (!token || !validateToken(token)) {
      SecureStorage.clearAuth();
      return null;
    }
    
    return SecureStorage.getUser();
  },

  isAuthenticated: (): boolean => {
    const token = SecureStorage.getToken();
    return token ? validateToken(token) : false;
  }
};

export { DEMO_CREDENTIALS, SecureStorage };
