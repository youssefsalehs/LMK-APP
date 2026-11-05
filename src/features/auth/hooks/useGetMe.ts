import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "../api/auth.api";
import QueryKeys from "@/shared/lib/queryKeys";

export default function useGetMe() {
  const { data, isLoading, error } = useQuery({
    queryKey: QueryKeys.authUser,
    queryFn: getMeApi,
    retry: false,
    staleTime: 1 * 60 * 1000,
  });
  return { data, isLoading, error };
}
