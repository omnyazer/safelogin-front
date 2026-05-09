/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  loginRequest,
  registerRequest,
  rememberRegisteredUser,
} from '../services/authService';

const AuthContext = createContext(null);
const USER_STORAGE_KEY = 'safelogin_user';

function readStoredUser() {
  const fromLegacyStorage = localStorage.getItem('username');
  const username = localStorage.getItem(USER_STORAGE_KEY) ?? fromLegacyStorage;

  if (!username) {
    return null;
  }

  return { username };
}

function persistUser(username) {
  localStorage.setItem(USER_STORAGE_KEY, username);
  localStorage.setItem('username', username);
}

function clearPersistedUser() {
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem('username');
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [authLoading, setAuthLoading] = useState(false);

  const login = useCallback(async (username, password) => {
    setAuthLoading(true);
    try {
      const result = await loginRequest({ username, password });

      if (result.success) {
        persistUser(username);
        setUser({ username });
      }

      return { ok: result.success, message: result.message };
    } catch (error) {
      return {
        ok: false,
        message: error.message || 'Connexion impossible. Merci de réessayer.',
      };
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const register = useCallback(async (username, password) => {
    setAuthLoading(true);
    try {
      const result = await registerRequest({ username, password });

      if (result.success) {
        rememberRegisteredUser(username);
      }

      return { ok: result.success, message: result.message };
    } catch (error) {
      return {
        ok: false,
        message: error.message || 'Inscription impossible. Merci de réessayer.',
      };
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearPersistedUser();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, authLoading, login, register, logout }),
    [user, authLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
