import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { verifyRegistertionApi } from "../api/auth.api";

export default function useVerifyRegistration() {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: verifyRegistertionApi,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/auth/login", { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending, error };
}
