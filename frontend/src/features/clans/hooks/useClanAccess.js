import { useCurrentUser } from "../../auth/hooks/useCurrentUser";
import { ROLE_PERMISSIONS } from "../permissions/clanPermissions";
import { getClanRole } from "../permissions/clanRoles";

export const useClanAccess = (clan) => {
    const auth = useCurrentUser();

    const role = getClanRole(clan, auth._id);

    const permissions = ROLE_PERMISSIONS[role] || [];

    const can = (permission) => {
        return permissions.includes(permission);
    };

    return {
        role,
        can,
        isMember: role === "member" || role === "owner" || role === "moderator",
        isAuthority: role === "owner" || role === "moderator",
        isLeader: role === "owner",
    };
};
