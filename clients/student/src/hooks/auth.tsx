import React, { useContext, createContext, useState, useCallback } from "react";
import { toast } from "react-toastify";

import axios from "axios";

import api from "~/services/api";

interface User {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  phone: string;
}

interface GenerateLogData {
  countryCode: string;
  regionName: string;
  city: string;
  query: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignCredentials {
  cpf: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@inovaTreinamentos:token");
    const user = localStorage.getItem("@inovaTreinamentos:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      api.get("/users/dashboard").catch(() => {
        localStorage.removeItem("@inovaTreinamentos:token");
        localStorage.removeItem("@inovaTreinamentos:user");

        toast.info("Faça login novamente.", { toastId: "ToastInfoMessage" });

        setAuthData({} as AuthState);
      });

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const generateLog = useCallback(async (): Promise<GenerateLogData> => {
    try {
      const regionResponse = await axios.get(
        "http://ip-api.com/json?fields=countryCode,regionName,city,query",
      );

      return regionResponse.data;
    } catch (error) {
      return {
        countryCode: "-",
        regionName: "-",
        city: "-",
        query: "-",
      };
    }
  }, []);

  const signIn = useCallback(
    async ({ cpf, password }: SignCredentials) => {
      try {
        const { countryCode, regionName, city, query } = await generateLog();

        const response = await api.post("/sessions", {
          cpf,
          password,
          countryCode,
          regionName,
          city,
          query,
        });

        const { token, user } = response.data;

        localStorage.setItem("@inovaTreinamentos:token", token);
        localStorage.setItem("@inovaTreinamentos:user", JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${token}`;

        setAuthData({ token, user });
      } catch (error) {
        throw toast.error("Falha ao fazer login.");
      }
    },
    [generateLog],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem("@inovaTreinamentos:token");
    localStorage.removeItem("@inovaTreinamentos:user");

    setAuthData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: authData.user, signIn, signOut }}>
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
