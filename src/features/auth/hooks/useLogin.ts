import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { loginApi } from "../api/auth.api";
import { useAuth } from "../context/authContext";
//login user hook , it handles both 2fa or ordinary login
export default function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutate, isPending, error } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data, variables) => {
      toast.success(data?.message);

      const user = data?.data;
      const email = variables?.email;
      if (!user) {
        navigate("/auth/verification-login", {
          state: { email: email ?? "" },
          replace: true,
        });
      }
      if (user) {
        login(user);
        navigate("/profile", { replace: true });
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending, error };
}
