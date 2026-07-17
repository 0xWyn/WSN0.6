import API from "../../../utils/axiosInterceptor";

export const getClans = (term) => API.get(`/search/clans/${term}`);
