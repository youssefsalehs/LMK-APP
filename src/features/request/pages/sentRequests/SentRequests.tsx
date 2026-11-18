import { MyPagination } from "@/shared/components/pagination/MyPagination";
import type { MetaData } from "@/types/baseResponse";
import { ArrowRight, Inbox } from "lucide-react";
import { Link } from "react-router";
import Header from "../../components/Header/Header";
import RequestCard from "../../components/requestCard/RequestCard";
import RequestSkeleton from "../../components/requestCard/RequestSkeleton";
import useGetSentRequests from "../../hooks/useGetSentRequests";

export default function SentRequests() {
  const { data, isLoading } = useGetSentRequests();
  const requests = data?.data;
  const meta = data?.metaData;

  return (
    <div className="py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <Header meta={meta as MetaData} type="sent" />

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
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Curious who sent an anonymous message? Request a reveal from
                your inbox and track their response right here.
              </p>

              <div className="pt-2">
                <Link
                  to="/inbox"
                  className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold px-7 py-3.5 transition-all shadow-md hover:shadow-lg"
                >
                  <Inbox className="w-4 h-4" />
                  Browse Your Messages
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
        {!isLoading && requests && requests.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requests.map((req) => (
              <RequestCard key={req._id} req={req} type="sent" />
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
