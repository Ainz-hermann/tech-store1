import { useState } from 'react';
import { User } from '@/types/user';

const MOCK_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string): Promise<void> => {
    // In a real app, this would be an API call to authenticate the user
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, any email/password is accepted
        setUser(MOCK_USER);
        setIsAuthenticated(true);
        resolve();
      }, 1000);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    // In a real app, this would be an API call to register the user
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, registration always succeeds
        const newUser: User = {
          id: '1',
          name,
          email,
        };
        setUser(newUser);
        setIsAuthenticated(true);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };
}