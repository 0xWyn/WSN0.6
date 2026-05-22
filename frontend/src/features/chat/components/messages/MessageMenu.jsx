import { useMessageActions } from "../../hooks/useMessageActions";
import { useMessaging } from "../../hooks/useMessaging";

export default function MessageMenu({ message, startEditing }) {
    const { removeMessage } = useMessageActions();

    const options = ["Edit", "Delete"];
    const actions = {
        Edit: () => {
            startEditing(message);
        },
        Delete: () => {
            removeMessage(message._id);
        },
    };
    return (
        <div className="flex min-w-32 flex-col gap-1">
            {options.map((option) => (
                <button
                    key={option}
                    onClick={actions[option]}
                    className="!px-3 !py-2 !rounded-xl text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-black/5 active:bg-blue-900/30 active:text-slate-100 duration-300"
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
