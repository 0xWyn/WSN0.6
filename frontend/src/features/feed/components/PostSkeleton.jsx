export default function PostSkeleton() {
    return (
        <div className="animate-pulse p-5 sm:p-6">
            <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-slate-200 shrink-0" />
                <div className="space-y-2">
                    <div className="h-3 w-28 rounded-full bg-slate-200" />
                    <div className="h-2.5 w-20 rounded-full bg-slate-100" />
                </div>
            </div>

            <div className="mt-5 space-y-2">
                <div className="h-3 w-full rounded-full bg-slate-100" />
                <div className="h-3 w-4/5 rounded-full bg-slate-100" />
                <div className="h-3 w-2/5 rounded-full bg-slate-100" />
            </div>

            <div className="mt-5 h-10 w-48 rounded-xl bg-slate-100" />
        </div>
    );
}
