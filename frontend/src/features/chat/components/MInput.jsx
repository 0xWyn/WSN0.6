import { PaperPlane } from "../../../components/icons/paper-airplane";
import Plus from "../../../components/icons/plus";
export default function MInput() {
    return (
        <div className="flex w-full justify-center absolute bottom-0 px-8 lg:px-4 max-w-4xl my-2">
            <div className="flex w-full items-center gap-3 rounded-full border border-slate-200/70 bg-white/75 px-[8px] py-[1px] backdrop-blur-xl shadow-2xl shadow-[0_8px_40px_rgba(15,23,42,0.08)]">
                <button className="flex items-center justify-center text-slate-600 !p-2 size-9 text-xl !rounded-full hover:border border-slate-400/20 transition-all duration-300">
                    <Plus />
                </button>
                <textarea
                    rows={1}
                    placeholder="Message..."
                    className="
                     max-h-[10.5rem]
                     min-h-[2.75rem]
                    resize-none flex-1 bg-transparent text-sm text-black leading-6 placeholder:text-slate-400
                    placeholder:transition-opacity focus:placeholder:opacity-60 outline-none overflow-y-auto p-3 [scrollbar-width:none]"
                    onInput={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
                    }}
                />
                <button className="!rounded-[28px] bg-gradient-to-br from-blue-500 to-blue-600 size-9 flex items-center justify-center !p-0 text-sm text-slate-200 shadow-sm">
                    <PaperPlane />
                </button>
            </div>
        </div>
    );
}
