import { uploadToCloudinary } from "../utils/uploadToCloud";

export const uploadIfFile = async (value, folder) => {
    if (!(value instanceof File)) {
        return value;
    }

    return await uploadToCloudinary(value, { folder: folder });
};
