import type { ReactNode } from "react";

export interface InfoCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export default function InfoCard({ title, description, icon }: InfoCardProps) {
  return (
    <div className="bg-card/40 p-5 rounded-2xl border border-border/50 flex items-center justify-between shadow-xs">
      <div className="min-w-0">
        <span className="text-[10px] sm:text-[11px] uppercase block tracking-wider text-primary">
          {title}
        </span>
        <span className="font-medium text-sm sm:text-base truncate block mt-0.5 text-foreground">
          {description}
        </span>
      </div>
      <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center shrink-0 ml-3">
        {icon}
      </div>
    </div>
  );
}
