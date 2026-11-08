import QueryKeys from "@/shared/utils/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deactivateProfileApi } from "../api/user.api";

export default function useDeactivateUser() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: deactivateProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.authUser });
      queryClient.clear();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending, error };
}
