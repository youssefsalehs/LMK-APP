import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { makeRequestApi } from "../api/request.api";
import QueryKeys from "@/shared/utils/queryKeys";
//hook to  let reciever make a request
export default function useMakeRequest() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: makeRequestApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: QueryKeys.messages });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending, error };
}
