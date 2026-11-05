import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getProfileApi } from "../api/user.api";
import QueryKeys from "@/shared/lib/queryKeys";

export default function useGetProfile() {
  const { username }: Partial<{ username: string }> = useParams<{
    username: string;
  }>();
  const { data, isLoading, error } = useQuery({
    queryKey: [QueryKeys.profile, username],
    queryFn: () => getProfileApi(username as string),
    retry: false,
  });
  return { data, isLoading, error };
}
