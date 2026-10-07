import { useState } from "react";
import { useClan } from "../../context/ClanProvider";
import { useClanAccess } from "../../hooks/useClanAccess";
import ClanAccess from "./general-settings/ClanAccess";
import ClanDeletion from "./general-settings/ClanDeletion";
import ClanDomain from "./general-settings/ClanDomain";
import ClanJoinRequests from "./general-settings/ClanJoinRequests";
import ClanOwnership from "./general-settings/ClanOwnership";
import ClanProfile from "./general-settings/ClanProfile";
import ClanStatus from "./general-settings/ClanStatus";
import ClanTags from "./general-settings/ClanTags";

export default function General() {
    const { activeClan: clan, loadingClans } = useClan();
    const { isFounder, isAuthority } = useClanAccess(clan);

    const [form, setForm] = useState({});
    const [abort, setAbort] = useState(false);

    if (loadingClans.activeClan) return <div>Loading...</div>;

    const isPrivate = clan.access === "private";

    const buttons = [
        { name: "save", title: "Save Changes" },
        { name: "cancel", title: "Cancel" },
    ];
    const isEditing = Object.values(form)?.length > 0;
    const permitted = {
        "clan discoverability": isAuthority,
        "ownership & leadership": isAuthority,
        "danger zone": isFounder,
    };

    const sections = {
        "clan discoverability": ["access", "join requests", "domain", "tags"],
        "ownership & leadership": ["ownership"],
        "danger zone": ["status", "deletion"],
    };

    const permitPath = {
        avatar: true,
        banner: true,
        name: true,
        description: true,
        domain: true,
        tags: true,
        access: true,
        "join requests": isPrivate,
        ownership: true,
        status: true,
        deletion: true,
    };

    const components = {
        avatar: null,
        banner: null,
        name: null,
        description: null,
        domain: ClanDomain,
        tags: ClanTags,
        access: ClanAccess,
        "join requests": ClanJoinRequests,
        ownership: ClanOwnership,
        status: ClanStatus,
        deletion: ClanDeletion,
    };

    // Add save button

    const updateClanState = (field, update) => {
        setAbort(false);
        setForm((prev) => ({ ...(prev || {}), [field]: update }));
    };
    // Work on this next
    const handleSubmit = () => {
        console.log(form);
        return;
    };

    const handleCancel = () => {
        setAbort(true);
        setForm({});
    };

    return (
        <div className="flex flex-col gap-6 overflow-y-auto h-full relative p-2">
            <ClanProfile clan={clan} onEdit={updateClanState} abort={abort} />
            <div className="flex flex-col gap-3">
                {Object.entries(sections).map(
                    ([key, value]) =>
                        permitted[key] && (
                            <div
                                key={key}
                                className="pb-7 border-b border-slate-200/60"
                            >
                                <div className="mb-4">
                                    <h2 className="text-slate-500 text-xs uppercase tracking-[0.14em] font-medium">
                                        {key}
                                    </h2>
                                </div>

                                <div className="flex flex-col gap-3">
                                    {value.map((param) => {
                                        const Component = components[param];

                                        return permitPath[param] ? (
                                            <div key={param}>
                                                {Component && (
                                                    <Component
                                                        onEdit={updateClanState}
                                                        abort={abort}
                                                    />
                                                )}
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        )
                )}
            </div>

            {isEditing && (
                <div className="flex justify-between w-full gap-6 px-4">
                    {buttons.map(({ name, title }) => (
                        <button
                            onClick={
                                name === "save" ? handleSubmit : handleCancel
                            }
                            className={`z-30 px-4 py-2 w-full flex justify-center backdrop-blur-3xl border shadow-[0px_4px_20px_rgba(60,80,82,0.02)] text-sm text-slate-500 rounded-[14px] hover:text-slate-800 !font-medium transition-all duration-300 hover:shadow-[0px_5px_30px_rgba(90,120,92,0.05)] ${name === "save" ? "bg-white/40 border-white/70 hover:bg-white/70" : "border-slate-200/40 bg-slate-200/60 hover:bg-slate-300/50"}`}
                        >
                            {title}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

const IOButton = () => {
    const [state, setState] = useState();
    return <button className={`h-4 w-8`}></button>;
};
