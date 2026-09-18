import NotificationCard from "./NotificationCard";

export default function DateSection({ date, notifications }) {
    return (
        <section className="flex flex-col w-full rounded-[28px] border border-white/60 bg-white/50 backdrop-blur-2xl p-6 px-8 shadow-[0_10px_40px_rgba(15,23,42,0.05)] min-w-xs gap-4">
            <h2 className="font-semibold text-slate-900">
                {new Date(date).toLocaleDateString()}
            </h2>

            <div className="flex-1 min-h-0 rounded-2xl flex flex-col gap-2 bg-white/30 backdrop-blur-xl">
                {notifications.map((notification) => {
                    return (
                        <NotificationCard
                            key={notification._id}
                            notification={notification}
                        />
                    );
                })}
            </div>
        </section>
    );
}
