import type { ResendVerificationRegisterationPayload } from "@/types/authModel";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resetPasswordApi } from "../api/auth.api";

export default function useResetPassword() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({
      data,
      idempotency,
    }: {
      data: ResendVerificationRegisterationPayload;
      idempotency: string;
    }) => resetPasswordApi(data, idempotency),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending, error };
}
