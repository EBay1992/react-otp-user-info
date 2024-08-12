import React, { useEffect, useState } from 'react';
import { getUserData } from '@api/mockApi';
import { ApiError } from '@api/Login.types';
import { UserData } from '@api/Admin.types';
import { ACCESS_TOKEN_KEY } from '@utils/constants';
import UserDataTable from './userData/UserDataTable';
import { removeItemFromLocalStorage } from '@utils/storage/localStorage';

interface AdminProps {
  accessToken: string;
}

const Admin: React.FC<AdminProps> = ({ accessToken }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      setError('');
      try {
        const data = await getUserData(accessToken);
        setUserData(data);
      } catch (error) {
        if ((error as ApiError).status === 401) {
          setError('Unauthorized! Redirecting to login...');
          removeItemFromLocalStorage(ACCESS_TOKEN_KEY);
        }
      }
    };

    if (accessToken) {
      fetchUserData();
    }
  }, [accessToken]);

  return (
    <div>
      <h2>Admin Page</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData ? <UserDataTable userData={userData} /> : <p>Loading...</p>}
    </div>
  );
};

export default Admin;
