import Avatar from "../../user/components/Avatar";

export const Identity = ({ receiver }) => {
    return (
        <div name="Identity " className="rounded-t-3xl">
            <div className="flex gap-3 items-center">
                <Avatar user={receiver} size={12} />
                <div className="min-w-0 flex flex-col justify-start">
                    <h1 className="font-semibold truncate text-slate-900">
                        @{receiver?.username ?? "username"}
                    </h1>
                    <p className=" text-[12px] text-slate-500">
                        Last seen online
                    </p>
                </div>
            </div>
        </div>
    );
};
