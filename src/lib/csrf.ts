
// CSRF Token management
class CSRFProtection {
  private static tokenKey = 'csrf_token';
  private static tokenExpiry = 'csrf_expiry';
  
  static generateToken(): string {
    const token = btoa(Math.random().toString(36) + Date.now().toString(36));
    const expiry = Date.now() + (60 * 60 * 1000); // 1 hour
    
    sessionStorage.setItem(this.tokenKey, token);
    sessionStorage.setItem(this.tokenExpiry, expiry.toString());
    
    return token;
  }
  
  static getToken(): string | null {
    const expiry = sessionStorage.getItem(this.tokenExpiry);
    if (expiry && Date.now() > parseInt(expiry)) {
      this.clearToken();
      return null;
    }
    
    return sessionStorage.getItem(this.tokenKey);
  }
  
  static validateToken(token: string): boolean {
    const storedToken = this.getToken();
    return storedToken === token;
  }
  
  static clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenExpiry);
  }
}

// Hook for CSRF token management
export const useCSRF = () => {
  const getCSRFToken = (): string => {
    let token = CSRFProtection.getToken();
    if (!token) {
      token = CSRFProtection.generateToken();
    }
    return token;
  };
  
  const validateCSRF = (token: string): boolean => {
    return CSRFProtection.validateToken(token);
  };
  
  return { getCSRFToken, validateCSRF };
};

export { CSRFProtection };
