import { useQuery } from "@tanstack/react-query";
import QueryKeys from "@/shared/utils/queryKeys";
import { getSentRequestsApi } from "../api/request.api";
import { useSearchParams } from "react-router";
//hook to get the requests for receiver
export default function useGetSentRequests() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading, error } = useQuery({
    queryKey: [...QueryKeys.sentRequests, page],
    queryFn: () => getSentRequestsApi(page),
  });
  return { data, isLoading, error };
}
