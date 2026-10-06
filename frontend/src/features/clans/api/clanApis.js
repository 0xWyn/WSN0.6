import API from "../../../utils/axiosInterceptor";

// User
export const getMyClans = () => API.get(`/clans`);

export const getClanById = (clanId) => API.get(`/clans/${clanId}`);

export const createClan = (clan) => API.post("/clans", clan);

export const joinClan = (clanId) => API.put(`/clans/${clanId}`);

export const leaveClan = (clanId) => API.delete(`/clans/${clanId}/membership`);

export const cancelRequest = (clanId) => API.delete(`/clans/${clanId}/request`);

// Management (Moderator Tier)

export const getClanRequests = (clanId) =>
    API.get(`/clans/${clanId}/joinrequests`);

export const acceptRequest = (clanId, reqId) =>
    API.put(`/clans/${clanId}/request/${reqId}`);

export const rejectRequest = (clanId, reqId) =>
    API.delete(`/clans/${clanId}/request/${reqId}`);

export const getMembers = (clanId, page = 1) =>
    API.get(`/clans/${clanId}/members?page=${page}&limit=20`);

// Management (Founder Tier)

export const promoteMember = (clanId, membershipId) =>
    API.patch(`clans/${clanId}/members/${membershipId}/promote`);

export const demoteMember = (clanId, membershipId) =>
    API.patch(`clans/${clanId}/members/${membershipId}/demote`);

export const kickMember = (clanId, membershipId) =>
    API.delete(`clans/${clanId}/members/${membershipId}`);

export const banMember = (clanId, membershipId) =>
    API.put(`clans/${clanId}/ban/${membershipId}`);

export const toggleClanDelete = (clanId) => API.patch(`clans/${clanId}/delete`);
