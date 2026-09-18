import { ROLE_PERMISSIONS } from "../permissions/clanPermissions";

export const useClanAccess = (clan) => {
    const role = clan?.role ?? null;

    const permissions = ROLE_PERMISSIONS[role] || [];

    return {
        role,
        isMember: role !== null,
        isAuthority: role === "founder" || role === "leader",
        isFounder: role === "founder",
    };
};
