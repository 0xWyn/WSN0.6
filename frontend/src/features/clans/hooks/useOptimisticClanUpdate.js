import { useAuth } from "../../auth/context/AuthProvider";
import { useClan } from "../context/ClanProvider";

export const useOptimisticClanUpdate = () => {
    const { user } = useAuth();

    const { clanEntities, setClanEntities } = useClan();
    const addJoinRequest = (clanId) => {
        const clan = clanEntities[clanId];

        if (!clan.joinRequests) {
            console.log(`public clan`);
            return;
        }

        const update = {
            user: user._id,
            status: "pending",
            _id: null,
        };

        setClanEntities((prev) => ({
            ...prev,
            [clanId]: {
                ...prev[clanId],
                joinRequests: [
                    ...addJoinRequest([
                        prev[clanId]?.joinRequests ?? [],
                        update,
                    ]),
                ],
            },
        }));
    };

    return { addJoinRequest };
};
