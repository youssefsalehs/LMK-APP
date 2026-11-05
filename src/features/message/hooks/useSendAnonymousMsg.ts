import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createMsgAnonmyousApi } from "../api/message.api";

export default function useSendAnonymousMsg() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: createMsgAnonmyousApi,
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending, error };
}
