export const cleanQuery = (str) => str.replace(/[.*+?^${}()|\[\]\\]/g, "\\$&");
