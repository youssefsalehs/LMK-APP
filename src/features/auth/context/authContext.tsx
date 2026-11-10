import { createContext, useContext, type ReactNode } from "react";
import type { User } from "@/types/userModel";
import useGetMe from "../hooks/useGetMe";
import { useQueryClient } from "@tanstack/react-query";
import QueryKeys from "@/shared/utils/queryKeys";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login(userData: User): void;
  logout(): void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useGetMe();

  const queryClient = useQueryClient();
  const userData: User | undefined = data?.data;
  const login = (user: User) => {
    queryClient.invalidateQueries({ queryKey: QueryKeys.authUser });
    queryClient.setQueryData(QueryKeys.authUser, user);
  };

  const logout = () => {
    queryClient.setQueryData(QueryKeys.authUser, null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{ user: userData ?? null, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
