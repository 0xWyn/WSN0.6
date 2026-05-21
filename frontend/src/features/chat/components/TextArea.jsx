import Photo from "../../../components/icons/photo";
import { PaperPlane } from "../../../components/icons/paper-airplane";
export default function TextArea({
    message = "",
    setMessage = () => {},
    onSubmit = () => {},
    fileInputRef = null,
    onFileChange = () => {},
}) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <div className="flex items-end gap-3">
                <label
                    htmlFor="media"
                    className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900 text-white transition hover:bg-slate-800"
                >
                    <Photo />
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        id="media"
                        accept="image/*,video/*"
                        onChange={onFileChange}
                    />
                </label>

                <textarea
                    id="new-message"
                    rows={1}
                    className="min-h-[48px] flex-1 resize-none rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button
                    type="submit"
                    className="!inline-flex !h-12 !items-center !justify-center !rounded-3xl bg-blue-800 !px-5 !text-sm font-semibold text-white transition hover:bg-blue-900"
                >
                    <PaperPlane />
                </button>
            </div>
        </form>
    );
}
