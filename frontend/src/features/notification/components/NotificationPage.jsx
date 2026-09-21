import { useEffect } from "react";
import { useEntities } from "../../global/EntityProvider";
import LocNav from "../../navigation/components/LocNav";
import { useNotification } from "../context/NotificationProvider";
import { useNotificationActions } from "../hooks/useNotificationActions";
import NotificationContainer from "./NotificationContainer";

export default function NotificationPage() {
    const { unreadCount } = useNotification();
    const { markNotificationsRead } = useNotificationActions();

    useEffect(() => {
        if (!unreadCount > 0) return;
        return () => {
            markNotificationsRead();
        };
    }, [unreadCount]);
    return (
        <div className="bg-[#f8fafc] min-h-screen w-full flex flex-col">
            {/* Decorative background */}
            <div className="pointer-events-none fixed z-0 inset-0 overflow-hidden">
                <div className="absolute left-80 lg:left-1/4 top-0 size-[26rem] lg:size-[40rem] rounded-full bg-amber-200/15 blur-3xl" />
                <div className="absolute bottom-0 right-0 size-[32rem] rounded-full bg-sky-100/30 blur-3xl" />
            </div>

            {/* Navigation */}
            <div className="sticky w-full top-0 backdrop-blur-2xl flex border-b border-white/40 bg-white/60 z-40">
                <LocNav current="Notifications" />
            </div>

            {/* Main */}
            <main className="px-4 py-6 min-h-0 flex-1 flex flex-col w-full h-full">
                {/* Problem Container */}
                <div className="relative mx-auto w-full flex-1 min-h-0 flex max-w-4xl flex-col gap-6 p-6">
                    {/* Header */}
                    {/* <header className="rounded-[32px] border border-white/60 bg-white/50 backdrop-blur-2xl p-8 shadow-[0_10px_40px_rgba(15,23,42,0.05)] space-y-2">
                        <div className="flex flex-col gap-2 items-center">
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                                    Notification Page
                                </h1>
                            </div>
                            <p className="mb-5 max-w-2xl text-sm leading-7 text-slate-500">
                                Unread count: {unreadCount}
                            </p>

                            <div className="w-full px-20 max-w-[480px]"></div>
                        </div>
                    </header> */}

                    <NotificationContainer />
                </div>
            </main>
        </div>
    );
}
