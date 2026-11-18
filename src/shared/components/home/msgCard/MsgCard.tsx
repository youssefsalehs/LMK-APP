import { Sparkles, User } from "lucide-react";

interface MsgCardMockProps {
  content?: string;
  isAnonymous?: boolean;
  username?: string;
  profilePicture?: string;
  timeAgo?: string;
}

export default function MsgCard({
  content = "Send me anonymous messages! What do you really think about me?",
  isAnonymous = true,
  username = "johndoe",
  profilePicture,
  timeAgo = "2h ago",
}: MsgCardMockProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-primary text-secondary border border-border p-5 sm:p-6 transition-all duration-300 hover:border-[#E727F5]/50 hover:shadow-2xl hover:shadow-[#8027F5]/20 group max-w-md w-full shadow-lg">
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r gradientBg opacity-80 group-hover:opacity-100 transition-opacity" />

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            {isAnonymous ? (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E727F5]/10 text-[#8027F5] dark:text-[#F5279C] font-bold text-sm border border-[#E727F5]/20 shadow-xs">
                <Sparkles className="w-4 h-4 text-[#E727F5]" />
                Anonymous
              </span>
            ) : (
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt={username}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-border"
                  />
                ) : (
                  <User className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="font-bold text-sm text-primary">
                  @{username}
                </span>
              </div>
            )}
          </div>

          <span className="text-muted font-medium text-[11px] sm:text-xs">
            {timeAgo}
          </span>
        </div>

        <div className="py-1">
          <p className="text-base sm:text-lg font-bold tracking-tight leading-relaxed wrap-break-word text-card">
            "{content}"
          </p>
        </div>
      </div>
    </div>
  );
}
