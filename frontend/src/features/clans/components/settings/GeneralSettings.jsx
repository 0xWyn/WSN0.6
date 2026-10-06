import { useEffect, useState } from "react";
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

    if (loadingClans.activeClan) return <div>Loading...</div>;

    const { isFounder, isAuthority } = useClanAccess(clan);
    const isPrivate = clan.access === "private";

    const [form, setForm] = useState({});
    const isEditing = Object.values(form)?.length > 0;
    const permitted = {
        "clan appearance": isAuthority,
        "clan discoverability": isAuthority,
        "ownership & leadership": isAuthority,
        "danger zone": isFounder,
    };

    const sections = {
        // "clan appearance": ["avatar", "banner", "name", "description"],
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
        setForm((prev) => ({ ...(prev || {}), [field]: update }));
    };

    useEffect(() => console.log(form), [form]);

    const handleSubmit = () => {
        console.log(form);
        return;
    };
    return (
        <div className="flex flex-col gap-6 overflow-y-auto h-full relative p-2">
            {isEditing && (
                <button className="z-30 px-4 py-2 rounded-[14px] fixed top-8 right-12 bg-white/60 backdrop-blur-3xl border border-white/40 shadow-[0px_4px_20px_rgba(60,80,82,0.05)] text-slate-800 flex !font-medium transition-all duration-300 hover:shadow-[0px_8px_20px_rgba(90,120,92,0.2)]">
                    Done
                </button>
            )}
            <ClanProfile clan={clan} const onEdit={updateClanState} />
            <div className="mt-2 flex flex-col gap-6">
                {Object.entries(sections).map(
                    ([key, value]) =>
                        permitted[key] && (
                            <div
                                key={key}
                                className="py-4 border-b border-slate-200"
                            >
                                <p className="text-slate-600 text-md uppercase tracking-wide font-bold">
                                    {key}
                                </p>

                                <div className="flex flex-col gap-4 mt-3">
                                    {value.map((param) => {
                                        const Component = components[param];

                                        return permitPath[param] ? (
                                            <div key={param}>
                                                {Component && (
                                                    <Component
                                                        onEdit={updateClanState}
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
        </div>
    );
}

const IOButton = () => {
    const [state, setState] = useState();
    return <button className={`h-4 w-8`}></button>;
};
