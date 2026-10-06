import API from "../../../utils/axiosInterceptor";

export const getMe = () => API.get("auth/idme");
