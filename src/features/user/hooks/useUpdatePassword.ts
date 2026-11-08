import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updatePasswordApi } from "../api/user.api";

export default function useUpdatePassword() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending, error };
}
