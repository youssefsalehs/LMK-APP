import type { SendOtpPayload } from "@/types/authModel";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { send2FACodeApi } from "../api/auth.api";
// hook to send 2fa enable code
export default function useSend2FACode() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({
      data,
      idempotency,
    }: {
      data: SendOtpPayload;
      idempotency: string;
    }) => send2FACodeApi(data, idempotency),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending, error };
}
