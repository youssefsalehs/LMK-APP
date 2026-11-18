import { MyPagination } from "@/shared/components/pagination/MyPagination";
import type { MetaData } from "@/types/baseResponse";
import Header from "../../components/Header/Header";
import RequestCard from "../../components/requestCard/RequestCard";
import RequestSkeleton from "../../components/requestCard/RequestSkeleton";
import useGetIncomigRequests from "../../hooks/useGetIncomigRequests";

export default function IncomingRequests() {
  const { data, isLoading } = useGetIncomigRequests();
  const requests = data?.data;
  const meta = data?.metaData;

  return (
    <div className="py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Header meta={meta as MetaData} type="incoming" />

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <RequestSkeleton key={i} />
            ))}
          </div>
        )}
        {!isLoading && (!requests || requests.length === 0) && (
          <div className="rounded-3xl bg-card text-card-foreground border border-border p-8 sm:p-12 shadow-sm space-y-10">
            <div className="text-center space-y-3.5 max-w-md mx-auto">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                No reveal requests yet
              </h2>
            </div>
          </div>
        )}

        {!isLoading && requests && requests.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requests.map((req) => (
              <RequestCard key={req._id} req={req} type="incoming" />
            ))}
          </div>
        )}

        {meta && requests && requests.length > 0 && (
          <div className="pt-2 flex justify-center">
            <MyPagination meta={meta} />
          </div>
        )}
      </div>
    </div>
  );
}
