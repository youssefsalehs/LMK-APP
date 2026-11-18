import QueryKeys from "@/shared/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getincomingRequestsApi } from "../api/request.api";
//hook to get the requests for receiver
export default function useGetIncomigRequests() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading, error } = useQuery({
    queryKey: [...QueryKeys.incomingRequests, page],
    queryFn: () => getincomingRequestsApi(page),
  });
  return { data, isLoading, error };
}
