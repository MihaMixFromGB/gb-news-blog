import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { UserEntity } from '@gb-news-blog/entities';
import * as authApi from '../api/auth';

export interface AuthContextType {
  user: UserEntity | null;
  loading: boolean;
  error?: string;
  login: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) setError('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    authApi
      .getCurrentUser()
      .then((newUser) => setUser(newUser))
      .catch((_error) => setError(_error.message))
      .finally(() => setLoadingInitial(false));
  }, []);

  function login(email: string, password: string) {
    setLoading(true);

    authApi
      .login({ email, password })
      .then((newUser) => {
        setUser(newUser);
        navigate('/', { replace: true });
      })
      .catch((newError) => setError(newError.message))
      .finally(() => setLoading(false));
  }

  function signUp(email: string, password: string) {
    setLoading(true);

    authApi
      .signUp({ email, password })
      .then((newUser) => {
        setUser(newUser);
        navigate('/', { replace: true });
      })
      .catch((newError) => setError(newError.message))
      .finally(() => setLoading(false));
  }

  function logout() {
    authApi.logout().then(() => setUser(null));
  }

  // Make the provider update only when it should
  const memoedValue = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      error,
      login,
      signUp,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

export default function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
