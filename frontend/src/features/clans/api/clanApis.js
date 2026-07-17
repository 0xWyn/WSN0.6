import API from "../../../utils/axiosInterceptor";

export const getMyClans = () => API.get(`/clans`);

export const getClanById = (clanId) => API.get(`/clans/${clanId}`);

export const createClan = (clan) => API.post("/clans", clan);
