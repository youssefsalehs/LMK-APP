import type { SendOtpPayload } from "@/types/authModel";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { sendOtpApi } from "../api/auth.api";
//hook to resend otp code
export default function useSendOtp() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({
      data,
      idempotency,
    }: {
      data: SendOtpPayload;
      idempotency: string;
    }) => sendOtpApi(data, idempotency),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending, error };
}
