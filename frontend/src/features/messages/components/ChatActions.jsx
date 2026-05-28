import { Bell } from "../../../components/icons/bell";
export const ChatActions = () => {
    const BellName = (
        <div>
            <Bell />
        </div>
    );
    const actions = [
        { name: "Info", onClick: () => {} },
        { name: "Mute", onClick: () => {} },
    ];

    const mappedButtons = (
        <div className="flex items-center gap-2">
            {actions.map((el) => (
                <button
                    key={el.name}
                    onClick={el.onClick}
                    className="rounded-2xl bg-white/80 !px-3 !py-2 text-sm text-slate-600 backdrop-blur-xl transition-all duration-200 hover:bg-white/80 hover:shadow-[0_4px_20px_rgba(15,23,42,0.08)]"
                >
                    {el.name}
                </button>
            ))}
        </div>
    );

    return mappedButtons;
};
