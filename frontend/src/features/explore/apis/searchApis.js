import API from "../../../utils/axiosInterceptor";

export const getClans = (term) => API.get(`/search/clans/${term}`);
export const searchExplore = (query) => API.get(`/search/explore/?q=${query}`);
