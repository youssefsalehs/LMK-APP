import QueryKeys from "@/shared/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { acceptRequestApi } from "../api/request.api";
//hook to  let sebder accept request
export default function useAcceptRequest() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: acceptRequestApi,
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
