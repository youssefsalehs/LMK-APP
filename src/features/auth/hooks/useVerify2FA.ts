import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { verify2FAApi } from "../api/auth.api";
// hook to verify enable 2fa code
export default function useVerify2FA() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: verify2FAApi,
    onSuccess: (data) => {
      toast.success(data.message);
      window.location.reload();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending, error };
}
