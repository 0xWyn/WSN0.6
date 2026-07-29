const cloudName = import.meta.env.VITE_CLOUD_NAME;

const uploadToCloudinary = async (file, options = {}) => {
    const { folder = "posts" } = options;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "posts_upload");
    formData.append("folder", folder);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await res.json();

    return {
        url: data.secure_url,
        publicId: data.public_id,
        type: file.type.startsWith("video") ? "video" : "image",
    };
};

const uploadAllFiles = async (files, options = {}) => {
    return await Promise.all(
        files.map((file) => uploadToCloudinary(file, options))
    );
};

// ✅ export BOTH
export { uploadToCloudinary, uploadAllFiles };
