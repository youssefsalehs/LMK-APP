import type { ResendVerificationRegisterationPayload } from "@/types/authModel";
import { useMutation } from "@tanstack/react-query";
import { send2FACodeApi } from "../api/auth.api";
import { toast } from "sonner";

export default function useSend2FACode() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({
      data,
      idempotency,
    }: {
      data: ResendVerificationRegisterationPayload;
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
