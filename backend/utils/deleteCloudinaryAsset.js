import cloudinary from "../config/cloudinary";

export const deleteCloudinaryAsset = async (publicId) => {
    if (!publicId) return;

    return await cloudinary.uploader.destroy(publicId);
};
