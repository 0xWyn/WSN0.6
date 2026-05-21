export default function ErrorState({
    title = "Something went wrong",
    description = "Please try again.",
    action,
    actionText = "Retry",
}) {
    return (
        <div className="flex w-full h-full flex-col justify-center items-center gap-4 text-center bg-gradient-to-br from-white via-slate-50 to-slate-100">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-red-200 bg-white shadow-xl shadow-red-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 text-3xl text-white">
                    !
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-black tracking-tight text-slate-800">
                    {title}
                </h2>
                <p className="max-w-sm text-sm leading-relaxed text-slate-500">
                    {description}
                </p>
            </div>

            {action && (
                <button
                    onClick={action}
                    className="!mt-2 !rounded-2xl !bg-slate-900 !px-5 !py-3 !text-sm !font-semibold !text-white transition-all duration-300 hover:-translate-y-0 5 hover:bg-slate-800 hover:shadow-xl"
                >
                    {actionText}
                </button>
            )}
        </div>
    );
}
