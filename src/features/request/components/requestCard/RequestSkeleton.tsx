export default function RequestSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border bg-card shadow-xs">
      <div className="flex items-start sm:items-center gap-3 flex-1 w-full">
        <div className="w-10 h-10 rounded-full bg-muted animate-pulse shrink-0" />

        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <div className="h-4 w-32 bg-muted animate-pulse rounded-md" />
            <div className="h-5 w-20 bg-muted/60 animate-pulse rounded-full" />
          </div>
          <div className="h-4 w-3/4 bg-muted/40 animate-pulse rounded-md" />
          <div className="h-3 w-28 bg-muted/30 animate-pulse rounded-md" />
        </div>
      </div>
      <div className="h-8 w-32 bg-muted/40 animate-pulse rounded-lg self-end sm:self-center shrink-0" />
    </div>
  );
}
