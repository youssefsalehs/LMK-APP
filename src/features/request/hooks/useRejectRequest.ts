import QueryKeys from "@/shared/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { rejectRequestApi } from "../api/request.api";
//hook to  let sender reject  request
export default function useRejectRequest() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: rejectRequestApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: QueryKeys.incomingRequests });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending, error };
}
