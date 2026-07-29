export default function CreateClan({ setShowModal }) {
    return (
        <div className="flex gap-5 absolute z-10 right-0 overflow-hidden flex flex-col gap-4 rounded-[32px] border border-white/60 bg-white/35 backdrop-blur-2xl p-6 shadow-[0_10px_40px_rgba(15,23,42,0.05)] cursor-pointer active:scale-98 transition-all duration-300">
            <button
                onClick={() => setShowModal(true)}
                className="flex-1 font-bold"
            >
                Create Clan
            </button>
        </div>
    );
}
