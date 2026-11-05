import { useMutation } from "@tanstack/react-query";
import { verifyRegistertionApi } from "../api/auth.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { TverifyOtpData } from "@/types/verifyOtpData";

export default function useVerifyRegistration() {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ data }: { data: TverifyOtpData }) =>
      verifyRegistertionApi(data),
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
