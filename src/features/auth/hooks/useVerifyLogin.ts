import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { verifyLoginApi } from "../api/auth.api";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";

export default function useVerifyLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { mutate, isPending, error } = useMutation({
    mutationFn: verifyLoginApi,
    onSuccess: (data) => {
      toast.success(data.message);

      const user = data?.data;

      login(user);
      navigate("/profile", { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending, error };
}
