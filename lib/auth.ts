import { User } from '@/types';

const USER_KEY = 'user';

export const login = (user: User): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_KEY);
  }
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const user = localStorage.getItem(USER_KEY);
  if (user) {
    return JSON.parse(user) as User;
  }

  return null;
};
