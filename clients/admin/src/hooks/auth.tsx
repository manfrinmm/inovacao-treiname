import React, { useState, createContext, useCallback, useContext } from "react";

import api from "~/services/api";

interface AuthState {
  token: string;
}

interface SignCredentials {
  cpf: string;
  password: string;
}

interface AuthContextData {
  token: string;
  signIn(credentials: SignCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@inovaTreinamentos:token");

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ cpf, password }: SignCredentials) => {
    try {
      const response = await api.post("/sessions/admins", { cpf, password });

      const { token } = response.data;

      localStorage.setItem("@inovaTreinamentos:token", token);

      api.defaults.headers.authorization = `Bearer ${token}`;

      setAuthData({ token });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const signOut = useCallback((): void => {
    localStorage.removeItem("@inovaTreinamentos:token");

    setAuthData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, token: authData.token }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
