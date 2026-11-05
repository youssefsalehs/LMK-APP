import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logoutApi } from "../api/auth.api";
import { useAuth } from "../context/authContext";

export default function useLogout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { mutate, isPending, error } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logout();
      navigate("/auth/login", { replace: true });
    },
    onError: (error: Error) => {
      console.error("Logout failed:", error);
    },
  });
  return { mutate, isPending, error };
}
