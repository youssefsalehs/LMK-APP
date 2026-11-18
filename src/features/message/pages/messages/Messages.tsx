import { MyPagination } from "@/shared/components/pagination/MyPagination";
import { Inbox } from "lucide-react";
import MessageCard from "../../components/msg/MessageCard";
import useGetAllMsgs from "../../hooks/useGetAllMsgs";

export default function Messages() {
  const { data, isLoading } = useGetAllMsgs();
  const messages = data?.data;
  const meta = data?.metaData;

  return (
    <div className="py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br gradientBg p-6 sm:p-8 lg:p-10">
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
                Incoming Messages
              </h1>
              <p className="text-sm sm:text-base max-w-xl">
                Read all the anonymous messages people have sent you and request
                identity reveals.
              </p>
            </div>

            <div className="self-start sm:self-center shrink-0 rounded-2xl bg-primary/20 backdrop-blur-md px-6 py-4 text-center">
              <div className="text-3xl font-black leading-none">
                {meta?.total}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider mt-1.5">
                Messages
              </div>
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-32 rounded-3xl bg-primary border border-border/40 p-5 animate-pulse space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="h-6 bg-muted-foreground/60 rounded-full w-28" />
                  <div className="h-3 bg-muted-foreground/40 rounded-md w-20" />
                </div>
                <div className="h-5 bg-muted-foreground/80 rounded-xl w-3/4" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && (!messages || messages.length === 0) && (
          <div className="rounded-3xl bg-card text-card-foreground border border-border p-8 sm:p-12 shadow-sm space-y-10">
            <div className="text-center space-y-3.5 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-full bg-linear-to-tr gradientBg flex items-center justify-center mx-auto shadow-lg shadow-[#E727F5]/30">
                <Inbox className="w-7 h-7" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                No messages yet!
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                You haven't received any messages yet. Share your profile link
                to start getting anonymous messages from others.
              </p>
            </div>
          </div>
        )}

        {!isLoading && messages && messages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {messages.map((msg) => (
              <MessageCard msg={msg} key={msg._id} />
            ))}
          </div>
        )}

        {meta && messages && messages.length > 0 && (
          <div className="pt-2 flex justify-center">
            <MyPagination meta={meta} />
          </div>
        )}
      </div>
    </div>
  );
}
