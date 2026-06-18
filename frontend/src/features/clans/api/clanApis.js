import API from "../../../utils/axiosInterceptor";

export const getClans = () => API.get(`/clans`);

export const getClanById = (clanId) => API.get(`/clans/${clanId}`);

export const createClan = (clan) => API.post("/clans", clan);
