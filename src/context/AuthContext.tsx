import React, { createContext, useState, useCallback } from 'react';
import { checkUser, requestOtp, confirmOtp, createUser } from '../api/mockApi';

interface AuthContextValue {
  accessToken: string | null;
  error: string;
  login: (contact: string, otp: string) => Promise<void>;
  register: (
    contact: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  setAccessToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextValue>({
  accessToken: null,
  error: '',
  login: async () => {},
  register: async () => {},
  setAccessToken: () => {},
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthProvider: React.FC<any> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const login = useCallback(
    async (contact: string, otp: string): Promise<void> => {
      try {
        const user = await checkUser(contact);
        if (!user) {
          throw new Error('User not found');
        }
        await requestOtp(contact);
        const response = await confirmOtp(contact, otp);
        setAccessToken(response.token);
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [setAccessToken, setError]
  );

  const register = useCallback(
    async (
      contact: string,
      firstName: string,
      lastName: string
    ): Promise<void> => {
      try {
        await createUser(contact, firstName, lastName);
        await requestOtp(contact);
      } catch (err) {
        setError((err as Error).message);
      }
    },
    [setError]
  );

  return (
    <AuthContext.Provider
      value={{ accessToken, error, login, register, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
