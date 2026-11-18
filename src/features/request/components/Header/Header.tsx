import { Eye } from "lucide-react";
import type { MetaData } from "@/types/baseResponse";

export default function Header({
  meta,
  type,
}: {
  meta: MetaData;
  type: "incoming" | "sent";
}) {
  const content = {
    incoming: {
      title: "Incoming Reveal Requests",
      description:
        "Review and track the reveal requests you've received from others.",
      label: "Total Received",
    },
    sent: {
      title: "Sent Reveal Requests",
      description:
        "Track the status of every anonymous sender you've asked to unmask.",
      label: "Total Sent",
    },
  }[type];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br gradientBg p-6 sm:p-8 lg:p-10">
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <Eye className="w-3.5 h-3.5" />
            Identity Tracker
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            {content.title}
          </h1>
          <p className="text-sm sm:text-base max-w-xl">{content.description}</p>
        </div>

        <div className="self-start sm:self-center shrink-0 rounded-2xl bg-primary/20 backdrop-blur-md px-6 py-4 text-center">
          <div className="text-3xl font-black leading-none">{meta?.total}</div>
          <div className="text-xs font-semibold uppercase tracking-wider mt-1.5">
            {content.label}
          </div>
        </div>
      </div>
    </div>
  );
}
