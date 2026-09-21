import { useEffect, useMemo, useState } from "react";
import Cropper from "react-easy-crop";

export const AssetCropper = ({ image, field, onComplete, onCancel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [pixels, setPixels] = useState(null);

    const onCropComplete = (_, croppedAreaPixels) => {
        setPixels(croppedAreaPixels);
    };

    const cropShape = field === "avatar" ? "round" : "rect";

    const ratio = field === "avatar" ? 1 : 3;

    const [imageUrl, setImageUrl] = useState(null);

    const filename = image?.name || `${field}.jpg`;

    useEffect(() => {
        if (!image) {
            setImageUrl(null);
            return;
        }

        const url = URL.createObjectURL(image);
        setImageUrl(url);

        return () => {
            URL.revokeObjectURL(imageUrl);
        };
    }, [image]);
    return (
        <div className="fixed z-101 inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-xs">
            <div className="bg-white/80 border border-white/70 backdrop-blur-3xl rounded-[28px] px-10 py-6 space-y-2 overflow-hidden">
                <div className="">
                    <h1 className="text-2xl text-slate-900 font-bold">
                        Crop Image
                    </h1>
                    <p className="text-sm text-slate-600">
                        Resize your image for to fit the dimensions
                    </p>
                </div>
                <div className="relative w-[400px] h-[400px] bg-black rounded-3xl p-2 overflow-hidden">
                    {imageUrl && (
                        <Cropper
                            image={imageUrl}
                            crop={crop}
                            zoom={zoom}
                            aspect={ratio}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                            cropShape={cropShape}
                        />
                    )}
                </div>
                <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="mt-4 w-[400px]"
                />
                <div className="flex gap-2 items-center">
                    <button
                        className="bg-blue-500 !px-4 py-2 text-white rounded-full"
                        onClick={() => onComplete(field, pixels, filename)}
                    >
                        Crop
                    </button>

                    <button
                        className="bg-gray-400 px-4 py-2 text-white rounded-full"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
