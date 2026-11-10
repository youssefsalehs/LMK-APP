import { useQuery } from "@tanstack/react-query";
import { getMeApi } from "../api/auth.api";
import QueryKeys from "@/shared/utils/queryKeys";
//hook to get user information and the checkPoint for refresh token
export default function useGetMe() {
  const { data, isLoading, error } = useQuery({
    queryKey: QueryKeys.authUser,
    queryFn: getMeApi,
    retry: false,
    staleTime: 1 * 60 * 1000,
  });
  return { data, isLoading, error };
}
