import React, { useState, createContext, useCallback, useContext } from "react";

import api from "~/services/api";

interface User {
  id: string;
  name: string;
}

interface AuthState {
  user: User;
  token: string;
}

interface SignCredentials {
  cpf: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthState>(() => {
    const user = localStorage.getItem("@inovaTreinamentos:user");
    const token = localStorage.getItem("@inovaTreinamentos:token");

    if (user && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { user: JSON.parse(user), token };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ cpf, password }: SignCredentials) => {
    try {
      const response = await api.post("/sessions", { cpf, password });

      const { user, token } = response.data;

      localStorage.setItem("@inovaTreinamentos:user", JSON.stringify(user));
      localStorage.setItem("@inovaTreinamentos:token", token);

      api.defaults.headers.authorization = `Bearer ${token}`;

      setAuthData({ user, token });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user: authData.user, signIn }}>
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
