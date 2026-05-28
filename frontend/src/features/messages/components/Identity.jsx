import Avatar from "../../user/components/Avatar";
import { useRealtime } from "../../global/RealtimeProvider";
import { useEffect, useState } from "react";

export const Identity = ({ receiver }) => {
    const { presenceById } = useRealtime();

    const isOnline = presenceById?.[receiver?._id];

    return (
        <div name="Identity " className="rounded-t-3xl">
            <div className="flex gap-3 items-center">
                <Avatar user={receiver} size={12} />
                <div className="min-w-0 flex flex-col justify-start">
                    <h1 className="font-semibold truncate text-slate-900">
                        @{receiver?.username ?? "username"}
                    </h1>
                    <p className=" text-slate-500">
                        {isOnline ? "online" : "offline"}
                    </p>
                </div>
            </div>
        </div>
    );
};
