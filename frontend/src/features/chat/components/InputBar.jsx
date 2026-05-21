import TextArea from "./TextArea";

export default function InputBar({
    message,
    setMessage,
    onSubmit,
    fileInputRef,
    onFileChange,
    media,
    previewUrl,
    fileType,
}) {
    return (
        <section className="flex w-full flex-col gap-3">
            {media && previewUrl && (
                <div className="flex items-center gap-3 rounded-3xl bg-white p-3 shadow-sm">
                    <div className="relative h-16 w-20 overflow-hidden rounded-2xl bg-slate-100">
                        {fileType === "image" ? (
                            <img
                                src={previewUrl}
                                alt="preview"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <video
                                src={previewUrl}
                                className="h-full w-full object-cover"
                                controls
                            />
                        )}
                    </div>
                    <div className="min-w-0 flex-1 text-sm text-slate-700">
                        <p className="font-semibold">Attachment ready</p>
                        <p className="truncate text-xs text-slate-500">
                            Tap send to add it to the conversation.
                        </p>
                    </div>
                </div>
            )}

            <TextArea
                message={message}
                setMessage={setMessage}
                onSubmit={onSubmit}
                fileInputRef={fileInputRef}
                onFileChange={onFileChange}
            />
        </section>
    );
}
