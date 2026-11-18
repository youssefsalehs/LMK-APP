import useMakeRequest from "@/features/request/hooks/useMakeRequest";
import { formatDateTime } from "@/shared/utils/formatDate";
import type { Message } from "@/types/messageModel";
import { Eye, Sparkles } from "lucide-react";
import { Link } from "react-router";

interface MessageCardProps {
  msg: Message;
}

const DEFAULT_PP: string = import.meta.env.VITE_DEFAULT_PP;

export default function MessageCard({ msg }: MessageCardProps) {
  const sender =
    typeof msg?.sender === "object" && msg?.sender !== null ? msg.sender : null;

  const profilePicturePath = sender?.profilePicture?.secure_url || DEFAULT_PP;
  const username = sender?.username;

  const { mutate } = useMakeRequest();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-primary  text-secondary border-x-2 border-b-2 p-5 sm:p-6 transition-all duration-300 border-[#E727F5]/50 hover:shadow-2xl hover:shadow-[#8027F5]/20 group">
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r gradientBg opacity-75 group-hover:opacity-100 transition-opacity" />

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3 flex-wrap">
            {msg.isAnonymous ? (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E727F5]/10 text-[#E727F5] dark:text-[#F5279C] font-bold text-sm border border-[#E727F5]/20 shadow-xs shadow-[#8027F5]/10">
                  <Sparkles className="w-4 h-4 text-[#E727F5]" />
                  Anonymous
                </span>

                {!msg.hasRequestedReveal && (
                  <button
                    onClick={() => mutate(msg._id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary hover:bg-[#E727F5]/10 text-secondary-foreground hover:text-[#E727F5] border border-border transition-colors font-medium text-xs cursor-pointer"
                    title="Reveal sender"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Reveal Who
                  </button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-secondary border border-border text-secondary-foreground">
                <img
                  src={profilePicturePath}
                  alt={username || "User"}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-border"
                />
                <Link
                  to={username ? `/${username}` : "#"}
                  className="font-bold text-sm text-primary hover:text-[#E727F5] transition-colors"
                >
                  @{username || "Unknown"}
                </Link>
              </div>
            )}
          </div>

          {msg.createdAt && (
            <span className="text-muted font-medium text-[11px] sm:text-xs">
              {formatDateTime(msg.createdAt)}
            </span>
          )}
        </div>

        <div className="py-1">
          <p className="text-base sm:text-lg font-bold text-card tracking-tight leading-relaxed wrap-break-word">
            "{msg.content}"
          </p>
        </div>

        {msg.media && msg.media.length > 0 && (
          <div
            className={`grid gap-2 pt-1 ${msg.media.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
          >
            {msg.media.map((url, idx) => (
              <div
                key={idx}
                className="relative aspect-video rounded-2xl overflow-hidden bg-muted border border-border group/img"
              >
                <img
                  src={url}
                  alt={`Attachment ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
