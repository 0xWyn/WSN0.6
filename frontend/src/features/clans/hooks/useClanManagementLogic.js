import {
    banMember,
    demoteMember,
    kickMember,
    promoteMember,
} from "../api/clanApis";
import { useClanManagement } from "../context/ClanManagementProvider";
import { useClan } from "../context/ClanProvider";
import { upsertMembers } from "../helpers/upsertMembers";

export const useClanManagementLogic = (membershipId) => {
    const { activeClan } = useClan();
    const clanId = activeClan._id;

    const { setMembers } = useClanManagement();

    const handlePromotion = async () => {
        try {
            console.log("Promoting");
            const {
                data: { msg, membership },
            } = await promoteMember(clanId, membershipId);

            console.log(msg);
            setMembers((prev) => upsertMembers([membership], prev));
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const handleDemotion = async () => {
        try {
            console.log("Demoting");
            const {
                data: { msg, membership },
            } = await demoteMember(clanId, membershipId);
            console.log(msg);

            setMembers((prev) => upsertMembers([membership], prev));
        } catch (error) {
            console.log(error);
            console.log(error?.response?.data);
        }
    };

    const handleKick = async () => {
        try {
            console.log("Kicking");
            const {
                data: { msg, membership },
            } = await kickMember(clanId, membershipId);

            console.log(msg);
            setMembers((prev) => {
                const map = { ...prev };
                delete map[membershipId];
                return map;
            });
        } catch (error) {
            console.log(error);
            console.log(error.response.data);
        }
    };

    const handleExile = async () => {
        try {
            console.log("Baning");
            const { data } = await banMember(clanId, membershipId);
            console.log(data);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return { handlePromotion, handleDemotion, handleKick, handleExile };
};
