import { formatDateTime } from "@/shared/utils/formatDate";
import type { Request } from "@/types/requestModel";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import useAcceptRequest from "../../hooks/useAcceptRequest";
import useRejectRequest from "../../hooks/useRejectRequest";

const DEFAULT_PP: string = import.meta.env.VITE_DEFAULT_PP;
const BACKENDURL: string = import.meta.env.VITE_API_URL;

export default function RequestCard({
  req,
  type,
}: {
  req: Request;
  type: "sent" | "incoming";
}) {
  const isPending = req.status === "pending";
  const isAccepted = req.status === "accepted";
  const isRejected = req.status === "rejected";
  const isIncoming = type === "incoming";

  const { mutate: accept, isPending: isAccepting } = useAcceptRequest();
  const { mutate: reject, isPending: isRejecting } = useRejectRequest();
  const targetUser = isIncoming ? req.receiver : req.sender;
  const username = (targetUser?.username as string) || "Unknown User";

  const profilePicturePath = targetUser?.profilePicture
    ? `${BACKENDURL}/${targetUser.profilePicture}`
    : DEFAULT_PP;

  return (
    <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border bg-card text-card-foreground shadow-xs transition-all hover:shadow-md hover:border-primary/30">
      <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
        <div className="relative shrink-0">
          <img
            src={targetUser?.profilePicture ? profilePicturePath : DEFAULT_PP}
            alt={username}
            className="w-10 h-10 rounded-full object-cover border bg-muted"
          />
        </div>

        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 font-medium text-sm">
              <span className="text-muted-foreground">
                {isIncoming ? "From:" : "To:"}
              </span>
              <span className="font-semibold text-foreground">@{username}</span>
            </div>

            <span
              className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium capitalize ${
                isPending
                  ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                  : isAccepted
                    ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                    : "bg-destructive/10 text-destructive border border-destructive/20"
              }`}
            >
              {isPending && <Clock className="w-3 h-3" />}
              {isAccepted && <CheckCircle2 className="w-3 h-3" />}
              {isRejected && <XCircle className="w-3 h-3" />}
              {req.status}
            </span>
          </div>

          <div className="relative pl-3 border-l-2 border-muted-foreground/30 py-0.5 space-y-0.5">
            {isIncoming && (
              <span className="text-xs font-medium text-muted-foreground block">
                Your message:
              </span>
            )}
            <p className="text-sm text-muted-foreground italic line-clamp-1">
              "{req.message?.content || "Message content unavailable"}"
            </p>
          </div>

          <span className="text-xs text-muted-foreground/80 block pt-0.5">
            {isIncoming ? "Received on" : "Sent on"}{" "}
            {formatDateTime(req.createdAt)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 shrink-0">
        {isIncoming && isPending ? (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => accept(req._id)}
              className="px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => reject(req._id)}
              className="px-3 py-1.5 text-xs font-medium bg-destructive/10 text-destructive border border-destructive/20 rounded-lg hover:bg-destructive/20 transition-colors"
            >
              Decline
            </button>
          </div>
        ) : (
          <>
            {isPending && (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                {isIncoming ? "Awaiting your response" : "Waiting for approval"}
              </span>
            )}
            {isAccepted && (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Identity revealed!
              </span>
            )}
            {isRejected && (
              <span className="inline-flex items-center gap-1.5 text-xs text-destructive font-medium bg-destructive/10 px-3 py-1.5 rounded-lg border border-destructive/20">
                <XCircle className="w-3.5 h-3.5" />
                Declined
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
