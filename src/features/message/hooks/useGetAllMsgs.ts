import { useQuery } from "@tanstack/react-query";
import QueryKeys from "@/shared/utils/queryKeys";
import { getAllMsgsForUserApi } from "../api/message.api";
import { useSearchParams } from "react-router";

export default function useGetAllMsgs() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading, error } = useQuery({
    queryKey: [...QueryKeys.messages, page],
    queryFn: () => getAllMsgsForUserApi(page),
  });

  return { data, isLoading, error };
}
