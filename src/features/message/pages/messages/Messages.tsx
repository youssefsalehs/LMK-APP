import { MyPagination } from "@/shared/components/pagination/MyPagination";
import { Inbox } from "lucide-react";
import MessageCard from "../../components/msg/MessageCard";
import useGetAllMsgs from "../../hooks/useGetAllMsgs";

export default function Messages() {
  const { data, isLoading } = useGetAllMsgs();
  const messages = data?.data;
  const meta = data?.metaData;

  return (
    <div className="h-[90vh] overflow-hidden flex items-center justify-center bg-linear-to-r gradientBg rounded-3xl mx-4 py-10 mt-10 px-4 sm:px-6 shadow-2xl">
      <div className="relative w-full max-w-xl mx-auto h-full flex flex-col justify-center">
        <div className="flex flex-col gap-4 overflow-y-auto max-h-full pr-2">
          {isLoading && (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
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
            <div className="bg-primary rounded-3xl border border-muted/10 p-10 text-center space-y-4 shadow-2xl">
              <div className="w-14 h-14 rounded-full bg-linear-to-tr gradientBg flex items-center justify-center mx-auto shadow-lg shadow-[#E727F5]/30">
                <Inbox className="w-7 h-7 " />
              </div>
              <h3 className="text-lg font-extrabold ">No messages yet!</h3>
            </div>
          )}

          {!isLoading && messages && messages.length > 0 && (
            <div className="space-y-4">
              {messages.map((msg) => (
                <MessageCard msg={msg} key={msg._id} />
              ))}
            </div>
          )}
        </div>

        {meta && (
          <div className="pt-4 flex justify-center  mt-auto">
            <MyPagination meta={meta} />
          </div>
        )}
      </div>
    </div>
  );
}
