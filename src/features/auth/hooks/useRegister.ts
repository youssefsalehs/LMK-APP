import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../api/auth.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";
// register new user hook
export default function useRegister() {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/auth/verification-email", {
        state: { email: data.data.email },
        replace: true,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending, error };
}
