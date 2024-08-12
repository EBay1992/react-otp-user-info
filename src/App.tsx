import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from '@components/ErrorBoundary';
import Header from '@components/header/Header';
import { ACCESS_TOKEN_KEY } from '@utils/constants';
import {
  getItemFromLocalStorage,
  setItemIntoLocalStorage,
} from '@utils/storage/localStorage';

// React.lazy to dynamically import components
const Login = React.lazy(() => import('./features/login'));
const Admin = React.lazy(() => import('./features/admin'));

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getItemFromLocalStorage(ACCESS_TOKEN_KEY, null);
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const handleSetAccessToken = useCallback((token: string) => {
    setAccessToken(token);
    setItemIntoLocalStorage(ACCESS_TOKEN_KEY, token);
  }, []);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/login"
              element={
                !accessToken ? (
                  <Login setAccessToken={handleSetAccessToken} />
                ) : (
                  <Navigate to="/admin" />
                )
              }
            />
            <Route
              path="/admin"
              element={
                accessToken ? (
                  <Admin accessToken={accessToken} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
