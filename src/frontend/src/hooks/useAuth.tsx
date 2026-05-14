import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Identity } from "@icp-sdk/core/agent";
import { useNavigate } from "@tanstack/react-router";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  identity: Identity | undefined;
  principal: string | undefined;
  login: () => void;
  logout: () => void;
}

export function useAuth(): AuthState {
  const { identity, login, clear, isInitializing, isAuthenticated } =
    useInternetIdentity();

  const navigate = useNavigate();

  const logout = () => {
    clear();
    navigate({ to: "/" });
  };

  const principal = identity?.getPrincipal()?.toString();

  return {
    isAuthenticated,
    isLoading: isInitializing,
    identity,
    principal,
    login,
    logout,
  };
}
