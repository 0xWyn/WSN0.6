import { useEffect, useState } from "react";
import { getCroppedImg } from "../../../utils/getCroppedImg";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";

export const useMediaLogic = (setForm) => {
    const user = useCurrentUser();

    const [cropping, setCropping] = useState(false);

    const [selectedFile, setSelectedFile] = useState({
        field: "",
        file: null,
    });

    const [mediaPreview, setMediaPreview] = useState({
        avatar: user.avatar?.url || null,
        cover: user.cover?.url || null,
    });

    const handleMediaUpload = (field, file) => {
        setForm((prev) => ({ ...prev, [field]: file }));

        setMediaPreview((prev) => {
            if (prev[field]?.startsWith("blob:")) {
                URL.revokeObjectURL(prev[field]);
            }

            return {
                ...prev,
                [field]: URL.createObjectURL(file),
            };
        });

        setCropping(false);
        console.log("done");
    };

    const handleCropDone = async (field, pixels, filename) => {
        if (!pixels) {
            setCropping(false);
            return;
        }

        const croppedUrl = await getCroppedImg(
            URL.createObjectURL(selectedFile.file),
            pixels
        );

        const croppedFile = new File([croppedUrl], filename, {
            type: "image/jpeg",
        });

        handleMediaUpload(field, croppedFile);
        setCropping(false);
    };

    useEffect(() => {
        return () => {
            if (mediaPreview.cover?.startsWith("blob:")) {
                URL.revokeObjectURL(mediaPreview.cover);
            }

            if (mediaPreview.avatar?.startsWith("blob:")) {
                URL.revokeObjectURL(mediaPreview.avatar);
            }
        };
    }, []);

    return {
        mediaPreview,
        handleCropDone,
        selectedFile,
        setSelectedFile,
        cropping,
        setCropping,
    };
};
