import API from "../../../utils/axiosInterceptor";

export const getExploreSections = () => API.get("/explore");

export const getCategoryClans = (category) =>
    API.get(`/clans/categories/${category}`);
