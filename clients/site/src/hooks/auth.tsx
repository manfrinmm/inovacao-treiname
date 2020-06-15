import React, { createContext, useState, useContext, useCallback } from "react";
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

interface SignCredentials {
  cpf: string;
  password: string;
}

interface SignUpData {
  name: string;
  cpf: string;
  rg: string;
  phone: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignCredentials): Promise<void>;
  signOut(): void;
  signUp(data: SignUpData): Promise<void>;
}

interface AuthState {
  user: User;
  token: string;
}

const AuthContext = createContext({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem("@inovaTreinamentos:token");
    const user = localStorage.getItem("@inovaTreinamentos:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      // api.interceptors.request.use(config => {
      //   console.log("AA");

      //   axios.get("http://192.168.0.101:3333/users").catch(() => {
      //     localStorage.removeItem("@inovaTreinamentos:token");
      //     localStorage.removeItem("@inovaTreinamentos:user");

      //     toast.info("Faça login novamente.");

      //     setAuthData({} as AuthState);
      //   });

      //   return config;
      // });
      api.get("/users/dashboard").catch(() => {
        localStorage.removeItem("@inovaTreinamentos:token");
        localStorage.removeItem("@inovaTreinamentos:user");

        toast.info("Faça login novamente.", { toastId: "ToastInfoMessage" });

        setAuthData({} as AuthState);
      });

      return { user: JSON.parse(user), token };
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
        const sessionRequestData = {
          cpf,
          password,
          ...(await generateLog()),
        };
        const response = await api.post("/sessions", sessionRequestData);

        const { user, token } = response.data;

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

  const signUp = useCallback(async (data: SignUpData) => {
    try {
      await api.post("/users", data);
      toast.success("Usuário criado com sucesso.");
    } catch (error) {
      throw toast.error("Erro ao criar usuário.");
    }

    setAuthData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: authData.user, signIn, signOut, signUp }}
    >
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
