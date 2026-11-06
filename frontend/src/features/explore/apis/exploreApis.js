import API from "../../../utils/axiosInterceptor";

export const getExploreSections = () => API.get("/explore");
