import { useState, useCallback } from 'react';
import { checkUser, requestOtp, confirmOtp, createUser } from '../api/mockApi';

export const useAuth = () => {
  const [error, setError] = useState<string>('');

  const login = useCallback(
    async (contact: string, otp: string): Promise<string | null> => {
      try {
        const user = await checkUser(contact);
        if (!user) {
          throw new Error('User not found');
        }
        await requestOtp(contact);
        const response = await confirmOtp(contact, otp);
        return response.token; // return  token on successful login
      } catch (err) {
        setError((err as Error).message);
        return null; // return null if login fails
      }
    },
    []
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
    []
  );

  return {
    login,
    register,
    error,
  };
};
