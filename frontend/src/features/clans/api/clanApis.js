import API from "../../../utils/axiosInterceptor";

export const getMyClans = () => API.get(`/clans`);

export const getClanById = (clanId) => API.get(`/clans/${clanId}`);

export const createClan = (clan) => API.post("/clans", clan);

export const joinClan = (clanId) => API.put(`/clans/${clanId}`);

export const acceptRequest = (clanId, memberId) =>
    API.patch(`/clans/${clanId}/approve/${memberId}`);

export const rejectRequest = (clanId, memberId) =>
    API.patch(`/clans/${clanId}/reject/${memberId}`);
