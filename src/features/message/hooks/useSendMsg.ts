import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createMsgApi } from "../api/message.api";

export default function useSendMsg() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: createMsgApi,
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending, error };
}
